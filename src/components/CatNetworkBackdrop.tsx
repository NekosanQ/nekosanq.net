"use client";

import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { AdditiveBlending, BufferAttribute, BufferGeometry, MathUtils, PerspectiveCamera, Raycaster, ShaderMaterial, Vector2, Vector3 } from "three";
import { CatWireModel } from "./network/CatWireModel";

type TerrainData = {
  positions: Float32Array;
  normals: Float32Array;
  sizes: Float32Array;
  phases: Float32Array;
  edgePositions: Float32Array;
  edgeWeights: Float32Array;
  edgePhases: Float32Array;
};

const seededRandom = () => {
  let seed = 8947;
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
};

const createTerrain = (): TerrainData => {
  const random = seededRandom();
  const points: Vector3[] = [];
  const pointNormals: Vector3[] = [];
  const pointSizes: number[] = [];
  const pointPhases: number[] = [];
  const edges: Array<[number, number, number, number]> = [];
  const columns = 42;
  const rows = 110;
  const rowStep = 1.38;

  for (let row = 0; row < rows; row += 1) {
    const z = 8.2 - row * rowStep;
    const width = 31.5 + row * 0.16;

    for (let column = 0; column < columns; column += 1) {
      const normalizedColumn = column / (columns - 1);
      const x = MathUtils.lerp(-width, width, normalizedColumn);
      const wave = Math.sin(column * 0.73 + row * 0.37) * 0.2 + Math.cos(column * 0.29 - row * 0.48) * 0.14;
      const point = new Vector3(x + (random() - 0.5) * 0.24, -2.5 + wave + (random() - 0.5) * 0.14, z + (random() - 0.5) * 0.2);

      points.push(point);
      pointNormals.push(new Vector3(0, 1, 0));
      pointSizes.push(random() > 0.965 ? 1.65 + random() * 0.72 : 0.42 + random() * 0.78);
      pointPhases.push(random());
    }
  }

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const current = row * columns + column;

      if (column < columns - 1) edges.push([current, current + 1, 0.28 + random() * 0.3, random()]);
      if (row < rows - 1) edges.push([current, current + columns, 0.24 + random() * 0.28, random()]);
      if (row < rows - 1 && column < columns - 1) {
        const diagonal = row % 2 === 0 ? [current, current + columns + 1] : [current + 1, current + columns];
        edges.push([diagonal[0], diagonal[1], 0.18 + random() * 0.24, random()]);
      }
    }
  }

  // Unconnected depth particles keep the space alive without creating a second silhouette.
  for (let index = 0; index < 4800; index += 1) {
    const point = new Vector3((random() - 0.5) * 70, -1.2 + (random() - 0.5) * 15, 7 - random() * 154);
    points.push(point);
    pointNormals.push(point.clone().setZ(0).normalize());
    pointSizes.push(random() > 0.93 ? 1.05 + random() * 1.55 : 0.28 + random() * 0.62);
    pointPhases.push(random());
  }

  const positions = new Float32Array(points.length * 3);
  const normals = new Float32Array(points.length * 3);
  const sizes = new Float32Array(pointSizes);
  const phases = new Float32Array(pointPhases);

  points.forEach((point, index) => {
    positions.set(point.toArray(), index * 3);
    normals.set(pointNormals[index].toArray(), index * 3);
  });

  const edgePositions = new Float32Array(edges.length * 6);
  const edgeWeights = new Float32Array(edges.length * 2);
  const edgePhases = new Float32Array(edges.length * 2);

  edges.forEach(([from, to, weight, phase], index) => {
    edgePositions.set(points[from].toArray(), index * 6);
    edgePositions.set(points[to].toArray(), index * 6 + 3);
    edgeWeights.set([weight, weight], index * 2);
    edgePhases.set([phase, phase], index * 2);
  });

  return { positions, normals, sizes, phases, edgePositions, edgeWeights, edgePhases };
};

const terrainPointVertexShader = `
  attribute vec3 nodeNormal;
  attribute float nodeSize;
  attribute float nodePhase;
  uniform float uPixelRatio;
  uniform float uTime;
  uniform float uMotion;
  uniform float uScroll;
  uniform vec3 uRayOrigin;
  uniform vec3 uRayDirection;
  varying vec3 vNodeColor;
  varying float vNodeAlpha;

  float distanceToRay(vec3 point, vec3 origin, vec3 direction) {
    float alongRay = max(dot(point - origin, direction), 0.0);
    return length(point - (origin + direction * alongRay));
  }

  void main() {
    vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    float hover = 1.0 - smoothstep(0.28, 1.55, distanceToRay(worldPosition, uRayOrigin, uRayDirection));
    float floorMask = 1.0 - smoothstep(-1.82, -1.05, position.y);
    float networkWave = (
      sin(position.x * 0.18 + position.z * 0.14 - uTime * 0.52 - uScroll * 15.0) * 0.17 +
      cos(position.x * 0.11 - position.z * 0.19 + uTime * 0.36 + uScroll * 9.0) * 0.09
    ) * floorMask * uMotion;
    float starDrift = sin(uTime * 0.24 + nodePhase * 6.28318 + uScroll * 12.0) * (1.0 - floorMask) * uMotion;
    worldPosition.y += networkWave + starDrift * 0.14;
    worldPosition.x += starDrift * 0.055;
    worldPosition.z += starDrift * 0.09;
    worldPosition += nodeNormal * hover * 0.018;

    vec4 viewPosition = viewMatrix * vec4(worldPosition, 1.0);
    float viewDepth = -viewPosition.z;
    float depthFade = 1.0 - smoothstep(42.0, 118.0, viewDepth);
    float perspectiveSize = 43.0 / max(1.0, viewDepth);

    gl_PointSize = clamp(
      perspectiveSize * uPixelRatio * nodeSize * (1.0 + hover * 0.2),
      1.15,
      12.0
    );
    gl_Position = projectionMatrix * viewPosition;

    vec3 silver = vec3(0.62, 0.70, 0.68);
    vec3 emerald = vec3(0.0, 0.96, 0.63);
    vNodeColor = mix(silver, emerald, hover);
    float twinkle = 0.72 + 0.28 * sin(uTime * 1.15 + nodePhase * 18.0);
    vNodeAlpha = depthFade * (0.54 + floorMask * 0.1 + hover * 0.46) * mix(twinkle, 1.0, floorMask);
  }
`;

const terrainPointFragmentShader = `
  varying vec3 vNodeColor;
  varying float vNodeAlpha;

  void main() {
    float radius = length(gl_PointCoord - vec2(0.5));
    float antialias = max(fwidth(radius), 0.006);
    float disc = 1.0 - smoothstep(0.48 - antialias, 0.5, radius);
    float core = 1.0 - smoothstep(0.03, 0.16, radius);
    float halo = 1.0 - smoothstep(0.14, 0.5, radius);

    if (disc <= 0.0) discard;

    vec3 color = vNodeColor * (0.84 + core * 1.9);
    float alpha = max(core * 0.92, halo * 0.42) * disc * vNodeAlpha;
    gl_FragColor = vec4(color, alpha);
  }
`;

const terrainEdgeVertexShader = `
  attribute float edgeWeight;
  attribute float edgePhase;
  uniform float uTime;
  uniform float uMotion;
  uniform float uScroll;
  uniform vec3 uRayOrigin;
  uniform vec3 uRayDirection;
  varying vec3 vEdgeColor;
  varying float vEdgeAlpha;

  float distanceToRay(vec3 point, vec3 origin, vec3 direction) {
    float alongRay = max(dot(point - origin, direction), 0.0);
    return length(point - (origin + direction * alongRay));
  }

  void main() {
    vec3 worldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    float networkWave = (
      sin(position.x * 0.18 + position.z * 0.14 - uTime * 0.52 - uScroll * 15.0) * 0.17 +
      cos(position.x * 0.11 - position.z * 0.19 + uTime * 0.36 + uScroll * 9.0) * 0.09
    ) * uMotion;
    worldPosition.y += networkWave;
    vec4 viewPosition = viewMatrix * vec4(worldPosition, 1.0);
    float viewDepth = -viewPosition.z;
    float depthFade = 1.0 - smoothstep(38.0, 116.0, viewDepth);
    float hover = 1.0 - smoothstep(0.3, 1.7, distanceToRay(worldPosition, uRayOrigin, uRayDirection));
    float pulseWave = sin(uTime * 0.7 + edgePhase * 6.28318) * 0.5 + 0.5;
    float pulse = smoothstep(0.985, 1.0, pulseWave) * 0.54;

    vec3 silver = vec3(0.36, 0.44, 0.42);
    vec3 emerald = vec3(0.0, 0.96, 0.63);
    float activity = max(hover, pulse);
    vEdgeColor = mix(silver, emerald, activity);
    vEdgeAlpha = depthFade * (0.055 + edgeWeight * 0.2 + hover * 0.46 + pulse * 0.2);
    gl_Position = projectionMatrix * viewPosition;
  }
`;

const terrainEdgeFragmentShader = `
  varying vec3 vEdgeColor;
  varying float vEdgeAlpha;

  void main() {
    gl_FragColor = vec4(vEdgeColor, vEdgeAlpha);
  }
`;

const createTerrainPointMaterial = (pixelRatio: number) =>
  new ShaderMaterial({
    vertexShader: terrainPointVertexShader,
    fragmentShader: terrainPointFragmentShader,
    uniforms: {
      uPixelRatio: { value: pixelRatio },
      uTime: { value: 0 },
      uMotion: { value: 1 },
      uScroll: { value: 0 },
      uRayOrigin: { value: new Vector3() },
      uRayDirection: { value: new Vector3(0, 0, -1) }
    },
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending
  });

const createTerrainEdgeMaterial = () =>
  new ShaderMaterial({
    vertexShader: terrainEdgeVertexShader,
    fragmentShader: terrainEdgeFragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uMotion: { value: 1 },
      uScroll: { value: 0 },
      uRayOrigin: { value: new Vector3() },
      uRayDirection: { value: new Vector3(0, 0, -1) }
    },
    transparent: true,
    depthWrite: false
  });

type SceneRefProps = {
  pointerNdcRef: MutableRefObject<Vector2>;
  scrollProgressRef: MutableRefObject<number>;
  reducedMotion: boolean;
};

const ScrollCameraRig = ({ pointerNdcRef, scrollProgressRef, reducedMotion }: SceneRefProps) => {
  const { camera } = useThree();
  const smoothPointer = useRef(new Vector2());
  const smoothProgress = useRef(0);

  useFrame(() => {
    smoothProgress.current = MathUtils.lerp(smoothProgress.current, scrollProgressRef.current, reducedMotion ? 1 : 0.075);
    smoothPointer.current.lerp(pointerNdcRef.current, reducedMotion ? 1 : 0.075);

    const progress = smoothProgress.current;
    const travel = MathUtils.smoothstep(progress, 0.1, 1);
    const perspectiveCamera = camera as PerspectiveCamera;

    perspectiveCamera.position.set(
      smoothPointer.current.x * 0.2,
      MathUtils.lerp(0.2, -0.72, travel) + smoothPointer.current.y * 0.1,
      MathUtils.lerp(9.2, -70, travel)
    );
    perspectiveCamera.fov = MathUtils.lerp(44, 57, travel);
    perspectiveCamera.updateProjectionMatrix();
    perspectiveCamera.lookAt(smoothPointer.current.x * 0.08, MathUtils.lerp(-0.1, -1.16, travel), perspectiveCamera.position.z - 10);
  });

  return null;
};

const TerrainNetwork = ({ pointerNdcRef, scrollProgressRef, reducedMotion }: SceneRefProps) => {
  const data = useMemo(createTerrain, []);
  const raycaster = useMemo(() => new Raycaster(), []);
  const { camera, gl } = useThree();

  const pointGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(data.positions, 3));
    geometry.setAttribute("nodeNormal", new BufferAttribute(data.normals, 3));
    geometry.setAttribute("nodeSize", new BufferAttribute(data.sizes, 1));
    geometry.setAttribute("nodePhase", new BufferAttribute(data.phases, 1));
    geometry.computeBoundingSphere();
    return geometry;
  }, [data]);

  const edgeGeometry = useMemo(() => {
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(data.edgePositions, 3));
    geometry.setAttribute("edgeWeight", new BufferAttribute(data.edgeWeights, 1));
    geometry.setAttribute("edgePhase", new BufferAttribute(data.edgePhases, 1));
    geometry.computeBoundingSphere();
    return geometry;
  }, [data]);

  const pointMaterial = useMemo(() => createTerrainPointMaterial(gl.getPixelRatio()), [gl]);
  const edgeMaterial = useMemo(createTerrainEdgeMaterial, []);

  useFrame(({ clock }) => {
    raycaster.setFromCamera(pointerNdcRef.current, camera);
    const elapsed = reducedMotion ? 0 : clock.elapsedTime;

    pointMaterial.uniforms.uPixelRatio.value = gl.getPixelRatio();
    pointMaterial.uniforms.uTime.value = elapsed;
    pointMaterial.uniforms.uMotion.value = reducedMotion ? 0 : 1;
    pointMaterial.uniforms.uScroll.value = scrollProgressRef.current;
    pointMaterial.uniforms.uRayOrigin.value.copy(raycaster.ray.origin);
    pointMaterial.uniforms.uRayDirection.value.copy(raycaster.ray.direction);

    edgeMaterial.uniforms.uTime.value = elapsed;
    edgeMaterial.uniforms.uMotion.value = reducedMotion ? 0 : 1;
    edgeMaterial.uniforms.uScroll.value = scrollProgressRef.current;
    edgeMaterial.uniforms.uRayOrigin.value.copy(raycaster.ray.origin);
    edgeMaterial.uniforms.uRayDirection.value.copy(raycaster.ray.direction);
  });

  return (
    <>
      <points geometry={pointGeometry} material={pointMaterial} frustumCulled={false} />
      <lineSegments geometry={edgeGeometry} material={edgeMaterial} frustumCulled={false} />
    </>
  );
};

const NetworkExperience = ({ reducedMotion }: { reducedMotion: boolean }) => {
  const pointerNdcRef = useRef(new Vector2());
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const updatePointer = (event: PointerEvent) => {
      pointerNdcRef.current.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    const scrollTrigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: ({ progress }) => {
        scrollProgressRef.current = progress;
      }
    });
    scrollProgressRef.current = scrollTrigger.progress;

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      scrollTrigger.kill();
    };
  }, []);

  return (
    <>
      <ScrollCameraRig pointerNdcRef={pointerNdcRef} scrollProgressRef={scrollProgressRef} reducedMotion={reducedMotion} />
      <TerrainNetwork pointerNdcRef={pointerNdcRef} scrollProgressRef={scrollProgressRef} reducedMotion={reducedMotion} />
      <CatWireModel pointerNdcRef={pointerNdcRef} />
    </>
  );
};

const CatNetworkBackdrop = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(media.matches);
    const updateDocumentVisibility = () => setDocumentVisible(document.visibilityState === "visible");

    updateMotionPreference();
    updateDocumentVisibility();
    media.addEventListener("change", updateMotionPreference);
    document.addEventListener("visibilitychange", updateDocumentVisibility);

    return () => {
      media.removeEventListener("change", updateMotionPreference);
      document.removeEventListener("visibilitychange", updateDocumentVisibility);
    };
  }, []);

  return (
    <div className="network-backdrop" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.2, 9.2], fov: 44, near: 0.08, far: 165 }}
        dpr={[1.35, 2]}
        frameloop={documentVisible ? "always" : "demand"}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
          stencil: false
        }}
      >
        <color attach="background" args={["#050807"]} />
        <fog attach="fog" args={["#050807", 24, 128]} />
        <Suspense fallback={null}>
          <NetworkExperience reducedMotion={reducedMotion} />
        </Suspense>
        <EffectComposer multisampling={4}>
          <Bloom luminanceThreshold={0.92} luminanceSmoothing={0.72} intensity={0.56} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default CatNetworkBackdrop;
