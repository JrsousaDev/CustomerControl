import { IFooterProps } from "./IFooter";
import { FooterContainer } from "./styles";

export default function Footer({className}: IFooterProps) {
  return <FooterContainer className={className}>Copywriter Customer Control v1.0</FooterContainer>
}