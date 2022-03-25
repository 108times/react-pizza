import React from "react";
import CategoryItem from "./CategoryItem";
import PropTypes from "prop-types";
const Categories = React.memo(({ items, onClickCategory, activeCategory }) => {
  return (
    <div className="categories">
      {items && (
        <ul>
          <CategoryItem
            isActive={activeCategory === null}
            text={"Все"}
            onClick={() => onClickCategory(null)}
          />
          {items.map((text, index) => (
            <CategoryItem
              isActive={activeCategory === index}
              text={text}
              onClick={() => onClickCategory(index)}
              key={`${text}_${index}`}
            />
          ))}
        </ul>
      )}
    </div>
  );
});

Categories.defaultProps = {
  activeCategory: null,
  items: [],
};

Categories.propTypes = {
  // activeCategory: PropTypes.oneOf([PropTypes.number, PropTypes.oneOf([null])])
  //   .isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClickCategory: PropTypes.func.isRequired,
};

export default Categories;
