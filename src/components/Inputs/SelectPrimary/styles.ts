import { FieldError } from 'react-hook-form';
import styled, { css, CSSProp } from 'styled-components';

interface ContainerProps {
  styleContainer: CSSProp;
}

interface SelectProps {
  styleSelect: CSSProp;
  error: boolean;
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
  display: flex;
  flex-direction: row;
  align-items: center;
`


export const Select = styled.select<SelectProps>`
  border: none;
  border-bottom: 2px solid #ADADAD;
  padding: 0.4rem 0.2rem;
  width: 100%;
  ${props => props.styleSelect};

  &:focus{
    outline: none
  }
`;

export const Title = styled.h6`
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 8px;
`;
