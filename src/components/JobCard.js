import React from "react";
import { Link } from "react-router-dom";
import { BiWorld, BiTimeFive, BiBookmark, BiBookmarkMinus } from "react-icons/bi";
import "./JobCard.css";

function JobCard({data,saved,onToggleSave}){
 const date=data?.job_posted_at_datetime_utc?.split("T")[0]||"Recently";
 return <article className="job-card">
  <Link to="/job-info" state={{page:data}} className="job-main">
   <img className="job-logo" src={data?.employer_logo||"/no-image.svg"} alt={`${data?.employer_name||"Company"} logo`} loading="lazy" onError={e=>{e.currentTarget.src="/no-image.svg"}}/>
   <div className="job-body"><div className="company">{data?.employer_name||"Company"}</div><h2>{data?.job_title||"Job opportunity"}</h2><div className="job-meta"><span>{data?.job_employment_type||"Job"}</span><span><BiWorld/> {data?.job_city||data?.job_country||"Location not specified"}</span><span><BiTimeFive/> {date}</span></div></div>
  </Link>
  <button className="save-btn" aria-label={saved?"Remove saved job":"Save job"} onClick={onToggleSave}>{saved?<BiBookmarkMinus/>:<BiBookmark/>}</button>
 </article>
}
export default React.memo(JobCard);
