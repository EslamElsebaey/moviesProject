/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import axios from "axios"
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery";
import WOW from 'wowjs';


export default function People() {
 
  
  let [persons , setPersons] =  useState([]);
  
  let nums = new Array(7).fill(1).map((ele , index)=>{ return index + 1 } )

  
 async function getPersons(page){
  $("body , html").animate({
    scrollTop : "0"
  }, 0 )
   let {data} = await axios.get("https://api.themoviedb.org/3/trending/person/day?api_key=56f77d211d0e245479bc8ca9bc057fea&page="+page); 
   setPersons(data.results.filter((result) => { return result.profile_path !== null }));
   localStorage.setItem("personsPage" , page);
 }

 $(".page-item").click(function(e){
  $(e.target).css({
    backgroundColor : "#edaf18" , 
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


setTimeout(() => {
  $(".clicktoshow").animate({
    opacity : "1" ,
  } , 1000);
}, 1700);


setTimeout(() => {
  $(".clicktoshow").animate({
    opacity : "0" ,
  } , 1000);
}, 3000);


 
 
 useEffect(  ()=>{
  if(localStorage.getItem("personsPage") !== null){
    getPersons(localStorage.getItem("personsPage"))
    $(".page-link").eq(localStorage.getItem("personsPage") - 1).css({
      backgroundColor : "#edaf18" , 
      color : "black"
    });
   }else{
    getPersons(1);
   }

  
 } , [] )
 
 return (
   <>
    
     <div className="persons">
       <div className="container">
                <div className="row" >
                  <span className=' d-flex align-items-center justify-content-center clicktoshow'> <i className="fa-solid text-warning me-2 fs-6 fa-circle-exclamation"></i> click on anyone to show details</span>
                  <p className='d-none'>Lorem ipsum dolor sit amet.</p>
               { persons.length > 0 ?  persons.map(  (person , index)=> {
                     return <React.Fragment key={index}>
                     <div key={person} className='bigitem  col-lg-3 col-md-6'   >
                        <div  className="person-item  wow  fadeInLeft w-100 mb-5"   >
                          <Link to={`/singleperson/${person.id}`}>
                         <img    src={`https://image.tmdb.org/t/p/w500${person.profile_path}`} alt="" />
                         </Link>
                         <div  className="overlay w-100 ">
                         <h5   className='text-center name'>{person.name}</h5>
                         <Link to={`/singleperson/${person.id}`}>
                         <button  className='detailsBtn'>Show Details</button>
                         </Link>
                         <h6   className='text-center department'>{person.known_for_department}</h6>
                         </div>
                        </div>
                     </div>
                     </React.Fragment>
               } ) : <div   className='loading-container'><div className="lds-ripple"><div></div><div></div></div></div>  }
                 <nav  className="pagenation-nav" aria-label="...">
                <ul  className="pagination pagination-sm d-flex align-items-center justify-content-center">
               { nums.map( (num , index)=>{
                return  <li key={index}  className="page-item "><a onClick={ ()=>{ getPersons(num) } } className="page-link " >{num}</a></li>
               })}
               <li  className="page-item "><a onClick={ ()=>{ getPersons( Math.floor(Math.random() * 100 )  ) }     }  className="page-link " >Next</a></li> 
                </ul>
              </nav>
               </div>
       </div>
     </div>
   </>
 )
}
