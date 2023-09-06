import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { Group } from 'three';
import * as THREE from 'three';

import { useSelector, useDispatch } from 'react-redux';

const model_address = "/fitness_figure.glb";

type ModelProps = {
  active: boolean
}

type GLTFResult = GLTF & {

  animations: THREE.AnimationClip[];

  scene: Group;

}

const MascotModel = ((props: {}) => {

  const groupRef = useRef<Group>(null!);

  const active = useSelector((state: any) => state.currentAction.active);

  const GLTF = useGLTF(model_address) as any;

  GLTF.scene.children = [GLTF.scene.children[0]];

  let mixer: THREE.AnimationMixer = new THREE.AnimationMixer(GLTF.scene);

  useFrame(() => {
    let delta = 0.003;
    if (active) { delta = 0.01; }
      groupRef.current.rotation.y += delta;
      mixer.update(delta);
  });

  useEffect(() => {
    if (GLTF.animations.length) {
      if (active) {
        mixer.clipAction(GLTF.animations[1]).play();
      } else{
        mixer.clipAction(GLTF.animations[0]).play();
      }
    };
  });

  return (
    <group ref={groupRef} dispose={null}>

      <primitive object={GLTF.scene} />
      <ambientLight />

    </group>
  );
});
 
useGLTF.preload(model_address);

export default MascotModel;
