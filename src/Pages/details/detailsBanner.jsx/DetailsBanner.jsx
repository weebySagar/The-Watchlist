import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchDataQuery } from "../../../Store/api";
import dayjs from "dayjs";
import ContentWrapper from "../../../Components/contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";
import Img from "../../../Components/lazyLoadImage/Img";
import { Fragment } from "react";
import PosterImage from "../../../assets/no-poster.png";
import Genres from "../../../Components/genres/Genres";
import CircleRating from "../../../Components/circleRating/CircleRating";
import PlayBtn from "../PlayBtn"
import VideoPopup from "../../../Components/videoPopup/VideoPopup";
import "./style.scss"
import Spinner from "../../../Components/spinner/Spinner";


const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null)
    const { mediaType, id } = useParams();
    const { data, isLoading } = useFetchDataQuery(
        `${mediaType}/${id}`
    );
    const { url } = useSelector((state) => state.home);

    const _genres = data?.genres?.map((g) => g.id);
    const director = crew?.filter((f) => f.job === "Director");
    const writer = crew?.filter((f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer")


    const convertMinutesToHours=(totalMinutes)=>{
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    }
    return (
        <div className="details-banner">
            {!isLoading ? (
                <>
                {!!data &&(
                <Fragment>
                    <div className="backdrop-img">
                        <Img src={url.backdrop + data.backdrop_path} />
                    </div>
                    <div className="opacity-layer"></div>

                    <ContentWrapper>
                        <div className="content">
                            <div className="left">
                                {data.poster_path ? (
                                    <Img
                                        className="poster-image"
                                        src={url.backdrop + data.poster_path}
                                    />
                                ) : (
                                    <Img className="poster-image" src={PosterImage} />
                                )}
                            </div>


                            <div className="right">
                                <div className="title">
                                    {`${data.name || data.title}
                                  (${dayjs(data.release_date || data.first_air_date).format("YYYY")})`}
                                </div>

                                <div className="subtitle">{data.tagline}</div>
                                <Genres data={_genres} />
                                <div className="row">
                                    <CircleRating rating={data?.vote_average?.toFixed(1)} />
                                        {
                                            video &&
                                        
                                    <div className="playbtn" onClick={() => {
                                        setShow(true);
                                        setVideoId(video.key)
                                              }}>
                                        <PlayBtn />
                                        <span className="text">
                                            Watch Trailer
                                        </span>
                                    </div>
                                    }
                                </div>

                                <div className="overview">
                                    <div className="heading">Overview</div>
                                    <div className="description">
                                        {data.overview}
                                    </div>
                                </div>

                                <div className="info">
                                    {data.status && (
                                        <div className="info-item">
                                            <span className="text bold">
                                                Status:{" "}
                                            </span>

                                            <span className="text">{data.status}</span>
                                        </div>
                                    )}

                                       

                                    {data.runtime && (
                                        <div className="info-item">
                                            <span className="text bold">
                                                Runtime:{" "}
                                            </span>

                                            <span className="text">{convertMinutesToHours(data.runtime)}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="info">
                                {data.number_of_seasons && (
                                        <div className="info-item">
                                            <span className="text bold">
                                                No of Season:{" "}
                                            </span>

                                            <span className="text">{data.number_of_seasons}</span>
                                        </div>
                                    )}  

                                    {(data?.release_date || data?.first_air_date) && (
                                        <div className="info-item">
                                            <span className="text bold">
                                              {mediaType ==="movie" ?  "Release Date:" :"Airing:"}
                                              {/* Release Date: */}
                                            </span>

                                            <span className="text">
                                               { data.release_date ? dayjs(data.release_date).format("MMM DD, YYYY"):
                                                dayjs(data.first_air_date).format("MMM DD, YYYY")
                                               }
                                                
                                                </span>
                                        </div>
                                    )}
                                </div>
                                {director?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">
                                            Director:{" "}
                                        </span>
                                        <span className="text">
                                            {director?.map((d, i) => (
                                                <span key={i}>
                                                    {d.name}
                                                    {director.length -
                                                                1 !==
                                                                i && ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}

                                {writer?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">
                                            Writer:{" "}
                                        </span>
                                        <span className="text">
                                            {writer?.map((d, i) => (
                                                <span key={i}>
                                                    {d.name}
                                                    {writer.length -
                                                                1 !==
                                                                i && ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}

                                {data?.created_by?.length > 0 && (
                                    <div className="info">
                                        <span className="text bold">
                                            Creator:{" "}
                                        </span>
                                        <span className="text">
                                            {data.created_by.map((d, i) => (
                                                <span key={i}>
                                                    {d.name}
                                                    {data?.created_by?.length -
                                                                1 !==
                                                                i && ", "}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <VideoPopup show={show} setShow={setShow} videoId={videoId} setVideoId={setVideoId} />
                    </ContentWrapper>

                </Fragment>
                )}
                </>
            ) :     (
                <span><Spinner loading={isLoading}/></span>
                     )
            }
        </div>
    );
};

export default DetailsBanner;
