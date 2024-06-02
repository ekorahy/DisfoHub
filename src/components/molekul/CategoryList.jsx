import { CategoryItem } from "../atom/CategoryItem";
import PropTypes from "prop-types";

export const CategoryList = ({ threads, categoryClickHandler }) => {
  return (
    <>
      {threads.map((thread) => (
        <CategoryItem
          key={thread.id}
          category={thread.category}
          categoryClickHandler={categoryClickHandler}
        />
      ))}
    </>
  );
};

CategoryList.propTypes = {
  threads: PropTypes.array.isRequired,
  categoryClickHandler: PropTypes.func.isRequired,
};
