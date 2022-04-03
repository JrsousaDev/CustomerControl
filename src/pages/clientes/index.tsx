import { GetServerSideProps } from "next";
import { GlobalSection } from "../../styles/Global";
import { useState } from "react";
import { getUserInID } from "../../services/user";

import DefaultAside from "../../components/Asides/DefaultAside";
import DefaultFooter from "../../components/Footers/DefaultFooter";
import DefaultHeader from "../../components/Headers/DefaultHeader";
import MaterialTablesData from "../../components/Tables/MaterialTablesData";
import GridLayout from "../../containers/GridLayout";
import moment from 'moment';

export default function Customers({customers}) {
  const [ customer, setCustomer ] = useState(customers);

  return(
  <GridLayout>
    <DefaultHeader title="Lista de clientes" className="header"/>

    <GlobalSection className="section">
      <MaterialTablesData 
        title="Clientes"
        columns={[        
          { title: 'Empresa', field: 'name' },
          { title: 'Contrato', field: 'value'},
          { title: 'Data de vencimento', field: 'dueDate' },
          { title: 'Status', field: 'status'},
        ]}
        data={customer}
      />
    </GlobalSection>

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
      name: list.customerId.name,
      dueDate: moment(list.customerId.contract.dueDate).format('DD/MM/YYYY'),
      value: list.customerId.contract.value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}),
    }
  });

  return{
    props:{
      customers
    }
  }
}