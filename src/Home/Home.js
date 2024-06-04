import React, { useState , useContext, useEffect} from 'react';
import './Home.css';
import videos from '../Videos/videos_db.json';
import VideoList from '../Videos/VideoList';
import SearchBar from '../SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';


function HomePage() {


    const navigate = useNavigate();
    const [videoList, setVideoList] = useState(videos);

    const doSearch = function (q) {
    setVideoList(videoList.filter((video) => video.title.includes(q)));
  }
    const addVideo =() => {
        navigate('/add-video');
    }

  return (
    <div className="home">
    
        <div className='div-do-search'>
        <SearchBar doSearch={doSearch} />
        </div>
        <div className='add-video'>
           <button className="add-video" onClick={addVideo}></button>
        </div>
      <div className="content">
        <VideoList  videos={videoList} />
      </div>
    </div>
  );
}

export default HomePage;
