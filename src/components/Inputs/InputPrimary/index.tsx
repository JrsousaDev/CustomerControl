import React, { forwardRef, InputHTMLAttributes, ForwardRefRenderFunction, ReactElement } from 'react';
import { CSSProp } from 'styled-components';
import { Container, InLineInput, Input, RightIcon, Title, LeftIcon } from './styles';

export interface InputPrimaryProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  errorMessage?: string;
  isLoading?: boolean;
  titleInput?: string;
  styleInput?: CSSProp;
  styleContainer?: CSSProp;
  leftComponent?: ReactElement,
  rightComponent?: ReactElement,
  iconRight?: ReactElement,
  iconLeft?: ReactElement,
  as?: any
  mask?: any
}

const InputPrimaryBase: ForwardRefRenderFunction<HTMLInputElement, InputPrimaryProps> = (
  {
    titleInput,
    styleContainer,
    errorMessage,
    styleInput,
    isLoading,
    leftComponent,
    rightComponent,
    iconRight,
    iconLeft,
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
          {iconLeft && <LeftIcon>{iconLeft}</LeftIcon>}
          <Input
            ref={ref}
            styleInput={styleInput}
            error={errorMessage}
            iconLeft={iconLeft}
            {...rest}
          />
          {iconRight && <RightIcon>{iconRight}</RightIcon>}
          {rightComponent}
        </InLineInput>
      }

     {!!errorMessage && <p>{errorMessage}</p>}
    </Container>
  )
}

export const InputPrimary = forwardRef(InputPrimaryBase)