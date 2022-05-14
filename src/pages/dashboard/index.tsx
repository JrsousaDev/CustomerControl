import DefaultDashboard from "../../components/Dashboards/DefaultDashboard";
import DefaultGridLayout from "../../containers/Layouts/DefaultGridLayout";
import GiveMoneyIcon from "/public/assets/giveMoney.svg";
import CustomersIcon from "/public/assets/customers.svg";
import Head from "next/head";

import { ContainerSplitDashboard } from "../../styles/pageStyles/dashboard/styles";
import { GetServerSideProps } from "next";
import { sumeMoney } from "../../utils/sumeMoney";
import { useQuery } from "react-query";
import { getUser } from "../../services/user";
import { withSSRAuth } from "../../utils/authAndPermissions/withSSRAuth";
import { CanAccess } from "../../components/CanAccess";

interface IDashboardProps {
  resCustomers: any,
  resMoney: string,
}

async function loadCustomers() {
  const user = await getUser({});
  const customers = await user.listCustomers?.map((list) => {
    return {money: list.customerId.contract.value}
  });
  return customers
} 

export default function Dashboard({ resCustomers, resMoney }: IDashboardProps) {
  const { data: customers } = useQuery("customers", loadCustomers, { initialData: resCustomers });

  return (
    <>
      <Head>
        <title>Dashboard | Customer Controll</title>
      </Head>

      <DefaultGridLayout headerTitle="Dashboard">

        <ContainerSplitDashboard>

          <CanAccess roles={['ADMIN']}>
            <DefaultDashboard title="Soma de contratos" values={resMoney} bgColor="#0C9600">
              <GiveMoneyIcon />
            </DefaultDashboard>
          </CanAccess>

          <DefaultDashboard title="Quant. de clientes" values={customers?.length || '0'} bgColor="#272826">
            <CustomersIcon />
          </DefaultDashboard>

          {/* <DefaultDashboard title="Faturamento mês anterior" values={money} bgColor="#0C9600">
          <GiveMoneyIcon />
        </DefaultDashboard> */}
        </ContainerSplitDashboard>
      </DefaultGridLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    const user = await getUser({ctx});

    if (!user) {
      return {
        props: {}
      }
    }

    if (!user?.message && user) {
      const customers = user.listCustomers?.map((list) => {
        return {
          money: list.customerId?.contract?.value || null
        }
      });

      const totalMoney = sumeMoney(customers);

      return {
        props: {
          resCustomers: customers || null,
          resMoney: totalMoney || null,
        }
      }
    }

    return {
      props: {}
    }
  }
)

