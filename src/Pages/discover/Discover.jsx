import React, { useEffect, useState } from 'react';
import ContentWrapper from '../../Components/contentWrapper/ContentWrapper';
import { useFetchDataQuery } from '../../Store/api';
import { useParams } from 'react-router-dom';
import Spinner from '../../Components/spinner/Spinner';
import MovieCard from '../../Components/movieCard/MovieCard';
import "./style.scss";


const Discover = () => {
    const[page,setPage]=useState(1)
    const { mediaType } = useParams();
    const { data, isLoading, isSuccess,isFetching,refetch } = useFetchDataQuery(`/discover/${mediaType}?page=${page}`)

    const nextPage=()=>{
        if(page<data?.total_pages){

            setPage((prev)=>prev+1)
        }
        
        
    }

    const previousPage=()=>{
        if(page>1){

            setPage((prev)=>prev-1);
        }
        

    }

    useEffect(() => {
     refetch();
     window.scrollTo(0,0)
    }, [page,refetch])
    
    return (
        <div className='discover-page'>
            <ContentWrapper>
                <div className="page-header">
                    <div className="page-title">
                        {mediaType ==="movie" ?"Explore Movies" : "Explore Tv Shows"}
                    </div>
                </div>
                {isFetching && <Spinner loading={isLoading} />}
                {isSuccess && (
                    data.results.length > 0
                        ?
                        <div className='content'>
                            {
                                data.results.map((item, index) => {
                                    if (item.media_type === "person") return
                                    return (
                                        <MovieCard key={index} data={item} mediaType={mediaType} />
                                    )
                                })}

                        </div> :

                        (<span className='result-not-found'>Sorry , Results not found</span>)

                )}
                <div className="pagination">

                 <button onClick={previousPage} disabled={page===1}>Previous</button>
                 <span>{page}</span>
                <button onClick={nextPage} disabled={page===data?.total_pages}>Next</button>
                </div>
            </ContentWrapper>
        </div>
    )
}

export default Discover