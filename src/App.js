import { Routes , Route  } from "react-router-dom"
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import axios from "axios"
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Movies from './components/Movies/Movies';
import People from './components/People/People';
import Register from './components/Register/Register';
import Tvshow from './components/Tvshow/Tvshow';
import Notfound from './components/Notfound/Notfound';
import Singleitem from './components/Singleitem/Singleitem';
import Protectedroute from './components/Protectedroute/Protectedroute';
import Singleperson from './components/Singleperson/Singleperson';
import jwtDecode from "jwt-decode";
import SearchComp from './components/SearchComp/SearchComp';
import Myparticles from './components/Myparticles';
import $ from "jquery";






function App() {

  const [isLogin , setIsLogin] =  useState(null)
  const [userName , setuserName] =  useState("")
  let [searchedItem , setSearchedItem] =  useState([]);
 
 function checkLogin () {  
   let newUserData =  localStorage.getItem("newUser");
   setIsLogin(newUserData)
   if(newUserData !== null){
    let usertoken = jwtDecode(newUserData);
    setuserName(usertoken.first_name);
    }
 }

 function inputSearchFunc(event){
  searchMoviesTvshows(event.target.value)
 }




 
 async function searchMoviesTvshows(term){
  if(term !== undefined && term !== ""){
    let {data} = await axios.get("https://api.themoviedb.org/3/search/multi?api_key=56f77d211d0e245479bc8ca9bc057fea&language=en-US&page=1&include_adult=false&query="+term);
    setSearchedItem(data.results);
    $(".search-close").removeClass("d-none");
  }else if (term === ""){
    setSearchedItem([]);
    $(".search-close").addClass("d-none");
  }
 }


 $(window).scroll( ()=>{
  if(window.scrollY > 450){
    $(".toTop").fadeIn(400)
  }else{
    $(".toTop").fadeOut(400)
  }
 })

 $(".toTop").click(function(){
  document.documentElement.scrollTop = 0 ;
 })

 useEffect(  ()=>{
  let userData = localStorage.getItem("newUser");
  setIsLogin(userData)
  if(userData !== null){
    let usertoken = jwtDecode(userData);
    setuserName(usertoken.first_name);
    }
    searchMoviesTvshows();
  
 } , [])


 
 
 
 
  return (
    <>
   <div className="toTop"><i className="fa-solid arrowTop fa-angle-up"></i></div>
   <Navbar setSearchedItem={setSearchedItem}   inputSearchFunc={inputSearchFunc} checkLogin={checkLogin} isLogin={isLogin} setIsLogin={setIsLogin}  userName={userName} setuserName={setuserName}  />
   <Routes>
   <Route path="/"  element={<Login/> } />
   <Route path="particles"  element={<Myparticles/> } />
   <Route path="login"  element={  <Login checkLogin={checkLogin} />  } />
   <Route path="register"  element={   <Register/> } />
    <Route path="home"  element={  <Protectedroute>  <Home checkLogin={checkLogin} /></Protectedroute> } />
    <Route path="singleitem/:itemId/:mediaType"  element={ <Protectedroute><Singleitem/></Protectedroute>   } />
    <Route path="singleperson/:personId"  element={ <Protectedroute> <Singleperson/> </Protectedroute>   } />
    <Route path="movies"  element={ <Protectedroute>  <Movies/></Protectedroute>   } />
    <Route path="SearchComp"  element={ <Protectedroute>  <SearchComp searchedItem={searchedItem}  /></Protectedroute>   } />
    <Route path="people"  element={   <Protectedroute>   <People/> </Protectedroute>  } />
    <Route path="tvshow"  element={ <Protectedroute>  <Tvshow/> </Protectedroute>  } />
    <Route path="*"  element={<Notfound/>} />
   </Routes>
    
    </>
  );
}

export default App;
