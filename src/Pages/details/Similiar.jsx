import React from 'react'
import Carousel from "../../Components/carousel/Carousel";
import { useFetchDataQuery } from '../../Store/api';

const Similiar = ({mediaType,id}) => {
    const {data,isLoading}=useFetchDataQuery(`/${mediaType}/${id}/similar`);
    const title = mediaType==="tv" ?"Similiar Tv Shows" :"Similiar Movies"
  return (
    <Carousel
    title={title}
    data={data?.results}
    isLoading={isLoading}
    endpoint={mediaType}
    />
  )
}

export default Similiar