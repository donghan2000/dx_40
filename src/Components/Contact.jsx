import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import React, { useRef, useLayoutEffect, useEffect, useState } from 'react'
import { Canvas, extend, useFrame } from '@react-three/fiber';
import countries from "./Assets/custom.geo.json";
import lines from "./Assets/lines.json";
import map from "./Assets/map.json";
import rings from "./Assets/rings.json";
import { useInView } from 'react-intersection-observer';


export default function Contact() {

    extend({ ThreeGlobe })

    const [canvasRef, inView] = useInView({ threshold: 0 });

    const Globe = (props) => {
        // This reference will give us direct access to the ThreeGlobe class
        const globeRef = useRef()

        // An effect that runs after three.js elements are created but before render
        useEffect(() => {
            // Configure the globe

            const globe = globeRef.current;

            globe.hexPolygonsData(countries.features);
            globe.hexPolygonResolution(3);
            globe.hexPolygonMargin(0.3);
            globe.hexPolygonColor(() => '#8B0000');
            globe.showAtmosphere(true);
            globe.atmosphereColor('#1D1D1D');
            globe.atmosphereAltitude(0.4);

            // Change surface color
            globe.globeMaterial().color = new THREE.Color('#1D1D1D');
            globe.globeMaterial().emissiveIntensity = 0.1;
            globe.showGlobe(false);



            setTimeout(() => {
                globe.arcsData(lines.pulls)

                globe.arcColor((e) => {
                    return e.color ? "red" : "red"
                })

                globe.arcAltitude((e) => {
                    return e.arcAlt;
                })

                globe.arcStroke((e) => {
                    return e.status ? 0.5 : 0.5
                })

                globe.arcDashLength(1)
                globe.arcDashGap(4)
                globe.arcDashAnimateTime(4000)
                globe.arcsTransitionDuration(2000)
                globe.arcDashInitialGap((e) => e.order * 1)


                globe.labelsData(map.specifics)
                globe.labelText("country")
                globe.labelColor(() => 'white');
                globe.labelSize((e) => e.size * 2)
                globe.labelDotRadius(0.5)
                globe.labelResolution(10)
                globe.labelAltitude(0.01)



                globe.pointsData(map.specifics)
                globe.pointColor(() => "#D61424")
                globe.pointsMerge(true)
                globe.pointAltitude(0.1)
                globe.pointRadius(0.05)

                globe.ringsData(rings.circles)
                globe.ringColor(() => "white")
                globe.ringAltitude(0.0015)
                globe.ringResolution([128])
                globe.ringMaxRadius([3])
                globe.ringPropagationSpeed(1)
                globe.ringRepeatPeriod((e) => e.RepeatPeriod)


            }, 1000)

        }, []);

        useFrame((state, delta) => {
            // globeRef.current.rotation.y += delta * 0.01
            globeRef.current.rotation.y = -Math.sin(state.clock.elapsedTime / 20) * 0.2
        })


        // This is a ThreeGlobe object but represented in JSX.
        // Any valid properties of that class are valid props
        return <>
            <threeGlobe {...props} ref={globeRef} />
        </>
    }

    const handleButtonCllick = (e) => {
        e.preventDefault();
    }


    const handleEmailClick = (e) => {
        e.preventDefault();
        window.location.href = 'mailto:donghan20002@gmail.com';
    };

    const [scale, setScale] = useState();

    useEffect(() => {
        const handleResize = () => {
            let newScale = 0.15; // Default scale

            if (window.innerWidth < 1670) {
                newScale = 0.13;
            } else if (window.innerWidth < 1280) {
                newScale = 0.2;
            } else if (window.innerWidth < 767) {
                newScale = 0.1;
            }

            setScale(newScale);
        };

        handleResize(); // Call handleResize when the component mounts

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [addClass, setAddClass] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 3400) {
            setAddClass(true);
        }
    };


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    return <>
        <section className='section-dividers' id='contact' >

            <div className='crosses-l'>
                <div className='horizontal story-h'></div>
                <div className='vertical story-v'></div>
            </div>

            <div className='contact-div' >

                <div className="contact-form">
                    <div className={`contact-p ${addClass ? 'animate__animated animate__fadeIn animate__delay-2s' : ''}`}>
                        <header >My Contact</header>
                        <div className='behind-title-contact'>
                            <p>My @</p>
                        </div>
                    </div>

                    <div className={`contact-sub-text ${addClass ? 'animate__animated animate__fadeIn animate__delay-2s' : ''}`}>
                        <p>Thank you for taking the time to visit my website. If you have any questions or would like to get in touch with me, please feel free to use the contact form below.</p>
                    </div>


                    <div className={`form-div ${addClass ? 'animate__animated animate__fadeIn animate__delay-2s' : ''}`}>
                        <form action="https://formsubmit.co/37ce8add4d3e5112d718c592e53217b8" method="POST">

                            {/* Honey Pot */}
                            <input type='text' name='_honey' style={{ display: 'none' }} />

                            {/* Disable Captcha */}
                            <input type='hidden' name='_captcha' value="false" />

                            {/* Success Page */}
                            <input type='hidden' name="_next" value="http://donghan.co/success.html" />

                            <div className="form-group">
                                <div className="col-sm-12">
                                    <input type="text" className="form-control" id="fullname" name="Full&nbsp;Name" placeholder="NAME" required />
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="col-sm-12">
                                    <input type="email" className="form-control" id="email" name="Email" placeholder="EMAIL" required />
                                </div>
                            </div>

                            <textarea className="form-control" rows="10" placeholder="MESSAGE" name="Description"></textarea>

                            <button className="contact-wrap" id="submit" type="submit" value="SEND" method="POST">
                                <a aria-disabled="true" className="button">CONTACT ME</a>
                            </button>


                        </form>
                    </div>

                </div>


                <div ref={canvasRef} className={`contact-canvas ${addClass ? 'animate__animated animate__fadeIn' : ''}`}>
                    {inView && (
                        <Canvas className={`${addClass ? 'animate__animated animate__fadeIn  animate__delay-1s' : ''}`} performance={{ max: 0.1 }} camera={{ position: [30, -2, -5] }}>
                            <directionalLight position={[-80, 200, 40]} intensity={0.8} color="#D61424" />
                            <directionalLight position={[-20, 50, 20]} intensity={1} color="#D61424" />
                            <directionalLight position={[-20, 50, 20]} intensity={0.5} color="#D61424" />
                            <Globe scale={scale} />
                            <ambientLight />
                        </Canvas>
                    )}

                    <div className={`address ${addClass ? 'animate__animated animate__backInUp animate__delay-4s' : ''}`}>
                        <div className='add-text'>
                            <p>Low Dong Han,</p>
                            <p>Ang Mo Kio Avenue 10</p>
                            <p className='email-click' onClick={handleEmailClick}> <span className='span-add'>@ </span> : donghan20002@gmail.com</p>
                        </div>
                    </div>
                </div>

            </div>

        </section>

    </>



}