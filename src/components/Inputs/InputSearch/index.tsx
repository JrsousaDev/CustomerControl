import { forwardRef, ForwardRefRenderFunction } from "react";
import { IInputSearchProps } from "./IInputSearch";
import { Container, ContainerInputRelative, InlineInput, Input } from "./styles";
import { AiOutlineSearch } from "react-icons/Ai";

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