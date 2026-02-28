import React from "react";
import { useGLTF, Environment } from "@react-three/drei";

export default function Robot(props) {

    const { nodes, materials } = useGLTF("/models/robot.glb");
    return <>

        {/* <Environment preset="studio" /> */}
        {/* <Environment near={1} far={1000} resolution={256} preset="city" /> */}
        <Environment files="/potsdamer_platz_1k.hdr" />

        <group rotation={[0.3, 0, 0]} {...props} dispose={null}>

            <group rotation={[0, 0, -Math.PI / 2]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere002.geometry}
                    material={materials.Body}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere002_1.geometry}
                    material={materials.Eyes}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere002_2.geometry}
                    material={materials.Screen}
                />
            </group>
            <group rotation={[0, 0, Math.PI / 2]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere005_1.geometry}
                    material={materials.Headphones}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Sphere005_2.geometry}
                    material={materials.Body}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder002.geometry}
                material={materials.Body}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle004.geometry}
                material={materials.Joints}
                scale={0.29}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle005.geometry}
                material={materials.Joints}
                scale={0.29}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle006.geometry}
                material={materials.Body}
                scale={0.29}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Circle007.geometry}
                material={materials.Joints}
                scale={0.97}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Cylinder003.geometry}
                material={materials.Joints}
                rotation={[0, 0, 0.27]}
                scale={[0.07, 0.32, 0.08]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Sphere006.geometry}
                material={materials.Joints}
                scale={0.09}
            />
        </group>
    </>
}

// useGLTF.preload("models/robot.glb");