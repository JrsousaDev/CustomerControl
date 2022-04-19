import styled, { css } from 'styled-components';

export const ContainerBox = styled.div`
  background-color: #FFFFFFFf;
  border: 1px solid #FFFFFFFf;
  box-shadow: 0px 0px 5px 3px rgba(0,0,0,0.09);
  min-height: 450px;
  border-radius: 5px;
  padding: 10px;
`

export const Container = styled.div`

`

export const TitleContainer = styled.h2`
  text-align: center;
  border-bottom: 2px solid #000;
  padding-bottom: 5px;
`

export const ContainerInputs = styled.div`
  padding-top: 30px;
  display: grid;
  gap: 20px;
`

export const Division = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

export const InputStyle = css`
  max-width: 60rem;
  width: 100%;
  margin: auto;
  border-radius: 3px;
`

export const ContainerStyle = css`
  max-width: 60rem;
  width: 100%;
  margin: auto;
`