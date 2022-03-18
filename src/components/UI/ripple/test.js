import { withMultipleRipple } from './withMultipleRipple';

import './style.scss';

const Button = (props) => <button className={`btn ${props.className}`}>{props.children}</button>;

const MyButton = (props) => {
  const Result = withMultipleRipple(Button);
  return <Result {...props}></Result>;
};

// const MyButton = withRipple(Button);
export function App(props) {
  return (
    <div className="app">
      <MyButton className="btn-secondary">
        <span className="btn-text">Hello world</span>
      </MyButton>
    </div>
  );
}

export default App;
