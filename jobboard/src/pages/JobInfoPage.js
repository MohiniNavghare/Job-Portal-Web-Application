import React from "react";
import { BiWorld, BiTimeFive } from "react-icons/bi";
import { MdArrowBack } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import "./JobInfoPage.css";

function JobInfoPage() {

  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="jobinfo-wrapper">
        <h1>Job data not found</h1>

        <button className="back-btn" onClick={() => navigate(-1)}>
          <MdArrowBack /> Go back
        </button>
      </div>
    );
  }

  const { page } = state;

  const date = page.job_posted_at_datetime_utc
    ? page.job_posted_at_datetime_utc.split("T")[0]
    : "N/A";

  return (
    <div>

      <div className="jobinfo-wrapper">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <MdArrowBack /> Go back
        </button>
      </div>

      <div className="jobinfo-container">

        <img
          src={
            page.employer_logo ||
            "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
          }
          className="jobinfo-image"
          alt="company logo"
        />

        <div className="jobinfo-content">

          <h2 className="jobinfo-company">
            {page.employer_name || "company name not found"}
          </h2>

          <h1 className="jobinfo-title">
            {page.job_title || "job title not found"}
          </h1>

          <div className="jobinfo-meta">

            <div className="jobinfo-meta-item">
              <BiWorld className="icon" />
              <span>{page.job_country || "country not found"}</span>
            </div>

            <div className="jobinfo-meta-item">
              <BiTimeFive className="icon" />
              <span>{date}</span>
            </div>

            <div className="jobinfo-meta-item">
              <span>{page.job_employment_type || "job type not found"}</span>
            </div>

          </div>

          <div className="jobinfo-description">
            <h3>Job Description</h3>
            <p>{page.job_description || "job description not found"}</p>
          </div>

          <div className="jobinfo-apply">
            <a
              href={page.job_apply_link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="apply-btn"
            >
              Apply Now
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}

export default JobInfoPage;