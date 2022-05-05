import DefaultDashboard from "../../components/Dashboards/DefaultDashboard";
import DefaultGridLayout from "../../containers/Layouts/DefaultGridLayout";
import GiveMoneyIcon from "/public/assets/giveMoney.svg";
import CustomersIcon from "/public/assets/customers.svg";
import getTokenId from "../../utils/getTokenID";

import { ContainerSplitDashboard } from "../../styles/pageStyles/dashboard/styles";
import { GetServerSideProps } from "next";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { getAPIClient } from "../../services/axios";
import { sumeMoney } from "../../utils/sumeMoney";
import { useQuery } from "react-query";
import { getUserInID } from "../../services/user";

interface IDashboardProps {
  resCustomers: any,
  resMoney: string,
  userId: string,
}

export default function Dashboard({ resCustomers, resMoney, userId }: IDashboardProps) {

  async function loadCustomers() {
    const user = await getUserInID({ userId });
    const customers = await user.listCustomers?.map((list) => {
      return {
        money: list.customerId.contract.value
      }
    });
    return customers
  }

  const { data: customers } = useQuery("customers", loadCustomers, { initialData: resCustomers });

  return (
    <DefaultGridLayout headerTitle="Dashboard">
      <ContainerSplitDashboard>
        <DefaultDashboard title="Soma de contratos" values={resMoney} bgColor="#0C9600">
          <GiveMoneyIcon />
        </DefaultDashboard>

        <DefaultDashboard title="Quant. de clientes" values={customers?.length || '0'} bgColor="#272826">
          <CustomersIcon />
        </DefaultDashboard>

        {/* <DefaultDashboard title="Faturamento mês anterior" values={money} bgColor="#0C9600">
          <GiveMoneyIcon />
        </DefaultDashboard> */}
      </ContainerSplitDashboard>
    </DefaultGridLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (context) => {
    const userId = await getTokenId(context, 'customerControl.token');
    const api = getAPIClient(context)
    const { data: user } = await api.post("/user/findone", { userId });

    if (!user) {
      return {
        props: {}
      }
    }

    if (!user?.message && user) {
      const customers = user.listCustomers?.map((list) => {
        return {
          money: list.customerId.contract.value
        }
      });

      const totalMoney = sumeMoney(customers);

      return {
        props: {
          resCustomers: customers || null,
          resMoney: totalMoney || null,
          userId,
        }
      }
    }

    return {
      props: {}
    }
  }
)

