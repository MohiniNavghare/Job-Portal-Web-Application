// import React, { useEffect, useState } from 'react';
// import JobInfoPage from './JobInfoPage';
// import axios from 'axios';
// import { MdWorkOutline } from 'react-icons/md';
// import { BiWorld } from 'react-icons/bi';
// import JobCards from '../components/JobCards'
// import './MainPage.css';

// function MainPage(){
//     const[query, setQuery]=useState("");
//     const[location, setLocation]=useState("");
//     const[fullTime,setFullTime]=useState(false);
//     const[actualQuery, setActualQuery]=useState("");
//     const[actualLocation,setActualLocation]=useState("");
//     const[apiData,setApiData]=useState([]);
//     const[error,setError]=useState(null);
//     const[pagination, setPagination]=useState(0);
    
//     const fetchJobs=(jobQuery,jobLocation)=>{
//         const options={
//             method:"GET",
//             url:"https://jsearch.p.rapidapi.com/search",
//             //https://jsearch.p.rapidapi.com/search?query=developer%20jobs%20in%20chicago&page=1&num_pages=1&country=us&date_posted=all
//             params:{
//                 query:`${jobQuery || "Full Stack developer"} in ${jobLocation ||"India"}`,
//                 page:"1",
//                 num_pages:"20",
//                 emplyment_types:fullTime ?"FULLTIME":"PARTTIME",
//             },
//             headers:{
//                 "X-RapidAPI-Key":"5bce19ef16msh1b171c9a2587491p15f1bdjsnd847f309112",
//                 "x-rapidapi-host":"search.p.rapidapi.com",           
//             }, 

//         };
//         axios
//         .request(options)
//         .then((res)=>setApiData(res.data.data))
//         .catch((err)=>setError(err));
//     }

//     const HandleSubmit=(e)=>{
//         e.preventDefault();
//         setActualQuery(query);
//         setActualLocation(location);
//         setPagination(0);
//         fetchJobs(query, location);
//     }
//     useEffect(()=>{
//         fetchJobs(actualQuery, actualLocation)
//     },[]);

//     return(
//         <div>
//         <div className='main-wrapper'> 
//             <div className='logo-title'>
//             <b>PSK JOB PORTAL</b>
//             </div>
//             {
//                 error && (<div className='error-box'>
//                             <div className='error-title'>{error.code}</div>
//                             {error.respnse?.data?.message}
//                             <br/><br/>
//                             <b> demo API data</b>
//                         </div> ) }

//             <header className='header-box'>
//             <form className='search-box' onSubmit={HandleSubmit}>
//             <MdWorkOutline className='search-icon'/>
//             <input type="text" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Job Title,Company name, skills" className="search-input" />
//             <input type="submit" className='search-btn' value="Search"></input>
            
//             </form>
//             </header >

//             <main className='main-content'>
//                 <form className='filter-box'>
//                     <input type="checkbox" checked={fullTime} onChange={()=>setFullTime(!fullTime)} className='checkbox'>FullTime</input>
//                     <label className='filter-title'>Location</label>
//                     <div className='location-input-box'>
//                         <BiWorld/>
//                         <input type="text" value={location} onChange={(e)=>setLocation(e.target.value)} placeholder='city,state,country' className='location-input'/>
//                     </div>
//                     {["India","London","New York"].map((city)=>(<label key={city}>
//                         <input type="radio" name="radio-location" value={city} onClick={()=>setLocation(city)} className='radio'/>
//                         {city}</label>))}
//                 </form>
//                 <section className='result-section'>
//                         {apiData && apiData.length >0 ?(<JobCards apiData={apiData} pagination={pagination}/>):(<div className='loading-box'><h3> Loading Jobs....</h3></div>)}

//                 </section>
//             </main>

//            </div>

//         </div>
//     );
// }
// export default MainPage
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdWorkOutline } from "react-icons/md";
import { BiWorld } from "react-icons/bi";
import JobCards from "../components/JobCards";
import "./MainPage.css";

function MainPage() {

  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [fullTime, setFullTime] = useState(false);

  const [actualQuery, setActualQuery] = useState("");
  const [actualLocation, setActualLocation] = useState("");

  const [apiData, setApiData] = useState([]);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (jobQuery, jobLocation) => {
    try {

      setLoading(true);
      setError(null);

      const options = {
        method: "GET",
        url: "https://jsearch.p.rapidapi.com/search",
        params: {
          query: `${jobQuery || "Full Stack developer"} in ${jobLocation || "India"}`,
          page: "1",
          num_pages: "10", //change
          employment_types: fullTime ? "FULLTIME" : "PARTTIME",
        },
        headers: {
          "X-RapidAPI-Key": "5bce19ef16msh1b171c9a2587491p15f1bdjsnd847f309112b",
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      };

      const res = await axios.request(options);

      setApiData(res.data.data || []);
      setLoading(false);

    } catch (err) {

      setError(err);
      setLoading(false);

    }
  };

  const HandleSubmit = (e) => {
    e.preventDefault();

    setActualQuery(query);
    setActualLocation(location);
    setPagination(0);

    fetchJobs(query, location);
  };

  useEffect(() => {
    fetchJobs(actualQuery, actualLocation);
  }, []);

  return (
    <div className="main-wrapper">

      <div className="logo-title">
        <b>PSK JOB PORTAL</b>
      </div>

      {/* Error */}
      {error && (
        <div className="error-box">
          <b>API Error</b>
          <p>{error.message}</p>
        </div>
      )}

      {/* Search */}
      <header className="header-box">

        <form className="search-box" onSubmit={HandleSubmit}>

          <MdWorkOutline className="search-icon" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Job Title, Company name, skills"
            className="search-input"
          />

          <button
            type="submit"
            className="search-btn"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>

        </form>

      </header>

      <main className="main-content">

        {/* Filters */}
        <form className="filter-box">

          <label>
            <input
              type="checkbox"
              checked={fullTime}
              onChange={() => setFullTime(!fullTime)}
              className="checkbox"
            />
            Full Time
          </label>

          <label className="filter-title">Location</label>

          <div className="location-input-box">

            <BiWorld />

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="city, state, country"
              className="location-input"
            />

          </div>

          {["India", "London", "New York"].map((city) => (

            <label key={city}>

              <input
                type="radio"
                name="radio-location"
                value={city}
                onChange={() => setLocation(city)}
                className="radio"
              />

              {city}

            </label>

          ))}

        </form>

        {/* Results */}
        <section className="result-section">

          {loading ? (
            <div className="loading-box">
              <h3>Loading Jobs...</h3>
            </div>
          ) : apiData.length > 0 ? (
            <JobCards apiData={apiData} pagination={pagination} />
          ) : (
            <div className="loading-box">
              <h3>No Jobs Found</h3>
            </div>
          )}

        </section>

      </main>

    </div>
  );
}

export default MainPage;