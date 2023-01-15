import React from 'react'
import {useParams} from "react-router-dom"
import  axios from 'axios';
import { useState, useEffect } from 'react';





export default function Singleperson() {
  
  
let {personId} = useParams();
let [personDetails , setPersonDetails] = useState({})

  async function getPersonDetails(personId ){
    let response = await axios.get("https://api.themoviedb.org/3/person/"+personId+"?api_key=56f77d211d0e245479bc8ca9bc057fea&language=en-US");
    setPersonDetails(response.data);
  }

  useEffect(() => {
    
    getPersonDetails(personId)
  
  }, [personId])
  

   
  
  
  
    return ( 
        
        <>
        {
             Object.keys(personDetails).length > 0 ? 
               <div className="singleitem">
                 <div className="container">
            <div className="row gx">
                <div className="col-md-4">
                    <div className="img-item">
                        <img className="w-100" src={"https://image.tmdb.org/t/p/w500"+personDetails.profile_path} alt="" />
                    </div>
                </div>
                <div className="col-md-8">
                  <div className="movie-info">
                  <h3>{personDetails.name}</h3>
                    <h4> Birthday : {personDetails.birthday}</h4>
                    <p className='text-capitalize movie-details'>place of birth : {(personDetails.place_of_birth)} </p>
                    <p className='text-capitalize movie-details'>popularity : {(personDetails.popularity)} </p>
                    <p className='text-capitalize movie-details mb-4'>department : {(personDetails.known_for_department)} </p>
                    <p className='movie-details'>{personDetails.biography}</p>
                  </div>
                </div>
        </div>
    </div>
    </div>

            
       : <div className='loading-container'><div className="lds-ripple"><div></div><div></div></div></div> }
  
    </>
  )
}
