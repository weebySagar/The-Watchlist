import React from 'react';
import DetailsBanner from './detailsBanner.jsx/DetailsBanner';
import { useParams } from 'react-router-dom';
import { useFetchDataQuery } from '../../Store/api';
import Cast from './cast/Cast';
import VideoSection from './videoSection/VideoSection';
import Similiar from './Similiar';
import Recommendation from './Recommendation';





const Details = () => {
  const { mediaType, id } = useParams();
  const { data, isLoading } = useFetchDataQuery(
    `${mediaType}/${id}/videos`);
  const { data: creditsData, isLoading: creditsLoading } = useFetchDataQuery(
    `${mediaType}/${id}/credits`);
  return (
    <div>
      <DetailsBanner video={data?.results[0]} crew={creditsData?.crew} />
      <Cast data={creditsData?.cast} isLoading={creditsLoading} />
      {data?.results?.length>0 &&
        <VideoSection data={data} isLoading={isLoading} />}
        <Similiar mediaType={mediaType} id={id} />
      <Recommendation mediaType={mediaType} id={id} />
    </div>
  )
}

export default Details