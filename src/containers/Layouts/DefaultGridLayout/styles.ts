import styled from "styled-components";

type Props = {
  heightAsideMobile: string;
}

export const ContainerGridLayout = styled.div<Props>`
  display: grid;
  grid-template-columns: 16.25rem 1fr 1fr;
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
    min-height: 100vh;
    height: 100%;
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

  @media (max-width: 680px){ 
    grid-template-areas: 
    'a a'
    'h h'
    's s'
    'f f'
    ;
    gap: 0; 
    grid-template-columns: 1fr 1fr;

    .section{
      padding-bottom: 20px;
    }

    .aside{
      transition: all 0.3s ease-in-out;
      position: static;
      height: ${props => props.heightAsideMobile};
      width: 100%;
      overflow-y: hidden;
    }

  }

`