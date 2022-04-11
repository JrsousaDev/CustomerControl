import DefaultDashboard from "../../components/Dashboards/DefaultDashboard";
import DefaultFooter from "../../components/Footers/DefaultFooter";
import DefaultHeader from "../../components/Headers/DefaultHeader";
import DefaultAside from "../../components/Asides/DefaultAside";
import GridLayout from "../../containers/GridLayout";
import GiveMoneyIcon from "/public/assets/giveMoney.svg";
import CustomersIcon from "/public/assets/customers.svg";
import getTokenId from "../../utils/getTokenID";

import { ContainerSplitDashboard } from "../../styles/pageStyles/dashboard/styles";
import { GetServerSideProps } from "next";
import { getUserInID } from "../../services/user";
import { IDashboardProps } from "../../interfaces/dashboard/IDashboard";
import { useState } from "react";
import { GlobalSection } from "../../styles/Global";
import { withSSRAuth } from "../../utils/withSSRAuth";

export default function Dashboard({ resCustomers, money }: IDashboardProps) {
  const [ customers, setCustomers ] = useState(resCustomers);

  return(
  <GridLayout>
    <DefaultHeader title="Dashboard" className="header"/>

    <GlobalSection className="section">
      <ContainerSplitDashboard>
        <DefaultDashboard title="Soma de contratos" values={money} bgColor="#0C9600">
          <GiveMoneyIcon/>
        </DefaultDashboard>

        <DefaultDashboard title="Quant. de clientes" values={customers?.length || '0'} bgColor="#272826">
          <CustomersIcon/>
        </DefaultDashboard>

        <DefaultDashboard title="Faturamento mês anterior" values={money} bgColor="#0C9600">
          <GiveMoneyIcon />
        </DefaultDashboard>
      </ContainerSplitDashboard>
    </GlobalSection>

    <DefaultAside className="aside"/>
    <DefaultFooter className="footer"/>
  </GridLayout>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (context) => {
    const userId = await getTokenId(context, 'customerControl.token');
    const user = await getUserInID({userId});

    if(!user) {
      return{
        props:{}
      }
    }
  
    if(!user?.message && user) {
      const customers = user.listCustomers?.map((list) => {
        return{
          money: list.customerId.contract.value
        }
      });
    
      const totalMoney = customers?.reduce((total, customer) => total + customer.money, 0)
      .toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});
    
      return{
        props:{
          resCustomers: customers || null,
          money: totalMoney || null
        }
      }
    }
  }
)

