const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.pages <= 1) return null;

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <button className="btn-secondary" disabled={pagination.page <= 1} onClick={() => onPageChange(pagination.page - 1)}>
        Previous
      </button>
      <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
        Page {pagination.page} of {pagination.pages}
      </span>
      <button className="btn-secondary" disabled={pagination.page >= pagination.pages} onClick={() => onPageChange(pagination.page + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination;

