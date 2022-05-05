import getTokenId from "../../utils/getTokenID";
import MaterialTablesData from "../../components/Tables/MaterialTablesData";
import GridLayout from "../../containers/Layouts/DefaultGridLayout";

import { getAPIClient } from "../../services/axios";
import { ContainerTable } from "../../styles/pageStyles/clientes/styles";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { GetServerSideProps } from "next";
import { firstLetter } from "../../utils/firstLetter";
import { sumeMoney } from "../../utils/sumeMoney";
import { InputPrimary } from "../../components/Inputs/InputPrimary";
import { TotalMoneyInputStyle } from "../../styles/pageStyles/mounths/styles";
import { api } from "../../services/api";
import { useQuery } from "react-query";

interface IMounthsProps {
  resMounths: [{}],
  totalMoneyMounth: string,
  userId: string,
}

export default function Mounths({ resMounths, totalMoneyMounth, userId }: IMounthsProps) {

  async function loadMounths() {
    const { data } = await api.get(`/mounth/${userId}`);
    const mounths = data?.map(mounth => {
      return {
        _id: mounth._id,
        mounthName: firstLetter(mounth.mounthName),
        billing: mounth.billing.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        money: mounth.billing,
        year: mounth.year,
      }
    });
    return mounths
  }

  const { data: mounths } = useQuery("mounths", loadMounths, { initialData: resMounths });

  return (
    <GridLayout headerTitle="Faturamento por mês">
      <ContainerTable>

        <MaterialTablesData
          title="Meses"
          columns={[
            { title: 'Mês', field: 'mounthName', filtering: false },
            { title: 'Faturamento', field: 'billing', filtering: false },
            { title: 'Ano', field: 'year' },
          ]}
          options={{ filtering: true }}
          actions={[]}
          data={mounths}
        />

      </ContainerTable>

      <InputPrimary
        titleInput="Faturamento Total"
        id="totalMoneyMounth"
        styleContainer={{ maxWidth: '10rem', marginTop: '15px' }}
        styleInput={TotalMoneyInputStyle}
        value={totalMoneyMounth}
        disabled
      />
    </GridLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (context) => {
    const userId = await getTokenId(context, 'customerControl.token');
    const api = getAPIClient(context);
    const { data } = await api.get(`/mounth/${userId}`)

    if (!data) {
      return {
        props: {}
      }
    }

    const mounths = data?.map(mounth => {
      return {
        _id: mounth._id,
        mounthName: firstLetter(mounth.mounthName),
        billing: mounth.billing.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }),
        money: mounth.billing,
        year: mounth.year,
      }
    });

    const totalMoneyMounth = sumeMoney(mounths)

    return {
      props: {
        resMounths: mounths,
        totalMoneyMounth,
        userId,
      }
    }
  }
)
