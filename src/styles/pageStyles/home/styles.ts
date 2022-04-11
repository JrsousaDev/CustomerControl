import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: 100%;
`

export const BoxContainer = styled.div`
  background-color: #FFFFFF;
  color: #000;

  border-radius: 10px;
  box-shadow: 0px 0px 5px 1px rgba(0,0,0,0.23);

  max-width: 400px;
  width: 100%;
  min-height: 650px;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 70px;
`

export const BoxTitle = styled.h2`
  text-align: center;
  max-width: 350px;
  width: 100%;
`

export const ContainerInputs = styled.div`
  max-width: 300px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 40px;
`

export const BoxButtonLogin = styled.button`
  border: none;
  max-width: 300px;
  width: 100%;
  height: 40px;
  border-radius: 10px;
  font-weight: bold;

  text-transform: uppercase;
  color: white;

  background-color: #000;

  transition: all 0.4s;

  &:hover{
    opacity: 0.6;
  }
`