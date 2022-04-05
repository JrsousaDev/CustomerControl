import { IconNotify } from "../../Icons/Icons";
import { InputSearch } from "../../Inputs/InputSearch";
import { IDefaultHeaderProps } from "./IDefaultHeader";
import { 
  Container,
  C_Icons,
  C_Text,
  Header,
} from "./styles";

export default function DefaultHeader({ title, className }: IDefaultHeaderProps) {
  return(
  <Header className={className}>
    <Container>

      <C_Text>
        {title}
      </C_Text>

      <C_Icons>
        <InputSearch 
          styleContainer={{maxWidth: '15rem'}}
          placeholder="Pesquisar" 
          icon={true}
        />
        <IconNotify styleIcon={{height: '25px', width: '25px', cursor: 'pointer'}}/>
        {/* <IconUser styleIcon={{height: '25px', width: '20px', cursor: 'pointer'}}/> */}
      </C_Icons>

    </Container>
  </Header>
  )
}