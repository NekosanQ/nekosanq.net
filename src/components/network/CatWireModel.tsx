"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import type { MutableRefObject } from "react";
import { useEffect, useMemo } from "react";
import { AdditiveBlending, FrontSide, MathUtils, MeshBasicMaterial, Raycaster, ShaderMaterial, Vector2, Vector3 } from "three";
import { createCatWireGeometry } from "./catWireGeometry";
import { catEdgeFragmentShader, catEdgeVertexShader, catNodeFragmentShader, catNodeVertexShader } from "./catWireShaders";

const CAT_MODEL_URL = "/models/network-cat.glb";

export type CatWireModelProps = {
  pointerNdcRef: MutableRefObject<Vector2>;
};

const smoothstep = (minimum: number, maximum: number, value: number) => {
  const normalized = MathUtils.clamp((value - minimum) / (maximum - minimum), 0, 1);
  return normalized * normalized * (3 - 2 * normalized);
};

export const CatWireModel = ({ pointerNdcRef }: CatWireModelProps) => {
  const { scene } = useGLTF(CAT_MODEL_URL);
  const { camera, gl, size } = useThree();
  const raycaster = useMemo(() => new Raycaster(), []);

  const geometry = useMemo(() => createCatWireGeometry(scene), [scene]);

  const uniforms = useMemo(
    () => ({
      uPixelRatio: { value: 1 },
      uRayDirection: { value: new Vector3(0, 0, -1) },
      uRayOrigin: { value: new Vector3(0, 0, 10) }
    }),
    []
  );

  const nodeMaterial = useMemo(() => {
    const material = new ShaderMaterial({
      vertexShader: catNodeVertexShader,
      fragmentShader: catNodeFragmentShader,
      uniforms,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      blending: AdditiveBlending
    });
    material.toneMapped = false;
    return material;
  }, [uniforms]);

  const edgeMaterial = useMemo(() => {
    const material = new ShaderMaterial({
      vertexShader: catEdgeVertexShader,
      fragmentShader: catEdgeFragmentShader,
      uniforms,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      blending: AdditiveBlending
    });
    material.toneMapped = false;
    return material;
  }, [uniforms]);

  const depthMaterial = useMemo(() => {
    const material = new MeshBasicMaterial({
      colorWrite: false,
      depthTest: true,
      depthWrite: true,
      side: FrontSide
    });
    material.polygonOffset = true;
    material.polygonOffsetFactor = 1;
    material.polygonOffsetUnits = 1;
    return material;
  }, []);

  useEffect(
    () => () => {
      geometry.surface.dispose();
      geometry.nodes.dispose();
      geometry.edges.dispose();
      nodeMaterial.dispose();
      edgeMaterial.dispose();
      depthMaterial.dispose();
    },
    [depthMaterial, edgeMaterial, geometry, nodeMaterial]
  );

  const responsiveLayout = useMemo(() => {
    const desktopProgress = smoothstep(480, 1360, size.width);
    return {
      positionX: MathUtils.lerp(0.7, 4.62, desktopProgress),
      scale: MathUtils.lerp(0.7, 1.4, desktopProgress)
    };
  }, [size.width]);

  useFrame(() => {
    raycaster.setFromCamera(pointerNdcRef.current, camera);
    uniforms.uRayOrigin.value.copy(raycaster.ray.origin);
    uniforms.uRayDirection.value.copy(raycaster.ray.direction);
    uniforms.uPixelRatio.value = Math.min(gl.getPixelRatio(), 2);
  });

  return (
    <group position={[responsiveLayout.positionX, -2.5, -3.6]} rotation={[0, Math.PI * 0.87, 0]} scale={responsiveLayout.scale}>
      <mesh geometry={geometry.surface} material={depthMaterial} renderOrder={0} />
      <lineSegments geometry={geometry.edges} material={edgeMaterial} renderOrder={1} frustumCulled={false} />
      <points geometry={geometry.nodes} material={nodeMaterial} renderOrder={2} frustumCulled={false} />
    </group>
  );
};

useGLTF.preload(CAT_MODEL_URL);
