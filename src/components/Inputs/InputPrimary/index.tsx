import React, { forwardRef, InputHTMLAttributes, ForwardRefRenderFunction, ReactElement } from 'react';
import { FieldError } from 'react-hook-form';
import { CSSProp } from 'styled-components';
import SkeletonInput from '../../Skeleton/SkeletonInput';
import { Container, InLineInput, Input, Title } from './styles';

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
          <Input
            ref={ref}
            styleInput={styleInput}
            error={errorMessage}
            {...rest}
          />
          {rightComponent}
        </InLineInput>
      }

     {!!errorMessage && <p>{errorMessage}</p>}
    </Container>
  )
}

export const InputPrimary = forwardRef(InputPrimaryBase)