import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useInView } from "react-intersection-observer";
import RoCanvas from "./Assets/Robot-Canvas.jsx";

export default function Story() {
  const [canvasRef, inView] = useInView({ threshold: 0 });

  const [addClass, setAddClass] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 1500) {
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
      <section className="section-dividers" id="story">
        <div className="crosses-l">
          <div className="horizontal story-h"></div>
          <div className="vertical story-v"></div>
        </div>

        <div ref={canvasRef} className="about-div ">
          <div className="about-text">
            <div className="about-p">
              <header
                className={`${addClass ? "animate__animated animate__fadeIn animate__delay-1s" : ""}`}
              >
                My Story
              </header>
              <div
                className={`behind-title-left ${addClass ? "animate__animated animate__fadeIn animate__delay-1s" : ""}`}
              >
                {/* <p>Myself</p> */}
              </div>

              <div className="about-bubble-p">
                <p
                  className={`about-p-left ${addClass ? "animate__animated animate__jackInTheBox animate__delay-1s" : ""}`}
                >
                  Welcome to my portfolio site. I am a passionate designer who
                  enjoys creating visual ideas and turning them into meaningful
                  designs. I have skills in both 2D and 3D, which help me bring
                  creativity to my work. Designing is not just my skill but also
                  my passion, and I am always eager to learn and grow in this
                  field.
                </p>

                <p
                  className={`about-p-left ${addClass ? "animate__animated animate__jackInTheBox animate__delay-2s" : ""}`}
                >
                  My hobbies include playing games, watching anime and drawing.
                </p>

                <p
                  className={`about-p-left ${addClass ? "animate__animated animate__jackInTheBox animate__delay-3s" : ""}`}
                >
                  {" "}
                  I am always eager to learn and improve my craft to help better
                  myself therefore I look forward to collaborating with those
                  reading this and creating something special together.
                </p>
              </div>
            </div>
          </div>

          {/* <div
            className={`about-canvas ${addClass ? "animate__animated animate__fadeIn" : ""}`}
          >
            {inView && (
                        <Canvas className={`${addClass ? 'animate__animated animate__fadeIn  animate__delay-1s' : ''}`}>
                            <ambientLight />
                            <RoCanvas />
                        </Canvas>
                    )}
          </div> */}
        </div>
      </section>
    </>
  );
}
