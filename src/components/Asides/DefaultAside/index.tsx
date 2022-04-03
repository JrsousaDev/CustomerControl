import Link from "next/link";
import { IAsideProps } from "./IAside";
import { 
  AsideBody, 
  AsideHeader, 
  ContainerAll, 
  DefaultAsideContainer, 
  RedirectLinks
} from "./styles";

export default function DefaultAside({className}: IAsideProps){
  return(
  <DefaultAsideContainer className={className}>
    <ContainerAll>

      <AsideHeader>
        Customer Control v1.0
      </AsideHeader>

      <AsideBody>
        <Link href="/clientes" passHref>
          <RedirectLinks>Clientes</RedirectLinks>
        </Link>
      </AsideBody>

    </ContainerAll>
  </DefaultAsideContainer>
  )
}