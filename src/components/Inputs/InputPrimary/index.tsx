import React, { forwardRef, InputHTMLAttributes, ForwardRefRenderFunction, ReactElement } from 'react';
import { FieldError } from 'react-hook-form';
import { CSSProp } from 'styled-components';
import SkeletonInput from '../../Skeleton/SkeletonInput';
import { Container, InLineInput, Input, Title } from './styles';

export interface InputPrimaryProps extends InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  titleInput?: string;
  styleInput?: CSSProp;
  styleContainer?: CSSProp;
  error?: FieldError | { message: string },
  leftComponent?: ReactElement,
  rightComponent?: ReactElement,
  as?: any
  mask?: any
}

const InputPrimaryBase: ForwardRefRenderFunction<HTMLInputElement, InputPrimaryProps> = (
  {
    titleInput,
    styleContainer,
    styleInput,
    isLoading,
    error,
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

          {
            isLoading ?
              <SkeletonInput />
              :
              <Input
                ref={ref}
                styleInput={styleInput}
                error={!!error?.message}
                {...rest}
              />
          }

          {rightComponent}
        </InLineInput>
      }

      {!!error?.message && <p>{error.message}</p>}
    </Container>
  )
}

export const InputPrimary = forwardRef(InputPrimaryBase)