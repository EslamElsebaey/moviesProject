import React from 'react';
import { Link } from 'react-router-dom';

export default function SearchComp({searchedItem}) {
  
  
  
    return (
    <>
         <div className="searchcomp">
                <div className="container">
                    <div className="row ">
                    <div className="col-lg-4 col-md-6 text-center">
                        <div className="search-sec">
                        <h3>Welcome to search section</h3>
                        <p>Here you can jump to your prefered movie & Tv show and know details about it. </p>
                        </div>
                     </div>
                     {searchedItem.length > 0 ? searchedItem.filter((value) => {
                        return value.poster_path !== null
                     }).map((movieTvshow , index)=> {
                   
                       return <React.Fragment key={index}>
                        <div className="col-lg-4 col-md-6" >
                        <div className="movie-item shadow-lg   text-center position-relative  ">
                        <div className="rate">
                          <i className="fa-solid fa-star ratestar"></i>
                          <span> {movieTvshow.vote_average}</span> 
                        </div>
                        <Link
                              to={`/singleitem/${movieTvshow.id}/${movieTvshow.media_type}`}
                            >
                              <img
                                className="w-100 mb-2"
                                src={`https://image.tmdb.org/t/p/w500${movieTvshow.poster_path}`}
                                alt=""
                              />
                        </Link>
                        {movieTvshow.title === undefined ? <h5 className="text-center title">{movieTvshow.name}</h5> :
                            <h5 className="text-center title">{movieTvshow.title}</h5> }
                             <div className="overview p-3">
                              
                                {/* <p>{movieTvshow.overview}</p> */}
                              <Link to={`/singleitem/${movieTvshow.id}/${movieTvshow.media_type}`} >
                              <button className="btn showdetails mt-2 btn-info">show details</button>
                              </Link>
                             
                            </div>
                            {/* <div className="overview">
                              <Link to={`/singleitem/${movieTvshow.id}/${movieTvshow.media_type}`} >
                              <button className="btn showdetails mt-2 btn-info">show details</button>
                              </Link>
                            </div> */}
                        </div>
                        </div>
                    </React.Fragment>
                    } )  :  ""  }  
                
                </div>
                </div>
        </div>
    </>
  )
}


