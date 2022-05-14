import MaterialTablesData from "../../components/Tables/MaterialTablesData";
import GridLayout from "../../containers/Layouts/DefaultGridLayout";
import Head from "next/head";

import { ContainerTable } from "../../styles/pageStyles/clientes/styles";
import { GetServerSideProps } from "next";
import { firstLetter } from "../../utils/firstLetter";
import { sumeMoney } from "../../utils/sumeMoney";
import { InputPrimary } from "../../components/Inputs/InputPrimary";
import { TotalMoneyInputStyle } from "../../styles/pageStyles/mounths/styles";
import { useQuery } from "react-query";
import { getMounths } from "../../services/mounth";
import { withSSRAuth } from "../../utils/authAndPermissions/withSSRAuth";

interface IMounthsProps {
  resMounths: [{}],
  totalMoneyMounth: string,
}

async function loadMounths() {
  const data = await getMounths({})
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

export default function Mounths({ resMounths, totalMoneyMounth }: IMounthsProps) {
  const { data: mounths } = useQuery("mounths", loadMounths, { initialData: resMounths });

  return (
    <>
      <Head>
        <title>Faturamento por mês | Customer Controll</title>
      </Head>

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
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const data = await getMounths({ctx});

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
      }
    }
  },{
    roles: ['ADMIN']
  }
)
