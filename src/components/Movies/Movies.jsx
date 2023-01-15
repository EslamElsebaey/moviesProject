/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import WOW from 'wowjs';





export default function Movies() {
  let [movies, setMovies] = useState([]);
 

  let nums = new Array(7).fill(1).map((ele , index)=>{ return index + 2 } )


  async function getMovies(page) {
    $("body , html").animate({
      scrollTop : "0"
    }, 0 )
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=56f77d211d0e245479bc8ca9bc057fea&page="+page);
    setMovies(
      data.results.filter((result) => {
        return result.poster_path !== null;
      })
    );
    localStorage.setItem("moviesPage" , page);
    
  }

$(".page-item").click(function(e){
  $(e.target).css({
    backgroundColor : "#fcb404" , 
    color : "black"
  });
  $(".page-link").not(e.target).css({
    backgroundColor : "transparent" , 
    color : "#fff"
  })
  
})

new WOW.WOW({
  live: false
}).init();


  useEffect(() => {
   if(localStorage.getItem("moviesPage") !== null){
    getMovies(localStorage.getItem("moviesPage"))
    $(".page-link").eq(localStorage.getItem("moviesPage") - 2).css({
      backgroundColor : "#edaf18" , 
      color : "black"
    });
   }else{
    getMovies(1);
   }
  }, []);



  
  

  return (
    <>
      <div className="movies">
        <div className="container">
          <div className="row justify-content-center">
                {movies.length > 0 ? movies.map((movie , index)=>{
                    return <React.Fragment key={index}>
                    <div className="col-lg-4 col-md-6 " >
                      <div className="movie-item  wow  fadeInLeft   shadow-lg  text-center position-relative  " data-wow-duration="2s" data-wow-delay="1s">
                        <div className="rate">
                        <i className="fa-solid fa-star ratestar"></i>
                         <span> {movie.vote_average.toFixed(1)}</span> 
                        </div>
                        <Link
                          to={`/singleitem/${movie.id}/${movie.media_type}`}
                        >
                          <img
                            className="w-100 mb-2"
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt=""
                          />
                        </Link>
                        <h5 className="text-center title">{movie.title}</h5>
                        <div className="overview p-3">
                          <div className="overview-desc">
                            <p>{movie.overview}</p>
                          <Link to={`/singleitem/${movie.id}/${movie.media_type}`} >
                          <button className="btn showdetails mt-2 btn-info">show details</button>
                          </Link>
                          </div>
                        </div>
                        <div className="releasedate d-flex align-items-center justify-content-between">
                          <span> vote count : {movie.vote_count}</span>
                          <span> release date : {movie.release_date}</span>
                        </div>
                       
                      </div>
                    </div>
                  </React.Fragment>} )  :  <div className="loading-container">
                    <div className="lds-ripple">
                      <div></div>
                      <div></div>
                    </div>
                 </div>  }
                 
              <nav className="pagenation-nav" aria-label="...">
                <ul className="pagination pagination-sm d-flex align-items-center justify-content-center">
               { nums.map( (num , index)=>{
                return  <li  key={index} className="page-item "><a onClick={ ()=>{ getMovies(num) } } className="page-link " >{num}</a></li>
                
               })}
               <li className="page-item "><a onClick={ ()=>{ getMovies( Math.floor(Math.random() * 100 )  ) }     }  className="page-link " >Next</a></li> 
                </ul>
              </nav>
          </div>
        </div>
      </div>
    </>
  );
}
