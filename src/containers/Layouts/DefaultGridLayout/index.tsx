import DefaultAside from "../../../components/Asides/DefaultAside";
import DefaultFooter from "../../../components/Footers/DefaultFooter";
import DefaultHeader from "../../../components/Headers/DefaultHeader";

import { useLayout } from "../../../contexts/LayoutContext";
import { GlobalSection } from "../../../styles/Global";
import { ContainerGridLayout } from "./styles";

interface GridLayoutProps {
  children: React.ReactNode;
  headerTitle?: string;
}

export default function GridLayout({ 
  children, 
  headerTitle 
}: GridLayoutProps) {
  const { heightAsideMobile } = useLayout();

  return(
  <ContainerGridLayout heightAsideMobile={heightAsideMobile}>
    <DefaultHeader title={headerTitle || ""} />
    <GlobalSection className="section">
      {children}
    </GlobalSection>
    <DefaultAside/>
    <DefaultFooter/>
  </ContainerGridLayout>
  )
}