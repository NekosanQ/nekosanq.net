import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect, JSX } from 'react';
import { Group } from 'three';
type Object3DProps = JSX.IntrinsicElements['group'];

interface ModelProps extends Object3DProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

const Model: React.FC<ModelProps> = ({ position, rotation, ...props }) => {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF('/maneki_neko.glb');
  const { actions } = useAnimations(animations, group);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    if (actions && actions['Animation']) {
      actions['Animation'].play();
    }
  }, [actions]);

  return <primitive ref={group} object={scene} position={position} rotation={rotation} scale={10} {...props} />;
};

useGLTF.preload('/maneki_neko.glb');

export default Model;
