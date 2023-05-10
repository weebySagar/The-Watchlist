import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const BASE_URL="https://api.themoviedb.org/3";
const TMDB_API_TOKEN= process.env.REACT_APP_TMDB_MOVIE_API;

const headers ={
    Authorization:"bearer "+ TMDB_API_TOKEN,
}


export const fetchApi= createApi({
    reducerPath:"fetchApi",
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL}),
    endpoints:(builder)=>({
        fetchData:builder.query({
            query:(url,params)=>({
                url:`${url}`,
                method:"GET",
                headers:headers,
                
            })
            
        })
    })
})

export const {useFetchDataQuery} = fetchApi;