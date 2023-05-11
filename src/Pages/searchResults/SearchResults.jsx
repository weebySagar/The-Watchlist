import React, { useEffect, useState } from 'react';
import "./style.scss";
import { useParams } from 'react-router-dom';
import { useFetchDataQuery } from '../../Store/api';
import Spinner from '../../Components/spinner/Spinner';
import ContentWrapper from '../../Components/contentWrapper/ContentWrapper';
import MovieCard from '../../Components/movieCard/MovieCard';





const SearchResults = () => {
    const { query } = useParams();
    const [page, setPage] = useState(1)
    const { data, isLoading, isSuccess, refetch } = useFetchDataQuery(`/search/multi?query=${query}&page=${page}`);

    const nextPage = () => {

        if (page < data?.total_pages){

            setPage((prev) => prev + 1)
        }
            }

    const previousPage = () => {
        if (page > 1) {

            setPage((prev) => prev - 1);
        }


    }

    useEffect(() => {
        refetch();
        window.scrollTo(0, 0)
    }, [page, refetch])
    return (
        <div className='searchresults-page'>
            {isLoading && <Spinner loading={isLoading} />}
            {isSuccess && (
                <ContentWrapper>
                    {data?.results?.length > 0
                        ? (
                            <>
                                <div className="page-title">
                                    {`Search results for "${query}"`}
                                </div>
                                <div className='content'>
                                    {data.results.map((item, index) => {
                                        return <MovieCard key={index} data={item} fromSearch={true} />
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

                    <div className="pagination">

                        <button onClick={previousPage} disabled={page === 1}>Previous</button>
                        <span>{page}</span>
                        <button onClick={nextPage} disabled={page===data.total_pages}>Next</button>
                    </div>
                </ContentWrapper>
            )}
        </div>
    )
}

export default SearchResults