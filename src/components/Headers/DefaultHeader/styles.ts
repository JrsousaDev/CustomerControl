import styled from 'styled-components';

export const Header = styled.header`
  background-color: transparent;
  padding: 2rem 0;

  @media (max-width: 800px){
    margin: 0 10px;
  }
`

export const Container = styled.div`
  margin: auto;
  max-width: 98%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const C_Text = styled.div`
  color: #ACACAC;

  @media (max-width: 800px){
    display: none;
  }
`

export const C_Icons = styled.div`
  max-width: 20rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`

export const C_Hamburg = styled.div`
  display: none;

  @media (max-width: 800px){
    display: block;
  }
`