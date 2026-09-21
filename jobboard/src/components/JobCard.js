import React from "react";
import { BiWorld, BiTimeFive } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./JobCard.css";

function JobCard(props) {

  const item = props.data;

  const date = item?.job_posted_at_datetime_utc
    ? item.job_posted_at_datetime_utc.split("T")[0]
    : "No date";

  return (

    <Link
      to="/job-info"
      state={{ page: item }}
      className="jobcard-container"
    >

      <img
        src={
          item?.employer_logo ||
          "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
        }
        className="jobcard-image"
        alt="company logo"
      />

      <div className="jobcard-content">

        <h3 className="jobcard-company">
          {item?.employer_name || "No company name available"}
        </h3>

        <h1 className="jobcard-title">
          {item?.job_title || "No job title available"}
        </h1>

        <div className="jobcard-details">

          <div className="jobcard-type">
            {item?.job_employment_type || "No employment type available"}
          </div>

          <div className="jobcard-meta">

            <div className="jobcard-meta-item">
              <BiWorld className="icon" />
              <span>{item?.job_country || "No country available"}</span>
            </div>

            <div className="jobcard-meta-item">
              <BiTimeFive className="icon" />
              <span>{date}</span>
            </div>

          </div>

        </div>

      </div>

    </Link>

  );
}

export default JobCard;