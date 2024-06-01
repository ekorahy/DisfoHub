import { CiSearch } from "react-icons/ci";
import PropTypes from "prop-types";

export const SearchBar = ({ keyword, keywordChange }) => {
  return (
    <label
      htmlFor="email"
      className="relative block text-slate-400 focus-within:text-slate-600"
    >
      <CiSearch className="pointer-events-none absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 transform" />
      <input
        className="form-input h-10 w-full rounded-md border-2 p-2 pl-12"
        type="text"
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </label>
  );
};

SearchBar.propTypes = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};
