import React from 'react'
import HeroBanner from './heroBanner/HeroBanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular';

import "./style.scss"
import TopRated from './topRated/topRated';
import Spinner from '../../Components/spinner/Spinner';


export const Home = ({isLoading}) => {
  return (
    <div>
      {isLoading && <Spinner loading={isLoading}/>}
      {!isLoading &&<>
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRated />
      
      </>
      }
    </div>
  )
}
