import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  height: 100%;

  background-color: #066A75;
`

export const BoxContainer = styled.div`
  margin: auto;
  background-color: #FFFFFF;
  color: #000;

  border-radius: 10px;
  border: 1px solid #FFFFFF;

  margin: 0 10px;
  padding: 0 10px;

  max-width: 500px;
  width: 100%;
  min-height: 600px;
  height: 100%;

  display: grid;
  align-items: center;
`

export const BoxTitle = styled.h2`
  margin: auto;
  text-align: center;
  max-width: 300px;
  width: 100%;
  font-size: 2rem;
  color: #000;
  padding-bottom: 5px;
`

export const ContainerInputs = styled.div`
  margin: auto;
  max-width: 400px;
  width: 100%;
  display: grid;
  gap: 40px;
`

export const BoxButtonLogin = css`
  margin: auto;
  width: 100%;
  
  border-radius: 5px;
  font-weight: bold;

  text-transform: uppercase;
  color: white;
  
  border: 2px solid #999;
  background-color: transparent;
  color: #999;
`

export const BoxButtonLoginContainer = css`
  display: grid;
  justify-content: center;
  align-items: center;
  margin: auto;
  border: none;
  max-width: 400px;
  width: 100%;
  height: 70px;
`

export const ForgotYourPassword = styled.div`
  text-align: center;
  cursor: pointer;
  font-weight: 500;
  text-decoration: underline;
  color: #066A75;
  opacity: 0.8;

  transition: all 0.4s;

  &:hover{
    opacity: 1;
  }
`