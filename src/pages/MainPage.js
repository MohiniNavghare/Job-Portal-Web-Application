// import React, { useCallback, useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { MdSearch, MdWorkOutline, MdLocationOn, MdTune } from "react-icons/md";
// import JobCards from "../components/JobCards";
// import "./MainPage.css";

// const API_URL="https://jsearch.p.rapidapi.com/search";
// const API_KEY=process.env.REACT_APP_RAPIDAPI_KEY;

// function MainPage(){
//  const [query,setQuery]=useState(""); const [location,setLocation]=useState("India"); const [fullTime,setFullTime]=useState(false);
//  const [jobs,setJobs]=useState([]); const [loading,setLoading]=useState(false); const [error,setError]=useState(""); const [searched,setSearched]=useState(false); const controller=useRef(null);
//  const fetchJobs=useCallback(async(q=query,l=location,ft=fullTime)=>{
//   if(!API_KEY){setError("RapidAPI key is not configured. Copy .env.example to .env and add your existing key.");setJobs([]);return}
//   controller.current?.abort(); const c=new AbortController(); controller.current=c; setLoading(true);setError("");
//   try{const res=await axios.get(API_URL,{params:{query:`${q.trim()||"Full Stack developer"} in ${l.trim()||"India"}`,page:"1",num_pages:"1",employment_types:ft?"FULLTIME":"PARTTIME"},headers:{"X-RapidAPI-Key":API_KEY,"X-RapidAPI-Host":"jsearch.p.rapidapi.com"},signal:c.signal});setJobs(res.data?.data||[]);setSearched(true)}
//   catch(e){if(e.code!=="ERR_CANCELED"){setError(e.response?.data?.message||e.message||"Unable to load jobs.");setJobs([])}}finally{if(!c.signal.aborted)setLoading(false)}
//  },[query,location,fullTime]);
//  useEffect(()=>{fetchJobs();return()=>controller.current?.abort()},[]); // initial load only
//  const submit=e=>{e.preventDefault();fetchJobs(query,location,fullTime)};
//  const quickSearch=city=>{setLocation(city);fetchJobs(query,city,fullTime)};
//  return <main className="main-page"><section className="hero"><div className="container"><div className="hero-copy"><span className="eyebrow"><MdWorkOutline/> Find your next opportunity</span><h1>Find a job you <span>love.</span></h1><p>Search thousands of opportunities and discover the right career for you.</p></div><form className="search-panel" onSubmit={submit}><div className="search-field"><MdSearch/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Job title, skills, company"/></div><div className="search-field"><MdLocationOn/><input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location"/></div><button className="search-submit" disabled={loading}><MdSearch/>{loading?"Searching":"Search Jobs"}</button></form></div></section>
//  <section className="container results-wrap"><aside className="filters card"><div className="filter-heading"><MdTune/> Filters</div><label className="check-row"><input type="checkbox" checked={fullTime} onChange={e=>{setFullTime(e.target.checked);fetchJobs(query,location,e.target.checked)}}/> Full-time only</label><div className="filter-title">Popular locations</div>{["India","London","New York","Remote"].map(city=><button key={city} className={`location-chip ${location===city?"selected":""}`} onClick={()=>quickSearch(city)}>{city}</button>)}</aside><div className="results"><div className="results-top"><div><h2>Latest Jobs</h2><p>{loading?"Finding matching opportunities...":`${jobs.length} jobs found`}</p></div></div>{error&&<div className="api-error"><strong>Could not load jobs</strong><span>{error}</span></div>}{loading?<div className="card loading-card"><div className="spinner"/><p>Finding jobs for you...</p></div>:jobs.length?<JobCards apiData={jobs}/>:<div className="card empty"><h3>{searched?"No jobs found":"No jobs yet"}</h3><p>Try another job title or location.</p></div>}</div></section></main>
// }
// export default MainPage;
import React, { useCallback, useEffect, useState } from "react";
import {
  MdSearch,
  MdWorkOutline,
  MdLocationOn,
  MdTune,
} from "react-icons/md";
import JobCards from "../components/JobCards";
import "./MainPage.css";

const API_URL = "https://www.themuse.com/api/public/jobs";

function getCompanyInitials(name) {
  if (!name) return "CO";

  const words = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (
    words[0][0] + words[1][0]
  ).toUpperCase();
}

function createLogoData(name) {
  const initials = getCompanyInitials(name);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg"
         width="100"
         height="100"
         viewBox="0 0 100 100">
      <rect width="100" height="100" rx="18" fill="#2563eb"/>
      <text
        x="50"
        y="58"
        text-anchor="middle"
        font-family="Arial, sans-serif"
        font-size="34"
        font-weight="bold"
        fill="white">
        ${initials}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function MainPage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("India");
  const [fullTime, setFullTime] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const fetchJobs = useCallback(
    async (q = query, l = location, ft = fullTime) => {
      setLoading(true);
      setError("");
      setSearched(true);

      try {
        const params = new URLSearchParams();

        params.append("page", "0");

        if (l.trim()) {
          params.append("location", l.trim());
        }

        const response = await fetch(
          `${API_URL}?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error(
            `Jobs API returned ${response.status}`
          );
        }

        const result = await response.json();

        let fetchedJobs = result.results || [];

        /* Search filter */
        if (q.trim()) {
          const keyword = q.trim().toLowerCase();

          fetchedJobs = fetchedJobs.filter((job) => {
            const title = job.name || "";
            const company =
              job.company?.name || "";
            const description =
              job.contents || "";

            return `${title} ${company} ${description}`
              .toLowerCase()
              .includes(keyword);
          });
        }

        /* Full-time filter */
        if (ft) {
          fetchedJobs = fetchedJobs.filter(
            (job) =>
              (job.type || "")
                .toLowerCase()
                .includes("full")
          );
        }

        /*
         * Convert The Muse response into
         * the format expected by JobCards.
         */
        const formattedJobs =
          fetchedJobs.map((job) => {
            const companyName =
              job.company?.name ||
              "Company";

            return {
              job_id: String(job.id),

              job_title:
                job.name ||
                "Job Opportunity",

              employer_name:
                companyName,

              /*
               * The Muse doesn't reliably provide
               * company logos.
               *
               * Generate a company-specific
               * initials logo instead.
               */
              employer_logo:
                createLogoData(companyName),

              job_city:
                job.locations?.[0]?.name ||
                l,

              job_country: "",

              job_description:
                job.contents ||
                "No description available.",

              job_apply_link:
                job.refs?.landing_page ||
                "#",

              job_employment_type:
                job.type ||
                "Job",

              job_posted_at_datetime_utc:
                job.publication_date ||
                "",

              job_min_salary: null,

              job_max_salary: null,

              job_salary_currency: "",

              job_is_remote:
                job.locations?.some((loc) =>
                  (loc.name || "")
                    .toLowerCase()
                    .includes("remote")
                ) || false,
            };
          });

        setJobs(formattedJobs);
      } catch (err) {
        console.error(
          "Job API Error:",
          err
        );

        setError(
          "Unable to load jobs right now. Please try again."
        );

        setJobs([]);
      } finally {
        setLoading(false);
      }
    },
    [query, location, fullTime]
  );

  /* Initial jobs */
  useEffect(() => {
    fetchJobs("", "India", false);
  }, [fetchJobs]);

  const submit = (e) => {
    e.preventDefault();

    fetchJobs(
      query,
      location,
      fullTime
    );
  };

  const quickSearch = (city) => {
    setLocation(city);

    fetchJobs(
      query,
      city,
      fullTime
    );
  };

  const handleFullTime = (e) => {
    const checked = e.target.checked;

    setFullTime(checked);

    fetchJobs(
      query,
      location,
      checked
    );
  };

  return (
    <main className="main-page">

      {/* HERO */}
      <section className="hero">
        <div className="container">

          <div className="hero-copy">

            <span className="eyebrow">
              <MdWorkOutline />
              Find your next opportunity
            </span>

            <h1>
              Find a job you <span>love.</span>
            </h1>

            <p>
              Search thousands of opportunities
              and discover the right career for you.
            </p>

          </div>

          {/* SEARCH */}
          <form
            className="search-panel"
            onSubmit={submit}
          >

            <div className="search-field">
              <MdSearch />

              <input
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="Job title, skills, company"
              />
            </div>

            <div className="search-field">
              <MdLocationOn />

              <input
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                placeholder="Location"
              />
            </div>

            <button
              className="search-submit"
              type="submit"
              disabled={loading}
            >
              <MdSearch />

              {loading
                ? "Searching..."
                : "Search Jobs"}
            </button>

          </form>

        </div>
      </section>

      {/* RESULTS */}
      <section className="container results-wrap">

        {/* FILTERS */}
        <aside className="filters card">

          <div className="filter-heading">
            <MdTune />
            Filters
          </div>

          <label className="check-row">

            <input
              type="checkbox"
              checked={fullTime}
              onChange={handleFullTime}
            />

            Full-time only

          </label>

          <div className="filter-title">
            Popular locations
          </div>

          {[
            "India",
            "London",
            "New York",
            "Remote",
          ].map((city) => (

            <button
              key={city}
              type="button"
              className={`location-chip ${
                location === city
                  ? "selected"
                  : ""
              }`}
              onClick={() =>
                quickSearch(city)
              }
            >
              {city}
            </button>

          ))}

        </aside>

        {/* JOB RESULTS */}
        <div className="results">

          <div className="results-top">

            <div>

              <h2>
                Latest Jobs
              </h2>

              <p>
                {loading
                  ? "Finding matching opportunities..."
                  : `${jobs.length} jobs found`}
              </p>

            </div>

          </div>

          {/* ERROR */}
          {error && (
            <div className="api-error">

              <strong>
                Could not load jobs
              </strong>

              <span>
                {error}
              </span>

            </div>
          )}

          {/* LOADING */}
          {loading ? (

            <div className="card loading-card">

              <div className="spinner"></div>

              <p>
                Finding jobs for you...
              </p>

            </div>

          ) : jobs.length > 0 ? (

            <JobCards
              apiData={jobs}
            />

          ) : (

            <div className="card empty">

              <h3>
                {searched
                  ? "No jobs found"
                  : "No jobs yet"}
              </h3>

              <p>
                Try another job title
                or location.
              </p>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default MainPage;