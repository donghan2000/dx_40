import { useState, useEffect } from 'react'
import { a } from '@react-spring/web'
import { Slider } from './Slider'
import { items } from './Assets/items'



export default function Gallery() {

    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [activeHovered, setHovered] = useState(0)
    const [modal, setModal] = useState(false);
    const [openedModal, setOpen] = useState(0)
    const [scrollPosition, setScrollPosition] = useState(0);
    const [addClass, setAddClass] = useState(false);
    const [addSecClass, setAddSecClass] = useState(false);

    const onEnter = (i) => {
        setIsHovering(true);
        setHovered(i);
    }

    const onLeave = (event) => {
        setIsHovering(false)
    }

    const openModal = (i) => {
        console.log("modal " + i + " is open");
        setOpen(i);
        setModal(true);
        document.body.classList.add('modal-open');

    }

    const closeModal = (event) => {
        setModal(false);
        document.body.classList.remove('modal-open');
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    }, []);

    // console.log(scrollPosition)

    // Add or remove the class based on the scroll position
    useEffect(() => {
        if (scrollPosition > 400) {
            setAddClass(true);
        }

        if (scrollPosition > 500) {
            setAddSecClass(true)
        }

    }, [scrollPosition]);


    return <>

        <div items={items} className={`work-modal ${modal ? 'animate__animated animate__backInUp' : ''}`}
            style={{ display: modal ? "block" : "none" }}
        >

            <button onClick={() => closeModal()} className='works-close-button'>
                <span className='modal-close'>x</span>
            </button>

            <div className='work-flex-div' >

                <div className='work-modal-div'>
                    <img className='work-modal-images' src={items[openedModal].workContentImage} alt='gallery-images' />
                </div>

                <div className='works-modal-title'>
                    <h1>{items[openedModal].Title}</h1>

                    <div className='modal-para'>
                        <p>{items[openedModal].firstParagraph}</p>
                    </div>

                    <div className='modal-para'>
                        <p>{items[openedModal].secondParagraph}</p>
                    </div>

                    <div className='modal-para'>
                        <p>{items[openedModal].thirdParagraph}</p>
                    </div>

                    <a className="pro-link" href={items[openedModal].linkGoto} target="_blank">{items[openedModal].linkText}</a>
                    <a className="pro-link" href={items[openedModal].linkSecondGoto} target="_blank">{items[openedModal].linkSecondText}</a>

                </div>



            </div>

        </div>

        <section className='section-dividers' id='portfolio'>
            <div className="work-flex fill center work-container" >

                <div className='title'>
                    <div className='crosses-r'>
                        <div className='horizontal gallery-h'></div>
                        <div className='vertical gallery-v'></div>
                    </div>
                    <h1 className={`${addClass ? 'animate__animated animate__fadeIn' : ''}`}>My Portfolio</h1>
                    <p className={`behind-title ${addClass ? 'animate__animated animate__fadeIn' : ''}`}>
                        My Works
                    </p>
                    <div className={`sub-title-text ${addClass ? 'animate__animated animate__fadeIn' : ''}`}>
                        <p>My portfolio features a collection of website coding and design projects,
                            highlighting my skills in HTML, CSS, JavaScript, and responsive design.
                            Explore my work and see how I can bring your website to life.</p>
                    </div>
                </div>

                <div className={`work-main ${addSecClass ? 'animate__animated animate__fadeInRight opacity-class' : ''}`}>
                    <Slider items={items} width={700} visible={4} setActiveIndex={setActiveIndex} setModal={setModal}>
                        {({ imageUrl, Title }, i) => (
                            <div className="work-content">
                                <div className="work-marker">{Title}</div>

                                <a.div
                                    className="works-gallery-image"
                                    style={{
                                        backgroundImage: imageUrl,
                                        opacity: i === activeHovered && isHovering ? "0.25" : "1",
                                        backgroundSize: i === activeHovered && isHovering ? "150%" : "100%"
                                    }}
                                    onPointerEnter={() => onEnter(i)}
                                    onPointerLeave={(onLeave)}
                                />

                                <div className='work-circle'
                                    style={{
                                        opacity: i === activeHovered && isHovering ? "1" : "0",
                                        width: i === activeHovered && isHovering ? "100px" : "0",
                                        height: i === activeHovered && isHovering ? "100px" : "0",
                                        backgroundSize: i === activeHovered && isHovering ? "150%" : "100%"
                                    }}
                                    onPointerEnter={() => onEnter(i)}
                                    onPointerLeave={(onLeave)}
                                    onClick={() => openModal(i)}
                                ></div>

                            </div>
                        )}
                    </Slider>
                </div>




                <div className={`nav-works-index ${addSecClass ? 'animate__animated animate__fadeIn opacity-class' : ''}`}>
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className={`work-dot ${i === activeIndex ? 'gallery-active' : ' '}`}
                        />
                    ))}
                </div>
            </div>
        </section>

    </>

}