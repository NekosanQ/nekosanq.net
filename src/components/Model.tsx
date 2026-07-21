import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, JSX } from "react";
import { Group } from "three";
type Object3DProps = JSX.IntrinsicElements["group"];

interface ModelProps extends Object3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

const Model: React.FC<ModelProps> = ({ position, rotation, scale = 1, ...props }) => {
  const group = useRef<Group>(null);
  const { scene } = useGLTF("/rocket_cat.glb");

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return <primitive ref={group} object={scene} position={position} rotation={rotation} scale={scale} {...props} />;
};

useGLTF.preload("/rocket_cat.glb");

export default Model;
