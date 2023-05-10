import React,{useState,useEffect} from 'react'
import "./styles.scss"
import ContentWrapper from '../contentWrapper/ContentWrapper';
import {BsSearch} from "react-icons/bs"
import {TfiClose} from "react-icons/tfi"
import {AiOutlineMenu} from "react-icons/ai"
import Search from '../searchBar/Search';
import { useNavigate } from 'react-router-dom';



const Header = () => {
    const [showNavbar, setShowNavbar] = useState("top");
    const [lastScrollY,setLastScrollY]=useState(0)
    const [showSearch, setShowSearch] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const navigate=useNavigate();
   

    const openSearch = () => {
        setShowMobileMenu(false);
        setShowSearch(!showSearch);
    };

    const openMobileMenu = () => {
        setShowMobileMenu(true);
        setShowSearch(false);
    };

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !showMobileMenu) {
                setShowNavbar("hide");
            } else {
                setShowNavbar("show");
            }
        } else {
            setShowNavbar("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(()=>{
        window.addEventListener("scroll",controlNavbar);
        return()=>{
            window.removeEventListener("scroll",controlNavbar)
        }
    },[lastScrollY]);

    const navigationHandler=(type)=>{
        type==="movies" ?navigate("/discover/movie" ) :navigate("discover/tv");
        setShowMobileMenu(false);
    }



  return (
    <header className={`header ${showMobileMenu ? "mobile-view" : ""} ${showNavbar}`}>
        <ContentWrapper>

        
            <div className="nav-logo" onClick={()=>navigate("/")}>
                {/* <img src="assets/logo.png" alt="" /> */}
                <p>The Watchlist</p>
            </div>
            <div className="nav-items">
            <p onClick={()=>navigationHandler("movies")}>Movies</p>
            <p onClick={()=>navigationHandler("tvShows")}>TV Shows</p>
            <p><BsSearch onClick={()=>setShowSearch(openSearch)}/></p>
            </div>

            <div className="nav-mobile-items">
            <BsSearch onClick={()=>setShowSearch(openSearch)}/>
            {showMobileMenu ? (
                        <TfiClose onClick={() => setShowMobileMenu(!showMobileMenu)} />
                    ) : (
                        <AiOutlineMenu onClick={()=>setShowMobileMenu(openMobileMenu)} />
                    )}

            </div>
        
        </ContentWrapper>
        {
            showSearch&&
            <Search setShowSearch={setShowSearch}/>
        }


    </header>
  )
}

export default Header
