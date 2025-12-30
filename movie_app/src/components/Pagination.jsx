import React from "react";

const Pagination = ({ pagination, setPagination }) => {
  const buttonBaseStyle = {
    fontWeight: '600',
    fontFamily: 'var(--font-display)',
    letterSpacing: '-0.01em',
    border: '1px solid rgba(0, 212, 255, 0.2)',
    background: 'rgba(37, 40, 67, 0.6)',
    backdropFilter: 'blur(10px)',
    color: 'var(--color-text)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    position: 'relative',
    overflow: 'hidden'
  };

  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.5)';
    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 212, 255, 0.2)';
    e.currentTarget.style.background = 'rgba(0, 212, 255, 0.1)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.borderColor = 'rgba(0, 212, 255, 0.2)';
    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    e.currentTarget.style.background = 'rgba(37, 40, 67, 0.6)';
  };

  return (
    <div className="flex justify-center mx-auto my-8">
      <div className="flex flex-row gap-2 sm:gap-3">
        <button
          type="button"
          className="px-4 py-2.5 sm:px-6 sm:py-3.5 lg:px-7 lg:py-3.5 text-sm sm:text-base"
          style={{
            ...buttonBaseStyle,
            borderRadius: '12px',
            opacity: pagination > 1 ? 1 : 0.5,
            cursor: pagination > 1 ? 'pointer' : 'not-allowed'
          }}
          onClick={() => {
            if (pagination > 1)
              setPagination((prevPagination) => prevPagination - 1);
          }}
          onMouseEnter={pagination > 1 ? handleMouseEnter : undefined}
          onMouseLeave={pagination > 1 ? handleMouseLeave : undefined}
        >
          <div className="flex flex-row items-center gap-2">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span>Previous</span>
          </div>
        </button>

        <div
          className="px-3 py-2.5 sm:px-6 sm:py-3.5 lg:px-6 lg:py-3.5 text-sm sm:text-base"
          style={{
            fontWeight: '700',
            fontFamily: 'var(--font-display)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            background: 'rgba(251, 191, 36, 0.1)',
            backdropFilter: 'blur(10px)',
            color: 'var(--color-amber)',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(251, 191, 36, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            minWidth: '80px',
            justifyContent: 'center'
          }}
        >
          Page {pagination}
        </div>

        <button
          type="button"
          className="px-4 py-2.5 sm:px-6 sm:py-3.5 lg:px-7 lg:py-3.5 text-sm sm:text-base"
          style={{
            ...buttonBaseStyle,
            borderRadius: '12px'
          }}
          onClick={() => {
            setPagination((prevPagination) => prevPagination + 1);
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="flex flex-row items-center gap-2">
            <span>Next</span>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};
export default Pagination;
