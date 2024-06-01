import { CategoryItem } from "../atom/CategoryItem";
import PropTypes from "prop-types";

export const CategoryList = ({ threads, categoryClickHandler }) => {
  return (
    <div className="ml-2 flex flex-wrap items-center gap-2">
      {threads.map((thread) => (
        <CategoryItem
          key={thread.id}
          category={thread.category}
          categoryClickHandler={categoryClickHandler}
        />
      ))}
    </div>
  );
};

CategoryList.propTypes = {
  threads: PropTypes.array.isRequired,
  categoryClickHandler: PropTypes.func.isRequired,
};
