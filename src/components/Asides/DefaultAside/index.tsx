import Link from "next/link";
import RedirectLinksAside from "../../ActiveLinks/RedirectLinksAside";

import { 
  AsideBody, 
  AsideHeader, 
  ContainerAll, 
  DefaultAsideContainer,
} from "./styles";

interface IAsideProps {
}

export default function DefaultAside({}: IAsideProps){
  return(
  <DefaultAsideContainer className="aside">
    <ContainerAll>

      <AsideHeader>
        <Link href="/dashboard" passHref>
          Customer Control v1.0
        </Link>
      </AsideHeader>

      <AsideBody>
        <RedirectLinksAside href="/dashboard">
          Dashboard
        </RedirectLinksAside>
        <RedirectLinksAside href="/clientes">
          Clientes
        </RedirectLinksAside>
      </AsideBody>

    </ContainerAll>
  </DefaultAsideContainer>
  )
}