import { TessellateModifier } from "three/examples/jsm/modifiers/TessellateModifier.js";
import { mergeGeometries, mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Box3, BufferAttribute, BufferGeometry, Float32BufferAttribute, MathUtils, Mesh, Object3D, Vector3 } from "three";

export type CatWireGeometry = {
  surface: BufferGeometry;
  nodes: BufferGeometry;
  edges: BufferGeometry;
};

type EdgeRecord = {
  a: number;
  b: number;
  faceNormals: Vector3[];
};

const TESSELLATION_EDGE_LENGTH = 0.2;
const TESSELLATION_ITERATIONS = 5;
const MERGE_TOLERANCE = 1e-4;

const copyPositionOnly = (mesh: Mesh): BufferGeometry => {
  const sourcePosition = mesh.geometry.getAttribute("position");
  const positions = new Float32Array(sourcePosition.count * 3);

  for (let index = 0; index < sourcePosition.count; index += 1) {
    positions[index * 3] = sourcePosition.getX(index);
    positions[index * 3 + 1] = sourcePosition.getY(index);
    positions[index * 3 + 2] = sourcePosition.getZ(index);
  }

  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(positions, 3));

  const sourceIndex = mesh.geometry.getIndex();
  if (sourceIndex) {
    const indices = new Array<number>(sourceIndex.count);
    for (let index = 0; index < sourceIndex.count; index += 1) {
      indices[index] = sourceIndex.getX(index);
    }
    geometry.setIndex(indices);
  }

  geometry.applyMatrix4(mesh.matrixWorld);

  if (!geometry.index) return geometry;

  const nonIndexed = geometry.toNonIndexed();
  geometry.dispose();
  return nonIndexed;
};

const buildSurfaceGeometry = (scene: Object3D): BufferGeometry => {
  scene.updateMatrixWorld(true);

  const pieces: BufferGeometry[] = [];
  scene.traverse((object) => {
    if (object instanceof Mesh && object.geometry.getAttribute("position")) {
      pieces.push(copyPositionOnly(object));
    }
  });

  if (pieces.length === 0) {
    throw new Error("The cat GLB does not contain renderable mesh geometry.");
  }

  const merged = mergeGeometries(pieces, false);
  pieces.forEach((geometry) => geometry.dispose());

  if (!merged) {
    throw new Error("The cat mesh geometries could not be merged.");
  }

  const firstWeld = mergeVertices(merged, MERGE_TOLERANCE);
  merged.dispose();

  const tessellated = new TessellateModifier(TESSELLATION_EDGE_LENGTH, TESSELLATION_ITERATIONS).modify(firstWeld);
  firstWeld.dispose();

  const surface = mergeVertices(tessellated, MERGE_TOLERANCE);
  tessellated.dispose();

  const bounds = new Box3().setFromBufferAttribute(surface.getAttribute("position") as BufferAttribute);
  const center = bounds.getCenter(new Vector3());
  surface.translate(-center.x, -bounds.min.y, -center.z);
  surface.computeVertexNormals();
  surface.computeBoundingBox();
  surface.computeBoundingSphere();

  return surface;
};

const edgeKey = (a: number, b: number) => (a < b ? `${a}:${b}` : `${b}:${a}`);

const addTriangleEdge = (records: Map<string, EdgeRecord>, a: number, b: number, faceNormal: Vector3) => {
  const start = Math.min(a, b);
  const end = Math.max(a, b);
  const key = edgeKey(start, end);
  const current = records.get(key);

  if (current) {
    current.faceNormals.push(faceNormal.clone());
    return;
  }

  records.set(key, { a: start, b: end, faceNormals: [faceNormal.clone()] });
};

const stableNoise = (position: Vector3) => {
  const value = Math.sin(position.x * 12.9898 + position.y * 78.233 + position.z * 37.719) * 43758.5453;
  return value - Math.floor(value);
};

const edgeCrease = (normals: Vector3[]) => {
  if (normals.length < 2) return 1;

  let crease = 0;
  for (let first = 0; first < normals.length - 1; first += 1) {
    for (let second = first + 1; second < normals.length; second += 1) {
      crease = Math.max(crease, 1 - Math.abs(normals[first].dot(normals[second])));
    }
  }
  return crease;
};

const buildWireGeometries = (surface: BufferGeometry) => {
  const position = surface.getAttribute("position") as BufferAttribute;
  const normal = surface.getAttribute("normal") as BufferAttribute;
  const index = surface.getIndex();

  if (!index) {
    throw new Error("The tessellated cat surface must be indexed.");
  }

  const edgeRecords = new Map<string, EdgeRecord>();
  const a = new Vector3();
  const b = new Vector3();
  const c = new Vector3();
  const faceNormal = new Vector3();
  const firstSide = new Vector3();
  const secondSide = new Vector3();

  for (let triangle = 0; triangle < index.count; triangle += 3) {
    const ia = index.getX(triangle);
    const ib = index.getX(triangle + 1);
    const ic = index.getX(triangle + 2);

    a.fromBufferAttribute(position, ia);
    b.fromBufferAttribute(position, ib);
    c.fromBufferAttribute(position, ic);
    firstSide.subVectors(b, a);
    secondSide.subVectors(c, a);
    faceNormal.crossVectors(firstSide, secondSide).normalize();

    addTriangleEdge(edgeRecords, ia, ib, faceNormal);
    addTriangleEdge(edgeRecords, ib, ic, faceNormal);
    addTriangleEdge(edgeRecords, ic, ia, faceNormal);
  }

  const nodeDegree = new Uint16Array(position.count);
  const nodeWeightSum = new Float32Array(position.count);
  const edgePosition = new Float32Array(edgeRecords.size * 6);
  const edgeNormal = new Float32Array(edgeRecords.size * 6);
  const edgeWeight = new Float32Array(edgeRecords.size * 2);

  let edgeOffset = 0;
  edgeRecords.forEach((record) => {
    const boundary = record.faceNormals.length === 1 ? 1 : 0;
    const crease = edgeCrease(record.faceNormals);
    const weight = MathUtils.clamp(0.48 + crease * 0.92 + boundary * 0.42, 0.48, 1.72);

    edgePosition[edgeOffset * 6] = position.getX(record.a);
    edgePosition[edgeOffset * 6 + 1] = position.getY(record.a);
    edgePosition[edgeOffset * 6 + 2] = position.getZ(record.a);
    edgePosition[edgeOffset * 6 + 3] = position.getX(record.b);
    edgePosition[edgeOffset * 6 + 4] = position.getY(record.b);
    edgePosition[edgeOffset * 6 + 5] = position.getZ(record.b);

    edgeNormal[edgeOffset * 6] = normal.getX(record.a);
    edgeNormal[edgeOffset * 6 + 1] = normal.getY(record.a);
    edgeNormal[edgeOffset * 6 + 2] = normal.getZ(record.a);
    edgeNormal[edgeOffset * 6 + 3] = normal.getX(record.b);
    edgeNormal[edgeOffset * 6 + 4] = normal.getY(record.b);
    edgeNormal[edgeOffset * 6 + 5] = normal.getZ(record.b);

    edgeWeight[edgeOffset * 2] = weight;
    edgeWeight[edgeOffset * 2 + 1] = weight;

    nodeDegree[record.a] += 1;
    nodeDegree[record.b] += 1;
    nodeWeightSum[record.a] += weight;
    nodeWeightSum[record.b] += weight;
    edgeOffset += 1;
  });

  const nodePosition = new Float32Array(position.count * 3);
  const nodeNormal = new Float32Array(position.count * 3);
  const nodeWeight = new Float32Array(position.count);
  const nodeSize = new Float32Array(position.count);
  const samplePosition = new Vector3();

  for (let node = 0; node < position.count; node += 1) {
    samplePosition.fromBufferAttribute(position, node);
    nodePosition.set(samplePosition.toArray(), node * 3);
    nodeNormal[node * 3] = normal.getX(node);
    nodeNormal[node * 3 + 1] = normal.getY(node);
    nodeNormal[node * 3 + 2] = normal.getZ(node);

    const averageEdgeWeight = nodeWeightSum[node] / Math.max(1, nodeDegree[node]);
    const topologyWeight = MathUtils.clamp(0.5 + averageEdgeWeight * 0.34 + Math.min(nodeDegree[node], 8) * 0.025, 0.62, 1.32);
    nodeWeight[node] = topologyWeight;
    nodeSize[node] = 0.68 + stableNoise(samplePosition) * 0.3 + topologyWeight * 0.18;
  }

  const nodes = new BufferGeometry();
  nodes.setAttribute("position", new Float32BufferAttribute(nodePosition, 3));
  nodes.setAttribute("nodeNormal", new Float32BufferAttribute(nodeNormal, 3));
  nodes.setAttribute("nodeWeight", new Float32BufferAttribute(nodeWeight, 1));
  nodes.setAttribute("nodeSize", new Float32BufferAttribute(nodeSize, 1));
  nodes.computeBoundingBox();
  nodes.computeBoundingSphere();

  const edges = new BufferGeometry();
  edges.setAttribute("position", new Float32BufferAttribute(edgePosition, 3));
  edges.setAttribute("edgeNormal", new Float32BufferAttribute(edgeNormal, 3));
  edges.setAttribute("edgeWeight", new Float32BufferAttribute(edgeWeight, 1));
  edges.computeBoundingBox();
  edges.computeBoundingSphere();

  return { nodes, edges };
};

export const createCatWireGeometry = (scene: Object3D): CatWireGeometry => {
  const surface = buildSurfaceGeometry(scene);
  const { nodes, edges } = buildWireGeometries(surface);
  return { surface, nodes, edges };
};
