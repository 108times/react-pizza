import React from 'react';

// class Categories extends React.Component {
//   state = {
//     activeItem: 1,
//   };

//   onSelectItem = (index) => this.setState({ activeItem: index });

//   render() {
//     const { items, onClick } = this.props;
//     return (
//       <div className="categories">
//         <ul>
//           <li>Все</li>
//           {items.map((text, index) => (
//             <li
//               className={this.state.activeItem === index ? 'active' : ''}
//               onClick={() => this.onSelectItem(index)}
//               key={`${text}_${index}`}>
//               {text}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

const Categories = ({ items }) => {
  const [activeItem, setActiveItem] = React.useState(null);
  const onSelectItem = (index) => setActiveItem(index);
  return (
    <div className="categories">
      {items && (
        <ul>
          <li className={activeItem === null ? 'active' : ''} onClick={() => onSelectItem(null)}>
            Все
          </li>
          {items.map((text, index) => (
            <li
              className={activeItem === index ? 'active' : ''}
              onClick={() => onSelectItem(index)}
              key={`${text}_${index}`}>
              {text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Categories;
