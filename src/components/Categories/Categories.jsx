import React from 'react';
import CategoryItem from './CategoryItem';

const Categories = React.memo(({ items, onClickItem }) => {
  const [activeItem, setActiveItem] = React.useState(null);

  const onSelectItem = (index) => {
    setActiveItem(index);
    onClickItem(index);
  };

  return (
    <div className="categories">
      {items && (
        <ul>
          <CategoryItem
            isActive={activeItem === null}
            text={'Все'}
            onClick={() => onSelectItem(null)}
          />
          {items.map((text, index) => (
            <CategoryItem
              isActive={activeItem === index}
              text={text}
              onClick={() => onSelectItem(index)}
              key={`${text}_${index}`}
            />
          ))}
        </ul>
      )}
    </div>
  );
});

export default Categories;
