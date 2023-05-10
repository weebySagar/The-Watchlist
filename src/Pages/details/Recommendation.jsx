import React from 'react'
import Carousel from "../../Components/carousel/Carousel";
import { useFetchDataQuery } from '../../Store/api';

const Recommendation = ({mediaType,id}) => {
    const {data,isLoading}=useFetchDataQuery(`/${mediaType}/${id}/recommendations`);
  return (
    <Carousel
    title="Recommendations"
    data={data?.results}
    isLoading={isLoading}
    endpoint={mediaType}
    />
  )
}

export default Recommendation