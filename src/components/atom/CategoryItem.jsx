import PropTypes from "prop-types";

export const CategoryItem = ({ category, categoryClickHandler }) => {
  return (
    <button
      className="rounded-md bg-slate-600 px-3 py-1 text-white"
      onClick={() => categoryClickHandler(category)}
    >
      {category}
    </button>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.string.isRequired,
  categoryClickHandler: PropTypes.func.isRequired,
};
