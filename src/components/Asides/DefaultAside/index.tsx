import Link from "next/link";
import { asideLinks } from "../../../constants/asideLinks";
import RedirectLinksAside from "../../ActiveLinks/RedirectLinksAside";
import { CanAccess } from "../../CanAccess";

import {
  AsideBody,
  AsideHeader,
  ContainerAll,
  DefaultAsideContainer,
} from "./styles";

interface IAsideProps {
}

export default function DefaultAside({ }: IAsideProps) {
  return (
    <DefaultAsideContainer className="aside">
      <ContainerAll>

        <AsideHeader>
          <Link href="/dashboard" passHref>
            Customer Control v1.0
          </Link>
        </AsideHeader>

        <AsideBody>
          {asideLinks?.map(redirect => (
            <>
              {redirect.permissions.length >= 1 || redirect.roles.length >= 1 &&
                <CanAccess roles={redirect.roles} permissions={redirect.permissions}>
                  <RedirectLinksAside href={redirect.link}>
                    {redirect.name}
                  </RedirectLinksAside>
                </CanAccess>
              }              
              {redirect.permissions.length <= 0 && redirect.roles.length <= 0 &&
                <RedirectLinksAside href={redirect.link}>
                  {redirect.name}
                </RedirectLinksAside>
              }
            </>
          ))}
        </AsideBody>
      </ContainerAll>
    </DefaultAsideContainer>
  )
}