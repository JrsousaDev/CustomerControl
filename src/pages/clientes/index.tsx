import { GetServerSideProps } from "next";
import { GlobalSection } from "../../styles/Global";
import { useState } from "react";
import { getUserInID } from "../../services/user";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { useQuery } from "react-query";
import { getAPIClient } from "../../services/axios";
import { deleteCustomer, paymentSuccess } from "../../services/customer";
import { toast } from "react-toastify";
import { AiFillDelete } from "react-icons/ai";
import { mounthsMaterialTable } from "../../constants/mounths";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import {
  ContainerTable,
  StatusAttentionTable,
  StatusCheckedTable
} from "../../styles/pageStyles/clientes/styles";

import MaterialTablesData from "../../components/Tables/MaterialTablesData";
import DefaultGridLayout from "../../containers/Layouts/DefaultGridLayout";
import moment from 'moment';
import ModalUpdateDueDate from "../../components/Modals/ModalUpdateDueDate";
import getTokenId from "../../utils/getTokenID";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import Head from "next/head";

export default function Customers({ resCustomers, userId }) {

  async function loadCustomers() {
    const user = await getUserInID({ userId });

    const customers = await user.listCustomers?.map((list) => {
      return {
        _id: list.customerId?._id || null,
        name: list.customerId?.name || null,
        dueDate: list.customerId?.contract.dueDate,
        dueDateFormat: moment(list.customerId?.contract.dueDate).format('DD/MM/YYYY') || null,
        mounthFormat: moment(list.customerId?.contract.dueDate).format('MM/YYYY'),
        value: list.customerId?.contract.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) || null,
      }
    });

    return customers
  }

  const { data: customers, refetch } = useQuery("checkins", loadCustomers, { initialData: resCustomers });
  const [openModalUpdateDueDate, setOpenModalUpdateDueDate] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState();

  const currentDate = moment();

  const updateDueDate = async ({ customer }) => {
    setOpenModalUpdateDueDate(true);
    setSelectedCustomer(customer);
  }

  const handleDeleteCustomer = async ({ userId, customerId }) => {
    try {
      await deleteCustomer({ userId, customerId });
      toast.success('Cliente deletado');
      refetch();
    } catch (error) {
      toast.error('Internal server error');
    }
  }

  const handleSuccessPayment = async ({ userId, customerId }) => {
    try {
      await paymentSuccess({ userId, customerId });
      toast.success('Pagamento recebido!');
      refetch();
    } catch (error) {
      toast.error('Internal server error!')
    }
  }

  return (
    <>

      <Head>
        <title>Lista de Clientes | Customer Controll</title>
      </Head>

      <ModalUpdateDueDate
        refetchCustomer={refetch}
        userId={userId}
        customer={selectedCustomer}
        openModal={openModalUpdateDueDate}
        setOpenModal={setOpenModalUpdateDueDate}
      />

      <DefaultGridLayout headerTitle="Lista de Clientes">
        <ButtonPrimary
          textButton="Adicionar Cliente"
          styleContainer={{ marginBottom: '10px' }}
          url="/clientes/add"
        />

        <ContainerTable>
          <MaterialTablesData
            title="Clientes"
            columns={[
              { title: 'Empresa', field: 'name', filtering: false },
              { title: 'Contrato', field: 'value', filtering: false },
              { title: 'Data de vencimento', field: 'dueDateFormat', filtering: false },
              { title: 'Mês', field: 'mounthFormat', lookup: mounthsMaterialTable },
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
            options={{ filtering: true }}
            actions={[
              {
                icon: () => <BsCalendar2CheckFill />,
                tooltip: 'Atualizar vencimento',
                onClick: (event, rowData) => updateDueDate({ customer: rowData })
              },
              {
                icon: () => <AiFillDelete />,
                tooltip: 'Excluir cliente',
                onClick: (event, rowData) => {
                  const res = confirm('Você tem certeza que deseja excluir o cliente: ' + rowData.name);
                  if (res) handleDeleteCustomer({ userId, customerId: rowData._id });
                }
              },
              {
                icon: () => <RiMoneyDollarCircleFill />,
                tooltip: 'Pagamento Efetuado',
                onClick: (event, rowData) => {
                  const res = confirm('Você confirma o recebimento de: ' + rowData.name);
                  if (res) handleSuccessPayment({ userId, customerId: rowData._id });
                }
              }
            ]}
            data={customers}
          />
        </ContainerTable>
      </DefaultGridLayout>
    </>
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
      const customers = await user.listCustomers?.map((list) => {
        return {
          _id: list.customerId?._id || null,
          name: list.customerId?.name || null,
          dueDate: list.customerId?.contract.dueDate || null,
          dueDateFormat: moment(list.customerId?.contract.dueDate).format('DD/MM/YYYY') || null,
          mounthFormat: moment(list.customerId?.contract.dueDate).format('MM/YYYY'),
          value: list.customerId?.contract.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) || null,
        }
      });

      return {
        props: {
          resCustomers: customers || null,
          userId: userId || null,
        }
      }
    }
    return {
      props: {}
    }
  }
)

