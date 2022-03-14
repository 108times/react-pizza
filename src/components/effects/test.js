import styled from 'styled-components';
import withRipple from './withRipple';
import './style.css';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem;
  box-shadow: 0 0 0 0.5px rgba(0, 0, 0, 0.1);
  border-radius: 0.1rem;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #f9f9f9;
  font-size: 24px;
`;

const Button = (props) => {
  console.log(props);
  return (
    <button
      style={{
        color: 'darkblue',
        padding: '.5rem 1.5rem',
      }}>
      {props.children}
    </button>
  );
};

const RippledButton = withRipple(Button);
function App() {
  return (
    <Container>
      <RippledButton>hELLO WORLD</RippledButton>
      {/* <RippledButton>Hello world</RippledButton> */}
    </Container>
  );
}

export default App;
