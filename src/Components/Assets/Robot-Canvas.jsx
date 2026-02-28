import { PresentationControls, Float, useMatcapTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import Robot from './Robot.jsx'
import * as THREE from 'three'
import { Perf } from "r3f-perf";

// Optimization
const torusGeometry = new THREE.BoxGeometry(2, 2, 2)
const material = new THREE.MeshMatcapMaterial()

export default function RoCanvas() {
    const [matcapTexture] = useMatcapTexture('6D1616_E6CDBA_DE2B24_230F0F', 256)

    // Optimization 
    useEffect(() => {
        matcapTexture.encoding = THREE.sRGBEncoding
        matcapTexture.needsUpdate = true

        material.matcap = matcapTexture
        material.needsUpdate = true
    }, [])

    // Animation

    const donuts = useRef([])
    useFrame((state, delta) => {
        for (const donut of donuts.current) {
            donut.rotation.y += delta * 0.2
        }
    })



    return <>
        {/* <Perf position="top-right" /> */}
        <ambientLight />
        <PresentationControls
            global
            polar={[-0.1, -1.2]}
            azimuth={[-1, 0.75]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
        >
            <Float
                speed={3}
                rotationIntensity={.5}
                floatIntensity={.5}
                floatingRange={[0, 1]}
            >
                <group position={[0, -1.5, 0]}>
                    <Robot scale={0.5} />
                </group>
            </Float>
        </PresentationControls>


        {[...Array(100)].map((value, index) =>
            <mesh
                key={index}
                ref={(element) => donuts.current[index] = element}
                geometry={torusGeometry}
                material={material}
                position={[
                    (Math.random() - 0.5) * 15,
                    (Math.random() - 0.5) * 15,
                    (Math.random()) * -5
                ]}
                scale={0.2 + Math.random() * 0.2}
                rotation={[
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0
                ]}
            />
        )}




    </>

}
