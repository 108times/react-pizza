import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Button from '../UI/Button';
import PizzaType from './PizzaType';

function PizzaBlock({name, imageUrl, price, types, sizes}) {
  const availableTypes = ['тонкое', 'традиционное'];
  const availableSizes = [26, 30, 40];
  const [activeType, setActiveType] = React.useState(types[0]);
  const [activeSize, setAvailableSize] = React.useState(sizes[0]);
  const onSelectType = (type) => setActiveType(type);
  const onSelectSize = (size) => setAvailableSize(size);

  return (
      <div className="pizza-block">
        <img
            className="pizza-block__image"
            src={imageUrl}
            alt="Pizza"
        />
        <h4 className="pizza-block__title">{name}</h4>
        <div className="pizza-block__selector">
          <ul>
            {availableTypes.map((type, idx) => {
              return (
                  // <li
                  //   key={type}
                  //   onClick={() => onSelectType(idx)}
                  //   className={classNames({
                  //     active: idx === activeType,
                  //     disabled: !types.includes(idx),
                  //   })}>
                  //   {type}
                  // </li>
                  <PizzaType
                      key={type}
                      onClick={() => onSelectType(idx)}
                      active={idx === activeType}
                      disabled={!types.includes(idx)}
                      text={ type}
                  />


              );
            })}
          </ul>
          <ul>
            {availableSizes.map((size) => {
              return (
                  <li
                      key={size}
                      onClick={() => onSelectSize(size)}
                      className={classNames({
                        active: size === activeSize,
                        disabled: !sizes.includes(size),
                      })}
                  >
                    {size} см.
                  </li>
              );
            })}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price ?? 395} ₽</div>
          <Button
              className="button--add"
              outline
          >
            <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>2</i>
          </Button>
        </div>
      </div>
  );
}

PizzaBlock.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  price: PropTypes.number,
  types: PropTypes.arrayOf(PropTypes.number),
  sizes: PropTypes.arrayOf(PropTypes.number),
};

PizzaBlock.defaultProps = {
  name: '---',
  imageUrl:
      'https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg',
  price: '0',
  types: [],
  sizes: [],
};

export default PizzaBlock;
