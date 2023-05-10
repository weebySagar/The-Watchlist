import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import "./style.scss"

const Spinner = ({loading}) => {
  return (
    <div className='loading-spinner'>
        <ClipLoader
         color="#59c173"
         loading={true}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
    </div>
  )
}

export default Spinner