import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchDataQuery } from '../../../Store/api';
import { useSelector } from 'react-redux';
import Img from '../../../Components/lazyLoadImage/Img';
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import "./style.scss"






const HeroBanner = () => {
    
    const [background, setBackground] = useState(""); //for background image of hero banner
    const [searchQuery,setSearchQuery]=useState(""); //for search
    const navigate =useNavigate();//for navigating to other page
    const {data}=useFetchDataQuery("/movie/upcoming");
    const{url}=useSelector(state=>state.home)

    const searchQueryHandler=(event)=>{
        if((event.type==="click" ||event.key==="Enter")&&searchQuery.length>0){
        navigate(`/search/${searchQuery}`);
        }
    }

    useEffect(() => {
     const bg=url.backdrop+data?.results[Math.floor(Math.random()*20)].backdrop_path;
     setBackground(bg)
    }, [data])
    

  return (
    <div className='hero-banner'>
        <div className="backdrop-img">
            <Img src={background}/>
        </div>

        <div className="opacity-layer"></div>
        <ContentWrapper>
            <div className="hero-banner-content">
                <span className="title">Welcome</span>
                <span className="subtitle">The Ultimate Destination for Your Watchlist</span>

                <div className="search-input">
                    <input type="text" value={searchQuery} placeholder='Search for a Movie or TV Show' onChange={(e)=>setSearchQuery(e.target.value)}
                   onKeyUp={searchQueryHandler}
                    />
                    <button onClick={searchQueryHandler}>Search</button>
                </div>
            </div>
        </ContentWrapper>
    </div>
  )
}

export default HeroBanner