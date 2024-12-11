import React from 'react'
import { Link } from 'react-router-dom'

function ThreeInOneDiv(props) {
    return (
        <>
            {/* First Div start */}
            <div className="FirstDiv">
                <p id='FirstDiv-heading'>{props.FirstDivHeading}</p>

                <div className="FirstDiv-cards">

                    <div className='FirstDiv-card' >
                        <Link to="/">
                            <div className='FirstDiv-card-image-div'>
                                <img src={props.FirstDivImg1} alt="thumbnail" className='FirstDiv-card-image' />
                            </div>
                            <div className='FirstDiv-card-image-info'>
                                <p>{props.FirstDivTitle1 && (((props.FirstDivTitle1).length > 16) ? (props.FirstDivTitle1.slice(0, 16) + "...") : props.FirstDivTitle1)}</p>
                                <h6>{props.FirstDivh61}</h6>
                            </div>
                        </Link>
                    </div>


                    <div className='FirstDiv-card' >
                        <Link to="/">
                            <div className='FirstDiv-card-image-div'>
                                <img src={props.FirstDivImg2} alt="thumbnail" className='FirstDiv-card-image' />
                            </div>
                            <div className='FirstDiv-card-image-info'>
                                <p>{props.FirstDivTitle2 && (((props.FirstDivTitle2).length > 16) ? (props.FirstDivTitle2.slice(0, 16) + "...") : props.FirstDivTitle2)}</p>
                                <h6>{props.FirstDivh62}</h6>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="FirstDiv-cards-2">
                    <div className='FirstDiv-card' >
                        <Link to="/">
                            <div className='FirstDiv-card-image-div'>
                                <img src={props.FirstDivImg3} alt="thumbnail" className='FirstDiv-card-image' />
                            </div>
                            <div className='FirstDiv-card-image-info'>
                                <p>{props.FirstDivTitle3 && (((props.FirstDivTitle3).length > 16) ? (props.FirstDivTitle3.slice(0, 16) + "...") : props.FirstDivTitle3)}</p>
                                <h6>{props.FirstDivh63}</h6>
                            </div>
                        </Link>
                    </div>

                    <div className='FirstDiv-card' >
                        <Link to="/">
                            <div className='FirstDiv-card-image-div'>
                                <img src={props.FirstDivImg4} alt="thumbnail" className='FirstDiv-card-image' />
                            </div>
                            <div className='FirstDiv-card-image-info'>
                                <p>{props.FirstDivTitle4 && (((props.FirstDivTitle4).length > 16) ? (props.FirstDivTitle4.slice(0, 16) + "...") : props.FirstDivTitle4)}</p>
                                <h6>{props.FirstDivh64}</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <p id='see-all-deals'><Link to={props.FirstDivLink}>See all deals</Link></p>

            </div>

            {/* Second Div start */}
            <div className="SecondDiv">
                <p id='SecondDiv-heading'>{props.SecondDivHeading}</p>

                <div className="SecondDiv-cards">

                    <div className='SecondDiv-card' >
                        <Link to="/">
                            <div className='SecondDiv-card-image-div'>
                                <img src={props.SecondDivImg1} alt="thumbnail" className='SecondDiv-card-image' />
                            </div>
                            <div className='SecondDiv-card-image-info'>
                                <p>{props.SecondDivTitle1 && (((props.SecondDivTitle1).length > 16) ? (props.SecondDivTitle1.slice(0, 16) + "...") : props.SecondDivTitle1)}</p>
                                <h6>{props.SecondDivh61}</h6>
                            </div>
                        </Link>
                    </div>


                    <div className='SecondDiv-card' >
                        <Link to="/">
                            <div className='SecondDiv-card-image-div'>
                                <img src={props.SecondDivImg2} alt="thumbnail" className='SecondDiv-card-image' />
                            </div>
                            <div className='SecondDiv-card-image-info'>
                                <p>{props.SecondDivTitle2 && (((props.SecondDivTitle2).length > 16) ? (props.SecondDivTitle2.slice(0, 16) + "...") : props.SecondDivTitle2)}</p>
                                <h6>{props.SecondDivh62}</h6>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="SecondDiv-cards-2">
                    <div className='SecondDiv-card' >
                        <Link to="/">
                            <div className='SecondDiv-card-image-div'>
                                <img src={props.SecondDivImg3} alt="thumbnail" className='SecondDiv-card-image' />
                            </div>
                            <div className='SecondDiv-card-image-info'>
                                <p>{props.SecondDivTitle3 && (((props.SecondDivTitle3).length > 16) ? (props.SecondDivTitle3.slice(0, 16) + "...") : props.SecondDivTitle3)}</p>
                                <h6>{props.SecondDivh63}</h6>
                            </div>
                        </Link>
                    </div>

                    <div className='SecondDiv-card' >
                        <Link to="/">
                            <div className='SecondDiv-card-image-div'>
                                <img src={props.SecondDivImg4} alt="thumbnail" className='SecondDiv-card-image' />
                            </div>
                            <div className='SecondDiv-card-image-info'>
                                <p>{props.SecondDivTitle4 && (((props.SecondDivTitle4).length > 16) ? (props.SecondDivTitle4.slice(0, 16) + "...") : props.SecondDivTitle4)}</p>
                                <h6>{props.SecondDivh64}</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <p id='see-all-deals'><Link to={props.SecondDivLink}>See all deals</Link></p>

            </div>

            {/* Third Div start */}
            <div className="ThirdDiv">
                <p id='ThirdDiv-heading'>{props.ThirdDivHeading}</p>

                <div className="ThirdDiv-cards">

                    <div className='ThirdDiv-card' >
                        <Link to="/">
                            <div className='ThirdDiv-card-image-div'>
                                <img src={props.ThirdDivImg1} alt="thumbnail" className='ThirdDiv-card-image' />
                            </div>
                            <div className='ThirdDiv-card-image-info'>
                                <p>{props.ThirdDivTitle1 && (((props.ThirdDivTitle1).length > 16) ? (props.ThirdDivTitle1.slice(0, 16) + "...") : props.ThirdDivTitle1)}</p>
                                <h6>{props.ThirdDivh61}</h6>
                            </div>
                        </Link>
                    </div>


                    <div className='ThirdDiv-card' >
                        <Link to="/">
                            <div className='ThirdDiv-card-image-div'>
                                <img src={props.ThirdDivImg2} alt="thumbnail" className='ThirdDiv-card-image' />
                            </div>
                            <div className='ThirdDiv-card-image-info'>
                                <p>{props.ThirdDivTitle2 && (((props.ThirdDivTitle2).length > 16) ? (props.ThirdDivTitle2.slice(0, 16) + "...") : props.ThirdDivTitle2)}</p>
                                <h6>{props.ThirdDivh62}</h6>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="ThirdDiv-cards-2">
                    <div className='ThirdDiv-card' >
                        <Link to="/">
                            <div className='ThirdDiv-card-image-div'>
                                <img src={props.ThirdDivImg3} alt="thumbnail" className='ThirdDiv-card-image' />
                            </div>
                            <div className='ThirdDiv-card-image-info'>
                                <p>{props.ThirdDivTitle3 && (((props.ThirdDivTitle3).length > 16) ? (props.ThirdDivTitle3.slice(0, 16) + "...") : props.ThirdDivTitle3)}</p>
                                <h6>{props.ThirdDivh63}</h6>
                            </div>
                        </Link>
                    </div>

                    <div className='ThirdDiv-card' >
                        <Link to="/">
                            <div className='ThirdDiv-card-image-div'>
                                <img src={props.ThirdDivImg4} alt="thumbnail" className='ThirdDiv-card-image' />
                            </div>
                            <div className='ThirdDiv-card-image-info'>
                                <p>{props.ThirdDivTitle4 && (((props.ThirdDivTitle4).length > 16) ? (props.ThirdDivTitle4.slice(0, 16) + "...") : props.ThirdDivTitle4)}</p>
                                <h6>{props.ThirdDivh64}</h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <p id='see-all-deals'><Link to={props.ThirdDivLink}>See all deals</Link></p>

            </div>

        </>
    )
}

export default ThreeInOneDiv