import { CiSearch } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import PropTypes from "prop-types";

export const SearchBar = ({ keyword, keywordChange, removeSearchBar }) => {
  return (
    <label
      htmlFor="email"
      className="relative block text-slate-400 shadow-md focus-within:text-slate-600"
    >
      <CiSearch className="pointer-events-none absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 transform" />
      <input
        className="form-input h-10 w-full rounded-md border-0 p-2 px-12 focus:outline-none"
        type="text"
        value={keyword}
        placeholder="Search threads"
        onChange={(event) => keywordChange(event.target.value)}
      />
      <button
        className={`${keyword === "" ? "hidden" : "absolute"} right-3 top-1/2 h-6 w-6 -translate-y-1/2 transform text-xl text-rose-600 hover:text-rose-700`}
        onClick={() => removeSearchBar()}
      >
        <MdClear />
      </button>
    </label>
  );
};

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
  removeSearchBar: PropTypes.func.isRequired,
};
