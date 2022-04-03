import DefaultDashboard from "../../components/Dashboards/DefaultDashboard";
import DefaultFooter from "../../components/Footers/DefaultFooter";
import DefaultHeader from "../../components/Headers/DefaultHeader";
import DefaultAside from "../../components/Asides/DefaultAside";
import GridLayout from "../../containers/GridLayout";
import GiveMoneyIcon from "/public/assets/giveMoney.svg";
import CustomersIcon from "/public/assets/customers.svg";

import { ContainerSplitDashboard, Section } from "./styles";
import { GetServerSideProps } from "next";
import { getUserInID } from "../../services/user";
import { IDashboardProps } from "./IDashboard";
import { useState } from "react";

export default function Dashboard({ resCustomers, money }: IDashboardProps) {
  const [ customers, setCustomers ] = useState(resCustomers);

  return(
  <GridLayout>
    <DefaultHeader title="Dashboard" className="header"/>

    <Section className="section">
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
    </Section>

    <DefaultAside className="aside"/>
    <DefaultFooter className="footer"/>
  </GridLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = "6247ce4855bdb3cba6be0ee3";

  const user = await getUserInID({userId});

  const customers = user.listCustomers.map((list) => {
    return{
      money: list.customerId.contract.value
    }
  });

  const totalMoney = customers.reduce((total, customer) => total + customer.money, 0)
  .toLocaleString('pt-br', {style: 'currency', currency: 'BRL'});

  return{
    props:{
      resCustomers: customers,
      money: totalMoney
    }
  }
}
