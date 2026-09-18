import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import JobCard from './JobCard';
import './JobCards.css';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

function JobCards({ apiData, pagination }) {
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(pagination || 0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = apiData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(apiData.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % apiData.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <div className="jobcards-container">
        {currentItems.map((item, i) => (
          <JobCard key={i} data={item} pagination={itemOffset} />
        ))}
      </div>

      <ReactPaginate
        breakLabel={<span className="page-btn">...</span>}
        nextLabel={
          <span className="page-btn">
            <BiChevronRight />
          </span>
        }
        previousLabel={
          <span className="page-btn">
            <BiChevronLeft />
          </span>
        }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        containerClassName="pagination-container"
        pageClassName="page-number"
        activeClassName="active-page"
      />
    </div>
  );
}

export default JobCards;