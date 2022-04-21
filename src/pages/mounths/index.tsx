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
import { sumeMoney } from "../../utils/sumeMoney";
import { InputPrimary } from "../../components/Inputs/InputPrimary";
import { TotalMoneyInputStyle } from "../../styles/pageStyles/mounths/styles";

interface IMounthsProps{
  mounths: [{}],
  totalMoneyMounth: string,
}

export default function Mounths({mounths, totalMoneyMounth}: IMounthsProps) {

  return(
  <GridLayout>
    <DefaultHeader title="Faturamento por mês" />

    <GlobalSection className="section">
      <ContainerTable>

        <MaterialTablesData 
          title="Meses"
          columns={[        
            { title: 'Mês', field: 'mounthName', filtering: false },
            { title: 'Faturamento', field: 'billing', filtering: false},
            { title: 'Ano', field: 'year' },
          ]}
          options={{filtering: true}}
          actions={[]}
          data={mounths}
        />

      </ContainerTable>
      
      <InputPrimary 
        titleInput="Faturamento Total"
        id="totalMoneyMounth"
        styleContainer={{maxWidth: '10rem', marginTop: '15px'}}
        styleInput={TotalMoneyInputStyle}
        value={totalMoneyMounth}
        disabled
      />

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
        money: mounth.billing,
        year: mounth.year,
      }
    });

    const totalMoneyMounth = sumeMoney(mounths)

    return{
      props:{
        mounths,
        totalMoneyMounth,
      }
    }
  }
)
