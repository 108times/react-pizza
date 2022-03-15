import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Header } from './components';
import { Home, Cart } from './pages';
import { Routes, Route } from 'react-router-dom';
import { setPizzas as setPizzasAction } from './redux/actions/pizzas';

// function App() {
//   const [pizzas, setPizzas] = React.useState([]);
//   React.useEffect(async () => {
//     axios.get('http://localhost:3000/db.json').then(({ data }) => {
//       setPizzas(data.pizzas);
//     });
//   }, []);

//   return (
//     <div className="App">
//       <div className="wrapper">
//         <Header />
//         <div className="content">
//           <Routes>
//             <Route path="/" element={<Home items={pizzas} />} />
//             <Route path="/cart" element={<Cart />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

class App extends React.Component {
  componentDidMount() {
    axios.get('http://localhost:3000/db.json').then(({ data }) => {
      this.props.setPizzas(data.pizzas);
    });
  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Home items={this.props.items} />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state, 'App mapStateToProps');
  return {
    items: state.pizzas.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPizzas: (items) => dispatch(setPizzasAction(items)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
