import React from "react";

const Pagination = ({ currentPage, totalPages, paginate }) => {
    return (
        <div className="flex justify-center mt-8">
            <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
            >
                <i className="fas fa-chevron-left"></i>
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                    key={page}
                    onClick={() => paginate(page)}
                    className={`px-4 py-2 mx-1 bg-gray-200 rounded ${page === currentPage ? "font-bold" : ""}`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 mx-1 bg-gray-200 rounded disabled:opacity-50"
            >
                <i className="fas fa-chevron-right"></i>
            </button>
        </div>
    );
};

export default Pagination;
