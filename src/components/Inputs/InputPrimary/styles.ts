import { FieldError } from 'react-hook-form';
import styled, { css, CSSProp } from 'styled-components';

interface ContainerProps {
  styleContainer: CSSProp;
}

interface InputProps {
  styleInput: CSSProp;
  error: boolean;
  iconLeft?: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 100%;
  max-width: 30rem;
  ${props => props.styleContainer};

  p{
    font-size: 0.9rem;
    margin-top: 0.3rem;
    margin-bottom: 0;
    color: #FF8A8A;
  }
`;


export const InLineInput = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
`


export const Input = styled.input<InputProps>`
  border: none;
  border-bottom: 2px solid #ADADAD;
  padding: ${props => props.iconLeft ? '0.4rem 2rem' : '0.4rem 0.2rem'};
  width: 100%;
  ${props => props.styleInput};

  &:focus{
    outline: none
  }
`;

export const Title = styled.h6`
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 8px;
`;

export const RightIcon = styled.div`
  position: absolute;
  padding: 2px;
  right: 3px;
`

export const LeftIcon = styled.div`
  position: absolute;
  padding: 2px;
  left: 3px;
`