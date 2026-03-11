import { useState, useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { BakeShadows, useCursor } from "@react-three/drei";
import { TextureLoader } from "three";
import { skillsets } from "./Assets/Skillset";
import { Perf } from "r3f-perf";
import { useInView } from "react-intersection-observer";

export default function Experience() {
  const [canvasRef, inView] = useInView({ threshold: 0 });
  const [addClass, setAddClass] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 2700) {
      setAddClass(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <section className="section-dividers" id="skills">
        <div className="skills-canvas-section">
          <div
            ref={canvasRef}
            className={`skills-individual-template ${addClass ? "animate__animated animate__fadeIn" : ""}`}
          >
            {inView && (
              <Canvas
                className="animate__animated animate__fadeIn animate__delay-1s"
                performance={{ max: 0.1 }}
                shadows
                dpr={1.5}
                camera={{ position: [-6, 22, -15], fov: 35 }}
              >
                {/* <Perf position="top-left" /> */}
                <Stage />
                {skillsets.map((skillset, i) => {
                  const angle = -1.2 + i * 0.22;
                  const radius = 7;

                  const centerX = -6; // move arc right
                  const centerZ = 3;

                  return (
                    <Stair
                      key={i}
                      rotation={[Math.PI / 2, 0, angle + Math.PI / 2]}
                      position={[
                        centerX + Math.cos(angle) * radius,
                        i * 0.35,
                        centerZ + Math.sin(angle) * radius,
                      ]}
                      textureUrl={skillset.imageUrl}
                    />
                  );
                })}
              </Canvas>
            )}
          </div>

          <div className="crosses-r">
            <div className="horizontal skills-h"></div>
            <div className="vertical skills-v"></div>
          </div>

          <div className="skills-text-half">
            <div className="skills-experience-text-title">
              <div
                className={`skill-header ${addClass ? "animate__animated animate__fadeIn" : ""}`}
              >
                <header>My Skills</header>
                <p>
                  I have skills ranging from 2D and 3D software, I am excited to
                  use my skills to contribute to create projects
                </p>
              </div>

              {/* <div
                className={`behind-title-skill ${addClass ? "animate__animated animate__fadeIn" : ""}`}
              >
                <p>My Experiences</p>
              </div> */}

              <div
                className={`experiences-container ${addClass ? "animate__animated animate__fadeIn animate__delay-1s" : ""}`}
              >
                <header>Work Experiences</header>
                <div className="experiences-row-1">
                  <div className="exp-small">
                    <p>NTUC Fairprice</p>
                    <p>2017-2017</p>
                  </div>
                  <div className="exp-small ">
                    <p>Hello Holo</p>
                    <p>2021-2021</p>
                  </div>
                </div>
                <div className="experiences-row-1">
                  <div className="exp-small">
                    <p>IDENTIV</p>
                    <p>2018-2018</p>
                  </div>
                  <div className="exp-small exp-second">
                    <p>RSAF</p>
                    <p>2021-2023</p>
                  </div>
                </div>
                <div className="experiences-row-1">
                  <div className="exp-small">
                    <p>SIMBA</p>
                    <p>2024 - Now</p>
                  </div>
                  <div className="exp-small exp-second"></div>
                </div>
              </div>
            </div>
            <div
              className={`skills-proficiencies-text-title ${addClass ? "animate__animated animate__fadeIn animate__delay-2s" : ""}`}
            ></div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stair({ textureUrl: initialTextureUrl, ...props }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [textureUrl, setTextureUrl] = useState(initialTextureUrl);
  const [clicked, setClicked] = useState(false);
  const texture = useLoader(TextureLoader, textureUrl);

  const handleMouseOver = () => {
    setHovered(true);
  };

  const handleMouseOut = () => {
    setHovered(false);
  };

  useFrame((state) =>
    ref.current.scale.setScalar(
      hovered ? 1 + Math.sin(state.clock.elapsedTime * 10) / 50 : 1,
    ),
  );
  useCursor(hovered);
  return (
    <mesh
      {...props}
      ref={ref}
      castShadow
      onClick={(e) => {
        e.stopPropagation();
        setClicked(!clicked);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        handleMouseOver();
      }}
      onPointerOut={(e) => handleMouseOut()}
    >
      <boxGeometry args={[2, 6, 0.075]} />
      <meshStandardMaterial
        map={texture}
        roughness={1}
        transparent
        opacity={hovered ? 1 : 1}
        // color={hovered ? "red" : "white"}
      />
    </mesh>
  );
}

function Stage() {
  return (
    <>
      {/* Fill */}
      <ambientLight intensity={0.5} />
      {/* Main */}
      <directionalLight
        position={[1, 10, -2]}
        intensity={0.5}
        shadow-camera-far={70}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-mapSize={[512, 512]}
        castShadow
        color="#A7A2A2"
      />
      {/* Strip */}
      <directionalLight
        position={[-10, -10, 2]}
        intensity={3}
        color="#30D5C8"
      />
      {/* Ground */}
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.75, 0]}>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
      {/* This freezes the shadow map, which is fast, but the model has to be static  */}
      <BakeShadows />
    </>
  );
}
