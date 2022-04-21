import { useAuth } from "../../../contexts/AuthContext";
import { IconNotify, IconUser } from "../../Icons/Icons";
import { InputSearch } from "../../Inputs/InputSearch";
import { 
  Container,
  C_Hamburg,
  C_Icons,
  C_Text,
  Header,
} from "./styles";
import { GiHamburgerMenu } from 'react-icons/gi'
import { useLayout } from "../../../contexts/LayoutContext";

interface IDefaultHeaderProps {
  title: string;
}

export default function DefaultHeader({ title }: IDefaultHeaderProps) {
  const { toggleHeightAsideMobile } = useLayout();
  const { signOut } = useAuth();

  return(
  <Header className="header">
    <Container>

      <C_Text>
        {title}
      </C_Text>

      <C_Hamburg>
        <GiHamburgerMenu 
          style={{cursor: 'pointer'}}
          onClick={toggleHeightAsideMobile}
        />
      </C_Hamburg>

      <C_Icons>
        <InputSearch 
          styleContainer={{maxWidth: '15rem'}}
          placeholder="Pesquisar" 
          icon={true}
        />
        <IconNotify styleIcon={{height: '25px', width: '25px', cursor: 'pointer'}}/>
        <IconUser 
          styleIcon={{height: '25px', width: '20px', cursor: 'pointer'}}
          onClick={signOut}
        />
      </C_Icons>

    </Container>
  </Header>
  )
}