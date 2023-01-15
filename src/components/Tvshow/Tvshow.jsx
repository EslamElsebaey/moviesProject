
import React from 'react'
import axios from "axios"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery"
import WOW from 'wowjs';

export default function Tvshow() {
 
  
  let [tvshows , setTvshow] =  useState([]);
  let [searchTerm , setSearchTerm] = useState("");
  let nums = new Array(7).fill(1).map((ele , index)=>{ return index + 1 } )
  
 async function getTvshows(page){
  $("body , html").animate({
    scrollTop : "0"
  }, 0 )
   let {data} = await axios.get("https://api.themoviedb.org/3/trending/tv/day?api_key=56f77d211d0e245479bc8ca9bc057fea&page="+page); 
   setTvshow(data.results.filter((result) => { return result.poster_path !== null}))
   localStorage.setItem("tvshowPage" , page);
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

 
 
 useEffect(  ()=>{
  if(localStorage.getItem("tvshowPage") !== null){
    getTvshows(localStorage.getItem("tvshowPage"))
    $(".page-link").eq(localStorage.getItem("tvshowPage") - 1).css({
      backgroundColor : "#edaf18" , 
      color : "black"
    });
   }else{
    getTvshows(1);
   }

 } , [] )
 
 return (
   <>
     <div className="tvshows">
       <div className="container">
                <div className="row gy-5 gx-4 justify-content-center">
             {tvshows.length > 0 ? tvshows.map((tvshow , index)=>{
                return <React.Fragment key={index}>
                <div className="col-lg-4 col-md-6" >
                  <div className="movie-item  wow    fadeInLeft shadow-lg   text-center position-relative  ">
                  <div className="rate">
                    <i className="fa-solid fa-star ratestar"></i>
                    <span> {tvshow.vote_average.toFixed(1)}</span> 
                   </div>
                    <Link
                      to={`/singleitem/${tvshow.id}/${tvshow.media_type}`}
                    >
                      <img
                        className="w-100 mb-2"
                        src={`https://image.tmdb.org/t/p/w500${tvshow.poster_path}`}
                        alt=""
                      />
                    </Link>
                    <h5 className="text-center title">{tvshow.name}</h5>
                    <div className="overview p-3">
                        <p>{tvshow.overview.slice(0, 110)}... <br />
                        <Link
                          to={`/singleitem/${tvshow.id}/${tvshow.media_type}`}
                        >
                        <button className="btn showdetails mt-2 btn-info">show details</button>
                        </Link>
                        </p>
                    </div>
                    <div className="releasedate d-flex align-items-center justify-content-between">
                        <span> vote count : {tvshow.vote_count}</span>
                        <span> release date : {tvshow.first_air_date}</span>
                    </div>
                   
                  </div>
                </div>
              </React.Fragment> 
             } ) : <div className="loading-container">
             <div className="lds-ripple">
               <div></div>
               <div></div>
             </div>
           </div>  }
              <nav className="pagenation-nav" aria-label="...">
                    
                      <ul className="pagination pagination-sm d-flex align-items-center justify-content-center">
                    { nums.map( (num)=>{
                      return  <li key={num} className="page-item "><a onClick={ ()=>{ getTvshows(num) } } className="page-link " >{num}</a></li>
                      
                    })}
                    <li className="page-item "><a onClick={ ()=>{ getTvshows( Math.floor(Math.random() * 100 )  ) }     }  className="page-link " >Next</a></li> 
                      </ul>
                </nav>
            
               </div>
       </div>
     </div>
   </>
 )
}




