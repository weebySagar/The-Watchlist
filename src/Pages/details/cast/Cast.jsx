import React from 'react';
import { useSelector } from 'react-redux';
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import Img from '../../../Components/lazyLoadImage/Img';
import "./style.scss";
import avatar from "../../../assets/avatar.png"


const Cast = ({data,isLoading}) => {
const {url}=useSelector((state)=>state.home);
    return (
    <div className='cast-section'>
        <ContentWrapper>
            <div className="section-heading">
                Top Cast
            </div>
           {
            !isLoading?(
                    <div className="list-items">
                        {
                            data.map((item)=>{
                                let imgUrl= item.profile_path ?url.profile + item.profile_path:avatar
                                return (
                                    <div key={item.id} className='list-item'>
                                        <div className="profile-img">
                                        <Img src={imgUrl}/>
                                        </div>
                                        <div className="name">{item.name}</div>
                                        <div className="character">{item.character}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
            ):
            (
                <h2>Loading</h2>
            )
           }
        </ContentWrapper>
    </div>
  )
}

export default Cast