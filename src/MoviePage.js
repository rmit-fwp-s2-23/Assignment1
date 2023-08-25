import React from 'react';
import "./MoviePage.css";
import { useLocation } from 'react-router-dom';
import Reviews from './Reviews';

function MoviePage() {
  const location = useLocation();
  const { movie } = location.state;
  const suburbs = [
    {
    id:1,
    suburb:'Southbank',
    timings:['8:30 AM', '10:30 AM', '12:00 PM', '7:00 PM', '9:00 PM', '11:00 PM']
    },
    {
    id:2,
    suburb:'Richmond',
    timings:['6:00 AM', '8:00 AM', '12:00 PM', '4:00 PM', '6:00 PM', '10:00 PM']
    },
    {
    id:3,
    suburb:'Carlton',
    timings:['2:00 PM', '4:30 PM', '6:30 PM', '10:30 PM', '11:30 PM', '1:00 AM']
    },
    {
    id:4,
    suburb:'Footscray',
    timings:['8:00 AM', '10:00 AM', '2:30 PM', '8:30 PM', '10:30 PM ', '12:30 AM']
    }
  ];

  return (
    <>
    <div className="movie-container">

        <div className="movie-container1">
        <img src={movie.Poster}/>
        </div>

        <div className="movie-container2"> 
        <h1 alt={movie.Title}>{movie.Title} - Showtimes</h1>
        
        {suburbs.map((suburb) => {return <><p key={suburb.id} className='movie-suburb'>{suburb.suburb}</p> 
        <div className="timings-container">
        {suburb.timings.map((time) => (<p className='movie-time'> {time} </p>))}</div></>})}
        </div>


        <div className="movie-container3"> 
        <Reviews />
        </div>
    </div>
    </>
  );
}

export default MoviePage;