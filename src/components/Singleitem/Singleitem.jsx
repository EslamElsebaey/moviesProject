import React from 'react'
import {useParams} from "react-router-dom"
import  axios from 'axios';
import { useState, useEffect } from 'react';





export default function Singleitem() {
  
  
let {itemId  , mediaType} = useParams();
let [itemDetails , setitemDetails] = useState({})

  async function getDetails(itemId , mediaType ){
    let response = await axios.get("https://api.themoviedb.org/3/"+mediaType+"/"+itemId+"?api_key=56f77d211d0e245479bc8ca9bc057fea&language=en-US");
    setitemDetails(response.data)
    
  }

  useEffect(() => {
    
    getDetails(itemId , mediaType);
   
  
  }, [itemId , mediaType])
  

   
  
  
  
    return ( 
        
        <>
    <div className="singleitem">
        <div className="container">
            <div className="row gx">
            { Object.keys(itemDetails).length > 0 ? <>  <div className="col-md-4">
                    <div className="img-item">
                        <img className="w-100" src={"https://image.tmdb.org/t/p/w500"+itemDetails.poster_path} alt="" />
                    </div>
                </div>
                <div className="col-md-8">
                  <div className="movie-info">
                     <h3>{itemDetails.title === undefined ? itemDetails.name :itemDetails.title }</h3>
                    <h4>{itemDetails.tagline}</h4>
                    <div className='genres mb-4  '>
                     {  Object.keys(itemDetails).length > 0 ? 
                     itemDetails.genres.map((genre , index) =>  {return   <span key={index} className=' me-3 text-white'>{genre.name}</span> }) : ""}
                    </div>
                    <p className='text-capitalize movie-details'>vote : {(itemDetails.vote_average)} </p>
                    <p className='text-capitalize movie-details'>vote count : {(itemDetails.vote_count)} </p>
                    <p className='text-capitalize movie-details'>popularity : {(itemDetails.popularity)} </p>
                    <p className='text-capitalize movie-details mb-4'>release date : {(itemDetails.release_date)} </p>
                    <p className='movie-details'>{(itemDetails.overview)}</p>
                  </div>
                    
                </div> </> : <div className='loading-container'><div className="lds-ripple"><div></div><div></div></div></div>   }
               
        </div>
    </div>
    </div>
    </>
  )
}
