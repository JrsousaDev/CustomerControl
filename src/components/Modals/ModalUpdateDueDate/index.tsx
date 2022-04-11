import { useState } from "react";
import { toast } from "react-toastify";
import { updateDueDateCustomer } from "../../../services/customer";
import { 
  Container, 
  Box, 
  InputDate, 
  ContainerButtonsResponse, 
  TitleContainerModal,
  TitleNameClient
} from "./styles";

import moment from "moment";

interface IModalUpdateDueDateProps {
  userId: string;
  customer: any;
  openModal: boolean;
  setOpenModal: (parameter) => void;
  refetchCustomer: () => void;
}

export default function ModalUpdateDueDate({openModal, setOpenModal, customer, userId, refetchCustomer}: IModalUpdateDueDateProps) {
  const [ dueDate, setDueDate ] = useState<any>();

  const currentDate = moment(new Date()).format('YYYY-MM-DD');
 
  const updateDueDateResponse = async () => {
    try {
      await updateDueDateCustomer({userId, customerId: customer._id, dueDate});
      toast.success('Data de nascimento atualizada com sucesso!');
      refetchCustomer();
      hiddenModal();
    } catch (err) {
      toast.error('Internal server error!');
      hiddenModal();
    }
  }

  const hiddenModal = () => {
    setOpenModal(false);
    setDueDate('');
  }

  return(
  <Box openModal={openModal}>
    <Container>
      <TitleContainerModal>Atualizar a data de vencimento</TitleContainerModal>
      <TitleNameClient><strong>Cliente: </strong>{customer?.name}</TitleNameClient>
      <InputDate 
        type="date" 
        min={currentDate}
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <ContainerButtonsResponse>
        <button onClick={hiddenModal}>Voltar</button>
        <button onClick={updateDueDateResponse}>Atualizar</button>
      </ContainerButtonsResponse>
    </Container>
  </Box>
  )
}