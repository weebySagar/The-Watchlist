import React, { useRef } from "react";

import "swiper/css";
import "swiper/css/pagination";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "./style.scss";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import { useNavigate } from "react-router-dom";
import PosterFallBack from "../../assets/no-poster.png"
import Spinner from "../spinner/Spinner";




const Carousel = ({ data, isLoading,endpoint,title }) => {
    const carouselContainer = useRef();
    const navigate=useNavigate()
    const { url } = useSelector((state) => state.home);


    const navigation = (dir) => {
        console.log("clicked");
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
        
    };

    return (
        <div className="carousel">
            <ContentWrapper>
            {title && <div className="carousel-title">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />

                {!isLoading ?
                   ( <div className="carousel-items" ref={carouselContainer}>
                        {data?.map((item) => {
                            const posterUrl = item.poster_path
                                ? url.poster + item.poster_path
                                : PosterFallBack;
                            return (
                                <div className="carousel-item" key={item.id} onClick={()=>navigate(`/${item.media_type ||endpoint}/${item.id}`)}>

                                    <div className="poster-block">
                                        <Img src={posterUrl} />
                                        <CircleRating rating={item.vote_average.toFixed(1)}/>
                                        <Genres data={item.genre_ids.slice(0,2)}/>
                                    </div>
                                    <div className="text-block">
                                        <span className="title">{item.title || item.name}</span>
                                        <span className="date">
                                            {dayjs(item.release_date || item.first_air_date).format(
                                                "MMM D, YYYY"
                                            )}
                                        </span>
                                    </div>

                                </div>
                            );
                        })}
                    </div>)
                :<Spinner loading={isLoading}/>  
                }

            </ContentWrapper>
        </div>
    );
};

export default Carousel;
