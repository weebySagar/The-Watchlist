import React,{useState} from 'react';
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs';
import { useFetchDataQuery } from '../../../Store/api';
import Carousel from "../../../Components/carousel/Carousel";





const Trending = () => {
const [endpoint, setEndpoint] = useState("day")
    const onTabChange=(tab)=>{
        setEndpoint(tab==="Day" ?"day":"week")
    }

    const {data,isLoading}=useFetchDataQuery(`/trending/all/${endpoint}`)
  return (
    <div className='carousel-section'>
        <ContentWrapper>
            <span className="carousel-title">
                Trending
            </span>
            <SwitchTabs  data={["Day","Week"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} isLoading={isLoading}/>
    </div>
  )
}

export default Trending