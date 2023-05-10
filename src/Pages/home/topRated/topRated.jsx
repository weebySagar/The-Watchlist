import React,{useState} from 'react';
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs';
import { useFetchDataQuery } from '../../../Store/api';
import Carousel from "../../../Components/carousel/Carousel"





const TopRated = () => {
const [endpoint, setEndpoint] = useState("movie")
    const onTabChange=(tab)=>{
        setEndpoint(tab==="Movies" ?"movie":"tv")
    }

    const {data,isLoading}=useFetchDataQuery(`/${endpoint}/top_rated`)
  return (
    <div className='carousel-section'>
        <ContentWrapper>
            <span className="carousel-title">
                Top Rated
            </span>
            <SwitchTabs  data={["Movies","TV Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} isLoading={isLoading} endpoint={endpoint}/>
    </div>
  )
}

export default TopRated