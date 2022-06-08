import Space from '../../assets/space.jpg';
import styled from 'styled-components';

export const StyledTetrisWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: url(${Space}) #000;
  background-size: cover;
  overflow: hidden;
`;

export const StyledTetris = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  margin: 0 auto;
  max-width: 900px;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }

  aside {
    width: 100%;
    max-width: 200px;
    display: block;
    padding: 0 20px;
  }
`;
