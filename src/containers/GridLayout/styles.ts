import styled from "styled-components";

export const ContainerGridLayout = styled.div`
  display: grid;
  grid-template-columns: 16.25rem 1fr 1fr;
  gap: 0.625rem;
  grid-template-areas: 
    'a h h'
    'a s s'
    'a f f'
  ;

  .header{
    grid-area: h;
  }

  .section{
    grid-area: s;
    height: 100vh;
  }

  .aside{
    position: fixed;
    grid-area: a;
    height: 100vh;
  }

  .footer{
    padding-bottom: 0.938rem;
    grid-area: f;
  }

`