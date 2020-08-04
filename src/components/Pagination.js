import React from 'react';

const Pagination = (props) => {
    const {currentPage, dataCount, perPage} = props
    const pages = []
    for (let i = 1; i < dataCount/perPage + 1; i++){
        pages.push(
            <span
                key={i}
                className={currentPage === i ? `page-item active` : `page-item`}
                onClick={() => props.onPageChange(i)}
            >{i}</span>
        )
    }

    return (
        <div className='pages'>
            {pages}
        </div>
    );
};

export default Pagination;