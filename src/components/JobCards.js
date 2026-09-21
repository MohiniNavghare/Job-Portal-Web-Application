import React, { useEffect, useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import JobCard from "./JobCard";
import "./JobCards.css";

function JobCards({apiData}){
 const perPage=6; const [page,setPage]=useState(0); const [saved,setSaved]=useState(()=>JSON.parse(localStorage.getItem("psk_saved_jobs")||"[]"));
 useEffect(()=>setPage(0),[apiData]);
 const current=useMemo(()=>apiData.slice(page*perPage,page*perPage+perPage),[apiData,page]);
 const count=Math.ceil(apiData.length/perPage);
 const toggle=(job)=>{const id=job.job_id||job.job_apply_link||job.job_title;setSaved(prev=>{const next=prev.some(x=>(x.job_id||x.job_apply_link||x.job_title)===id)?prev.filter(x=>(x.job_id||x.job_apply_link||x.job_title)!==id):[...prev,job];localStorage.setItem("psk_saved_jobs",JSON.stringify(next));return next})};
 return <><div className="jobs-list">{current.map(job=><JobCard key={job.job_id||job.job_apply_link||job.job_title} data={job} saved={saved.some(x=>(x.job_id||x.job_apply_link||x.job_title)===(job.job_id||job.job_apply_link||job.job_title))} onToggleSave={()=>toggle(job)}/>)}</div>{count>1&&<ReactPaginate previousLabel={<BiChevronLeft/>} nextLabel={<BiChevronRight/>} pageCount={count} onPageChange={e=>{setPage(e.selected);window.scrollTo({top:0,behavior:"smooth"})}} pageRangeDisplayed={3} marginPagesDisplayed={1} containerClassName="pagination" activeClassName="active" previousClassName="pg-btn" nextClassName="pg-btn"/>}</>
}
export default JobCards;
