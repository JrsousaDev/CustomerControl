import styled from 'styled-components';

export const Container = styled.div`
  max-width: 10rem;
  width: 100%;
`

export const Button = styled.button`
 width: 100%;
 background: #125B50;
 border: 1px solid #125B50;
 color: white;
 border-radius: 5px;
 padding: 5px 10px;
 opacity: 0.9;

 transition: all 0.3s ease-in-out;

  &:hover{
    opacity: 1;
  }
`