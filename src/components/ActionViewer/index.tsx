import React, { useRef, useState, forwardRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Group } from 'three';

import { useSelector, useDispatch } from 'react-redux';

const model_address = "/fitness_figure.glb";

type ModelProps = {
  active: boolean
}

type GLTFResult = GLTF & {
  nodes: {
    Plane003: THREE.Mesh;
    Plane003_1: THREE.Mesh;
    Plane003_2: THREE.Mesh;
    Plane003_3: THREE.Mesh;
    Plane003_4: THREE.Mesh;
  }
  materials: {
    Body: THREE.MeshStandardMaterial;
    Pupil: THREE.MeshStandardMaterial;
    Eye: THREE.MeshStandardMaterial;
    Shorts: THREE.MeshStandardMaterial;
    Hair: THREE.MeshStandardMaterial;
  }
}

const MascotModel = (props: {}) => {
  // This reference gives us direct access to the THREE.Mesh object
  const groupRef = useRef<Group>(null!);
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  //useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  //
  //
  const active = useSelector((state: any) => state.currentAction.active);

  useFrame(() => {
    if (active) {
      groupRef.current.rotation.y += 0.03;
    }
  });
  const { nodes, materials } = useGLTF(model_address) as GLTFResult;

  console.log(materials);
  // Return the view, these are regular Threejs elements expressed in JSX
  //
  return (
    <group ref={groupRef} dispose={null}>
      <ambientLight />
      <mesh rotation={[0, 10, 0]}>
        <boxGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={"#6be092"} />
      </mesh>
    <mesh castShadow receiveShadow {...props} geometry={nodes.Plane003.geometry} material={materials["Body"]}/>
    <mesh castShadow receiveShadow {...props} geometry={nodes.Plane003_1.geometry} material={materials["Pupil"]}/>
    <mesh castShadow receiveShadow {...props} geometry={nodes.Plane003_2.geometry} material={materials["Eye"]}/>
    <mesh castShadow receiveShadow {...props} geometry={nodes.Plane003_3.geometry} material={materials["Shorts"]}/>
    <mesh castShadow receiveShadow {...props} geometry={nodes.Plane003_4.geometry} material={materials["Hair"]}/>
    <mesh
      {...props}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
    >
      <cylinderGeometry args={[1, 1, 0.5]} />
      <meshStandardMaterial
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
    </group>
  );
})
 
useGLTF.preload(model_address);

export default MascotModel;
