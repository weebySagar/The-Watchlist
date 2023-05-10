import Header from "./Components/header/Header";
import { BrowserRouter as Router, Route, Routes,useLocation } from "react-router-dom";
import { useFetchDataQuery } from "./Store/api";
import { getApiConfiguration, getGenre } from "./Store/slice";
import { useDispatch, useSelector } from "react-redux";
import { Home } from "./Pages/home/Home";
import Footer from "./Components/footer/Footer";
import Details from "./Pages/details/Details";
import { useLayoutEffect } from "react";
import SearchResults from "./Pages/searchResults/SearchResults";
import Discover from "./Pages/discover/Discover";
import Spinner from "./Components/spinner/Spinner";
import PageNotFound from "./Pages/pageNotFound/PageNotFound";



function App() {
  const dispatch = useDispatch();
  const {pathname}=useLocation()

  const { data, isLoading,isSuccess } = useFetchDataQuery("/configuration");
  const { data: movieGenreData, isLoading: movieLoading } =
    useFetchDataQuery("genre/movie/list");
  const { data: tvGenreData, isLoading: tvLoading } =
    useFetchDataQuery("genre/tv/list");

  const saveImgUrl = async () => {
    const url = {
      backdrop: data?.images.secure_base_url + "original",
      poster: data?.images.secure_base_url + "original",
      profile: data?.images.secure_base_url + "original",
    };
    dispatch(getApiConfiguration(url));
  };

  const saveGenre = async () => {
    let allGenres = {};
    let data = [];
    data.push(!movieLoading && movieGenreData);
    data.push(!tvLoading && tvGenreData);

    data.map(({ genres }) => {
      return genres?.map((item) => (allGenres[item.id] = item));
    });

    dispatch(getGenre(allGenres));
  };

  saveImgUrl();
  saveGenre();

  useLayoutEffect(() => {
    window.scrollTo(0,0)
  }, [pathname])

  return (
    <>
      <Header />
      <Routes>

        <Route path="/" element={<Home isLoading={isLoading}/>} />
       
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResults/>}/>
        <Route path="/discover/:mediaType" element={<Discover/>}/>

        <Route path="*" element={<PageNotFound/>}/ >

      </Routes>
      <Footer />
    </>
  );
}

export default App;
