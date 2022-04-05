import { GetServerSideProps } from "next";
import { GlobalSection } from "../../styles/Global";
import { useState } from "react";
import { getUserInID } from "../../services/user";

import { 
  ContainerTable, 
  StatusAttentionTable, 
  StatusCheckedTable 
} from "../../styles/pageStyles/clientes/styles";

import DefaultAside from "../../components/Asides/DefaultAside";
import DefaultFooter from "../../components/Footers/DefaultFooter";
import DefaultHeader from "../../components/Headers/DefaultHeader";
import MaterialTablesData from "../../components/Tables/MaterialTablesData";
import GridLayout from "../../containers/GridLayout";
import moment from 'moment';

export default function Customers({customers}) {
  const [ customer, setCustomer ] = useState(customers);
  const currentDate = moment(new Date()).format('DD/MM/YYYY');

  return(
  <GridLayout>
    <DefaultHeader title="Lista de clientes" className="header"/>

    <GlobalSection className="section">

      <ContainerTable>
        <MaterialTablesData 
          title="Clientes"
          columns={[        
            { title: 'Empresa', field: 'name' },
            { title: 'Contrato', field: 'value'},
            { title: 'Data de vencimento', field: 'dueDate' },
            {
              title: 'Status', 
              field: '',
              render: rowData => 
              currentDate >= rowData.dueDate 
              ? <StatusAttentionTable>Atrasado</StatusAttentionTable>
              : <StatusCheckedTable>OK</StatusCheckedTable>
            },
          ]}
          data={customer}
        />
      </ContainerTable>

    </GlobalSection>

    <DefaultAside className="aside"/>
    <DefaultFooter className="footer"/>
  </GridLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = "624a61003f400d5a198bb6bc";
  const user = await getUserInID({userId});

  if (!user.message || user) {
    const customers = await user.listCustomers?.map((list) => {
      return{
        name: list.customerId?.name || null,
        dueDate: moment(list.customerId?.contract.dueDate).format('DD/MM/YYYY') || null,
        value: list.customerId?.contract.value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) || null,
      }
    });

    return{
      props:{
        customers
      }
    }

  } else {
    return{
      props:{}
    }
  }

}