import React from 'react';
import "./style.scss";
import { useParams } from 'react-router-dom';
import { useFetchDataQuery } from '../../Store/api';
import Spinner from '../../Components/spinner/Spinner';
import ContentWrapper from '../../Components/contentWrapper/ContentWrapper';
import MovieCard from '../../Components/movieCard/MovieCard';





const SearchResults = () => {
    const {query}=useParams();
    // const [pageNum, setPageNum] = useState(1)
    const {data,isLoading,isSuccess}=useFetchDataQuery(`/search/multi?query=${query}`)
  return (
    <div className='searchresults-page'>
        {isLoading && <Spinner loading={isLoading}/>}
        {isSuccess &&(
            <ContentWrapper>
                {data.results.length >0 
                ?(
                    <>
                    <div className="page-title">
                        {`Search results for "${query}"`}
                    </div>
                    <div className='content'>
                    {data.results.map((item,index)=>{
                        return <MovieCard key={index} data={item} fromSearch={true}/>
                    })}
                    </div>
                    </>
                )
                :
                (
                    <span className='results-not-found'>
                        Sorry , Not Found
                    </span>
                )}
                </ContentWrapper>
        )}
    </div>
  )
}

export default SearchResults