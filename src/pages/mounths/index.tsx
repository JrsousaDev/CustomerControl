import getTokenId from "../../utils/getTokenID";
import DefaultAside from "../../components/Asides/DefaultAside";
import DefaultFooter from "../../components/Footers/DefaultFooter";
import DefaultHeader from "../../components/Headers/DefaultHeader";
import MaterialTablesData from "../../components/Tables/MaterialTablesData";
import GridLayout from "../../containers/GridLayout";

import { getAPIClient } from "../../services/axios";
import { GlobalSection } from "../../styles/Global";
import { ContainerTable } from "../../styles/pageStyles/clientes/styles";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { GetServerSideProps } from "next";
import { firstLetter } from "../../utils/firstLetter";

interface IMounthsProps{
  mounths: [{}]
}

export default function Mounths({mounths}: IMounthsProps) {

  return(
  <GridLayout>
    <DefaultHeader title="Faturamento por mês" />

    <GlobalSection className="section">
      <ContainerTable>

        <MaterialTablesData 
          title="Meses"
          columns={[        
            { title: 'Mês', field: 'mounthName' },
            { title: 'Faturamento', field: 'billing'},
            { title: 'Ano', field: 'year' },
          ]}
          actions={[]}
          data={mounths}
        />

      </ContainerTable>
    </GlobalSection>

    <DefaultAside />
    <DefaultFooter />
  </GridLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (context) => {
    const userId = await getTokenId(context, 'customerControl.token');
    const api = getAPIClient(context);
    const { data } = await api.get(`/mounth/${userId}`)

    if(!data) {
      return{
        props:{}
      }
    }

    const mounths = data?.map(mounth => {
      return{
        _id: mounth._id,
        mounthName: firstLetter(mounth.mounthName),
        billing: mounth.billing.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}),
        year: mounth.year,
      }
    })

    return{
      props:{
        mounths
      }
    }
  }
)
