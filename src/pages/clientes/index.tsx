import { GetServerSideProps } from "next";
import { GlobalSection } from "../../styles/Global";
import { useState } from "react";
import { getUserInID } from "../../services/user";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { useQuery } from "react-query";

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
import ModalUpdateDueDate from "../../components/Modals/ModalUpdateDueDate";
import getTokenId from "../../utils/getTokenID";

export default function Customers({ resCustomers, userId }) {

  async function loadCustomers() {
    const user = await getUserInID({userId});

    const customers = await user.listCustomers?.map((list) => {
      return{
        _id: list.customerId?._id || null,
        name: list.customerId?.name || null,
        dueDate: list.customerId?.contract.dueDate,
        dueDateFormat: moment(list.customerId?.contract.dueDate).format('DD/MM/YYYY') || null,
        value: list.customerId?.contract.value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) || null,
      }
    });

    return customers
  }

  const { data: customers, refetch } = useQuery("checkins", loadCustomers, {initialData: resCustomers});
  const [ openModalUpdateDueDate, setOpenModalUpdateDueDate ] = useState(false);
  const [ selectedCustomer, setSelectedCustomer ] = useState();

  const currentDate = moment();

  const updateDueDate = async ({customer}) => {
    setOpenModalUpdateDueDate(true);
    setSelectedCustomer(customer);
  }

  return(
  <>

  <ModalUpdateDueDate
    refetchCustomer={refetch}
    userId="624a61003f400d5a198bb6bc"
    customer={selectedCustomer} 
    openModal={openModalUpdateDueDate} 
    setOpenModal={setOpenModalUpdateDueDate}
  />

  <GridLayout>
    <DefaultHeader title="Lista de clientes" className="header"/>
    <GlobalSection className="section">
      <ContainerTable>
        <MaterialTablesData 
          title="Clientes"
          columns={[        
            { title: 'Empresa', field: 'name' },
            { title: 'Contrato', field: 'value'},
            { title: 'Data de vencimento', field: 'dueDateFormat' },
            {
              title: 'Status', 
              field: '',
              render: rowData => {
                return currentDate.isAfter(moment(rowData.dueDate), 'day')
                ? <StatusAttentionTable>Atrasado</StatusAttentionTable>
                : <StatusCheckedTable>Em dias</StatusCheckedTable>
              }
            },
          ]}
          actions={[
            {
              icon: () => <BsCalendar2CheckFill />,
              tooltip: 'Atualizar vencimento',
              onClick: (event, rowData) => updateDueDate({customer: rowData})
            }
          ]}
          data={customers}
        />
      </ContainerTable>

    </GlobalSection>

    <DefaultAside className="aside"/>
    <DefaultFooter className="footer"/>
  </GridLayout>
  </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (context) => {
    const userId = await getTokenId(context, 'customerControl.token');
    const user = await getUserInID({userId});
  
    if (!user?.message && user) {
      const customers = await user.listCustomers?.map((list) => {
        return{
          _id: list.customerId?._id || null,
          name: list.customerId?.name || null,
          dueDate: list.customerId?.contract.dueDate,
          dueDateFormat: moment(list.customerId?.contract.dueDate).format('DD/MM/YYYY') || null,
          value: list.customerId?.contract.value.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) || null,
        }
      });
  
      return{
        props:{
          resCustomers: customers || null,
          userId: userId || null,
        }
      }
    }
  }
)

