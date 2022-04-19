import DefaultAside from "../../components/Asides/DefaultAside";
import DefaultFooter from "../../components/Footers/DefaultFooter";
import DefaultHeader from "../../components/Headers/DefaultHeader";
import GridLayout from "../../containers/GridLayout";

import { GlobalSection } from "../../styles/Global";

export default function CustomersAdd() {
  return(
    <GridLayout>
    <DefaultHeader title="Lista de clientes"/>
    <GlobalSection className="section">

    </GlobalSection>

    <DefaultAside />
    <DefaultFooter className="footer"/>
  </GridLayout>
  )
}