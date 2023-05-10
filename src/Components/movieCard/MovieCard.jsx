import React from 'react';
import Img from '../lazyLoadImage/Img';
import { useNavigate, } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CircleRating from '../circleRating/CircleRating';
import Genres from '../genres/Genres';
import PosterFallBack from "../../assets/no-poster.png"
import dayjs from 'dayjs';
import "./style.scss"

const MovieCard = ({data,fromSearch,mediaType}) => {
    const {url}=useSelector((state)=>state.home);
    const navigate=useNavigate();
    const posterUrl =data.poster_path ?url.poster+data.poster_path :PosterFallBack
  return (
    <div className='movie-card' onClick={()=>navigate(`/${data.media_type || mediaType}/${data.id}`)}>
        <div className="poster-block">
            <Img className="poster-img" src={posterUrl}/>
            {!fromSearch &&(
                <>
                <CircleRating rating={data.vote_average.toFixed(1)}/>
                <Genres data={data.genre_ids.slice(0,2)}/>
                </>
            )}
        </div>

        <div className="text-block">
                <span className="title">{data.name || data.title}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
        </div>
    </div>
  )
}

export default MovieCard