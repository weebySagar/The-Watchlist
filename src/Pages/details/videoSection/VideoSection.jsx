import React, { useState } from 'react';
import "./style.scss";
import ContentWrapper from '../../../Components/contentWrapper/ContentWrapper';
import Img from '../../../Components/lazyLoadImage/Img';
import PlayBtn from '../PlayBtn';
import VideoPopup from '../../../Components/videoPopup/VideoPopup';




const VideoSection = ({ data, isLoading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null)
    return (
        <div className='video-section'>
            <ContentWrapper>
                <div className="section-heading">
                    Official Videos
                </div>
                {
                        !isLoading ?
                            (
                                <div className="videos">
                                    {data?.results?.map((video) => (
                                        <div className="video-item" key={video.id} onClick={() => {
                                            setShow(true);
                                            setVideoId(video.key)
                                        }}>
                                            <div className="video-thumbnail">
                                                <Img src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                                <PlayBtn />
                                            </div>
                                            <div className="video-title">
                                                {video.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                            :
                            (<h2>Loading</h2>)
                    }
            </ContentWrapper>

            <VideoPopup
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
                show={show}
            />
        </div>
    )
}

export default VideoSection