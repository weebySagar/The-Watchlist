import React from 'react'
import ContentWrapper from '../contentWrapper/ContentWrapper';
import "./style.scss"

const Footer = () => {
  return (
    <footer className='footer'>
        <ContentWrapper>
            <ul className="menu-items">
                <li className="menu-item">Terms of Use</li>
                <li className="menu-item">Privacy Policy</li>
                <li className="menu-item">About Us</li>
            </ul>

            <div className="greeting">
                made with love <span style={{color:"red"}}>{" "} &hearts;</span>
            </div>
        </ContentWrapper>

    </footer>
  )
}

export default Footer