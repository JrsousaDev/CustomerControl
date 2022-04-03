import styled, { css } from 'styled-components';
import { ContainerProps, InputProps } from './IInputSearch';

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 30rem;
  background-color: transparent;
  ${props => props.styleContainer}
`

export const InlineInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;



`

export const ContainerInputRelative = styled.div`
  width: 100%;
  position: relative;

  .iconSearch{
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
    opacity: 0.5;

    &:hover{opacity: 1}
  }
`

export const Input = styled.input<InputProps>`
  position: relative;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #D9D7D7;
  padding: 0.6rem 0.4rem;
  width: 100%;
  ${props => props.styleInput};

  &:focus{outline: none}
`