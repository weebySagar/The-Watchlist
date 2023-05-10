import React, { useState } from 'react'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import {GrClose} from 'react-icons/gr';
import  "./style.scss";
import { useNavigate } from 'react-router-dom';


const Search = ({setShowSearch}) => {
  const [query,setQuery]=useState();
  const navigate=useNavigate()
  const searchQueryHandler=(event)=>{
    
    if((event.type==="click" ||event.key==="Enter")&&query.length>0){
    navigate(`/search/${query}`);
    setShowSearch(false)
    }
}
  return (
    <div className='search'>
        <ContentWrapper>
        <div className="search-input">
            <input type="text" placeholder='Search Movies or TV Shows' onChange={(e)=>setQuery(e.target.value)} onKeyUp={searchQueryHandler}/>
            <GrClose onClick={()=>setShowSearch(false)}/>
        </div>
        </ContentWrapper></div>
  )
}

export default Search