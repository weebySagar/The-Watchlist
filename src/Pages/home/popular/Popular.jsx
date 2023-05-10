import React,{useState} from 'react';
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../Components/switchTabs/SwitchTabs';
import { useFetchDataQuery } from '../../../Store/api';
import Carousel from "../../../Components/carousel/Carousel"





const Popular = () => {
const [endpoint, setEndpoint] = useState("movie")
    const onTabChange=(tab)=>{
        setEndpoint(tab==="Movies" ?"movie":"tv")
    }

    const {data,isLoading}=useFetchDataQuery(`/${endpoint}/popular`)
  return (
    <div className='carousel-section'>
        <ContentWrapper>
            <span className="carousel-title">
                Popular
            </span>
            <SwitchTabs  data={["Movies","TV Shows"]} onTabChange={onTabChange}/>
        </ContentWrapper>
        <Carousel data={data?.results} isLoading={isLoading} endpoint={endpoint}/>
    </div>
  )
}

export default Popular