import { forwardRef, ForwardRefRenderFunction } from "react";
import { Container, ContainerInputRelative, InlineInput, Input } from "./styles";
import { AiOutlineSearch } from "react-icons/ai";
import { InputHTMLAttributes, ReactElement } from "react";
import { CSSProp } from "styled-components";

export interface IInputSearchProps extends InputHTMLAttributes<HTMLInputElement>{
  placeholder?: string;
  styleInput?: CSSProp;
  styleContainer?: CSSProp;
  icon?: boolean;
}

export interface ContainerProps {
  styleContainer: CSSProp
}

export interface InputProps {
  styleInput: CSSProp;
}

const InputSearchBase: ForwardRefRenderFunction<HTMLInputElement, IInputSearchProps> = (
  {
    placeholder,
    styleContainer,
    styleInput,
    icon,
    ...rest
  },
  ref
) => {
  return(
    <Container styleContainer={styleContainer}>
      <InlineInput>
        {icon &&
        <ContainerInputRelative>
          <Input 
            ref={ref}
            placeholder={placeholder}
            styleInput={styleInput}
            {...rest}
          />
          <AiOutlineSearch className="iconSearch"/>
        </ContainerInputRelative>
        }
        {!icon &&
        <Input 
          ref={ref}
          placeholder={placeholder}
          styleInput={styleInput}
          {...rest}
        />
        }
      </InlineInput>
    </Container>
  )
}

export const InputSearch = forwardRef(InputSearchBase)