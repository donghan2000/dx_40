import { useEffect, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { useInView } from 'react-intersection-observer';
import RoCanvas from './Assets/Robot-Canvas.jsx';



export default function Story() {

    const [canvasRef, inView] = useInView({ threshold: 0 });

    const [addClass, setAddClass] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 1500) {
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
        <section className='section-dividers' id="story">
            <div className='crosses-l'>
                <div className='horizontal story-h'></div>
                <div className='vertical story-v'></div>
            </div>

            <div ref={canvasRef} className='about-div '>
                <div className='about-text'>

                    <div className='about-p'>

                        <header className={`${addClass ? 'animate__animated animate__fadeIn animate__delay-1s' : ''}`}>My Story</header>
                        <div className={`behind-title-left ${addClass ? 'animate__animated animate__fadeIn animate__delay-1s' : ''}`}>
                            <p>Myself</p>
                        </div>

                        <div className='about-bubble-p'>

                            <p className={`about-p-left ${addClass ? 'animate__animated animate__jackInTheBox animate__delay-1s' : ''}`}>Welcome to my portfolio site. I am an aspiring junior web developer with a passion for the field. My expertise is in Javascript and CSS, and I am currently learning React and Node frameworks.
                                I have basic knowledge of PHP and SQL.
                            </p>

                            <p className={`about-p-right ${addClass ? 'animate__animated animate__jackInTheBox animate__delay-2s' : ''}`}>My hobbies include playing games, reading light novels, and watching anime. I recently started learning Japanese on my own with the goal of gaining a basic understanding.
                            </p>

                            <p className={`about-p-left ${addClass ? 'animate__animated animate__jackInTheBox animate__delay-3s' : ''}`}> I am continuously learning new web development techniques and look forward to collaborating with those reading this.
                            </p>

                        </div>
                    </div>
                </div>

                <div className={`about-canvas ${addClass ? 'animate__animated animate__fadeIn' : ''}`}>
                    {inView && (
                        <Canvas className={`${addClass ? 'animate__animated animate__fadeIn  animate__delay-1s' : ''}`}>
                            <ambientLight />
                            <RoCanvas />
                        </Canvas>
                    )}
                </div>
            </div>



        </section>
    </>

}