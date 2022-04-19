import React, { forwardRef, ForwardRefRenderFunction, ReactElement, ReactNode, SelectHTMLAttributes } from 'react';
import { CSSProp } from 'styled-components';
import { Container, InLineInput, Select, Title } from './styles';

export interface SelectPrimaryProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label?: string;
  errorMessage?: string;
  isLoading?: boolean;
  titleInput?: string;
  styleSelect?: CSSProp;
  styleContainer?: CSSProp;
  leftComponent?: ReactElement,
  rightComponent?: ReactElement,
  children?: any,
  as?: any;
  mask?: any;
}

const SelectPrimaryBase: ForwardRefRenderFunction<SelectHTMLAttributes<SelectPrimaryProps>, SelectPrimaryProps> = (
  {
    titleInput,
    styleContainer,
    errorMessage,
    styleSelect,
    isLoading,
    leftComponent,
    rightComponent,
    children,
    ...rest
  },
  ref
) => {
  return (
    <Container styleContainer={styleContainer}>
      {!!titleInput && <Title>{titleInput}</Title>}
      {
        <InLineInput>
          {leftComponent}
          <Select
            ref={ref}
            styleSelect={styleSelect}
            error={errorMessage}
            {...rest}
          >
          {children}
          </Select>
          {rightComponent}
        </InLineInput>
      }

     {!!errorMessage && <p>{errorMessage}</p>}
    </Container>
  )
}

export const SelectPrimary = forwardRef(SelectPrimaryBase)