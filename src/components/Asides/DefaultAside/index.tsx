import Link from "next/link";
import RedirectLinksAside from "../../ActiveLinks/RedirectLinksAside";

import { useRouter } from "next/router";
import { IAsideProps } from "./IAside";
import { 
  AsideBody, 
  AsideHeader, 
  ContainerAll, 
  DefaultAsideContainer,
} from "./styles";

export default function DefaultAside({ className }: IAsideProps){
  return(
  <DefaultAsideContainer className={className}>
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