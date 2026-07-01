import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PaperCard from "../components/PaperCard.jsx";
import Pagination from "../components/Pagination.jsx";
import SearchFilters from "../components/SearchFilters.jsx";
import SkeletonGrid from "../components/SkeletonGrid.jsx";
import { useDebounce } from "../hooks/useDebounce.js";
import api from "../services/api.js";

const paramsToObject = (params) => Object.fromEntries([...params.entries()]);

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(() => ({ page: 1, limit: 12, ...paramsToObject(searchParams) }));
  const [papers, setPapers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const debouncedFilters = useDebounce(filters);

  const cleanFilters = useMemo(() => {
    return Object.fromEntries(Object.entries(debouncedFilters).filter(([, value]) => value !== "" && value !== undefined));
  }, [debouncedFilters]);

  useEffect(() => {
    setSearchParams(cleanFilters);
    setLoading(true);
    api.get("/papers/search", { params: cleanFilters })
      .then(({ data }) => {
        setPapers(data.items);
        setPagination(data.pagination);
      })
      .finally(() => setLoading(false));
  }, [cleanFilters, setSearchParams]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-700 dark:text-teal-300">Search papers</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white sm:text-5xl">Question Paper Archive</h1>
      </div>
      <SearchFilters filters={filters} onChange={setFilters} />
      <div className="mt-8">
        {loading ? <SkeletonGrid /> : (
          <>
            <p className="mb-4 text-sm font-medium text-slate-500 dark:text-slate-400">{pagination?.total || 0} papers found</p>
            {papers.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {papers.map((paper) => <PaperCard key={paper._id} paper={paper} />)}
              </div>
            ) : (
              <div className="glass rounded-lg p-10 text-center text-slate-600 dark:text-slate-300">No papers match these filters.</div>
            )}
            <Pagination pagination={pagination} onPageChange={(page) => setFilters((current) => ({ ...current, page }))} />
          </>
        )}
      </div>
    </section>
  );
};

export default SearchPage;

