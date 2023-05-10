import React from 'react';
import ContentWrapper from '../../Components/contentWrapper/ContentWrapper';
import "./style.scss"


const PageNotFound = () => {
  return (
    <div className='page-not-found'>
        <ContentWrapper>
            <span className="big-text">404</span>
            <span className="small-text">Page Not Found!</span>
        </ContentWrapper>
    </div>
  )
}

export default PageNotFound