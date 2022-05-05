import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import DefaultGridLayout from "../../containers/Layouts/DefaultGridLayout";
import getTokenId from "../../utils/getTokenID";
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-masked-input';
import moment from "moment";
import * as yup from "yup";

import { InputPrimary } from "../../components/Inputs/InputPrimary";
import { SelectPrimary } from "../../components/Inputs/SelectPrimary";
import {
  Container,
  ContainerBox,
  ContainerInputs,
  Division,
  TitleContainer,
  ContainerStyle,
  InputStyle
} from "../../styles/pageStyles/clientes/add";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { withSSRAuth } from "../../utils/withSSRAuth";
import { GetServerSideProps } from "next";
import { createCustomer } from "../../services/customer";
import { toast } from "react-toastify";
import { useState } from "react";

const createCustomerFormSchema = yup.object().shape({
  name: yup.string().required("Digite o nome da empresa"),
  responsibleName: yup.string().required("Digite o nome do responsável"),
  email: yup.string().email('Digite um e-mail válido').required("Digite um e-mail"),
  phone: yup.string().required("Digite o número de telefone"),
  value: yup.string().required("Digite o valor do contrato"),
  dueDate: yup.string().required("Informe a data de vencimento"),
  paymentMethod: yup.string().required("Informe o método de pagamento"),
  serviceStart: yup.string().required("Informe a data de início"),
});

interface ICustomersAddProps {
  userId: string;
}

export default function CustomersAdd({ userId }: ICustomersAddProps) {
  const currentDate = moment().format('YYYY-MM-DD');
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState
  } = useForm({
    resolver: yupResolver(createCustomerFormSchema)
  });
  const { errors } = formState;

  const handleCreateCustomer = async (data) => {
    setLoading(true)
    data.userId = userId;

    try {
      await createCustomer(data);
      toast.success('Cliente adicionado');
    } catch (err) {
      if (err) toast.error(err);
      if (!err) toast.error('Internal server error');
    } finally {
      setLoading(false)
    }

    setLoading(false)
  }

  return (
    <DefaultGridLayout headerTitle="Lista de Clientes">
      <ContainerBox>
        <Container>
          <TitleContainer>Adicionar Cliente</TitleContainer>
          <ContainerInputs>
            <Division>
              <InputPrimary
                id="name"
                name="name"
                titleInput="Nome da Empresa"
                placeholder="Empresa"
                styleContainer={ContainerStyle}
                styleInput={InputStyle}
                errorMessage={errors?.name?.message}
                onClick={() => clearErrors("name")}
                {...register("name")}
              />
              <InputPrimary
                id="responsibleName"
                name="responsibleName"
                placeholder="Fulano"
                titleInput="Nome do responsável"
                styleContainer={ContainerStyle}
                styleInput={InputStyle}
                errorMessage={errors?.responsibleName?.message}
                onClick={() => clearErrors("responsibleName")}
                {...register("responsibleName")}
              />
            </Division>

            <Division>
              <InputPrimary
                id="email"
                name="email"
                placeholder="contato@gmail.com"
                titleInput="E-mail"
                styleContainer={ContainerStyle}
                styleInput={InputStyle}
                errorMessage={errors?.email?.message}
                onClick={() => clearErrors("email")}
                {...register("email")}
              />
              <InputPrimary
                id="phone"
                name="phone"
                as={InputMask}
                mask="(99) 99999-9999"
                titleInput="Celular"
                placeholder="(00) 00000-0000"
                styleContainer={ContainerStyle}
                styleInput={InputStyle}
                errorMessage={errors?.phone?.message}
                onClick={() => clearErrors("phone")}
                {...register("phone")}
              />
            </Division>

            <Division>
              <InputPrimary
                id="value"
                name="value"
                as={CurrencyInput}
                titleInput="Valor do Contrato"
                placeholder="R$"
                styleContainer={ContainerStyle}
                styleInput={InputStyle}
                errorMessage={errors?.value?.message}
                onClick={() => clearErrors("value")}
                {...register("value")}
              />
              <InputPrimary
                type="date"
                id="dueDate"
                name="dueDate"
                min={currentDate}
                titleInput="Data de vencimento"
                placeholder="00/00/0000"
                styleContainer={ContainerStyle}
                styleInput={InputStyle}
                errorMessage={errors?.dueDate?.message}
                onClick={() => clearErrors("dueDate")}
                {...register("dueDate")}
              />
            </Division>

            <Division>
              <SelectPrimary
                id="paymentMethod"
                name="paymentMethod"
                titleInput="Forma de Pagamento"
                styleContainer={ContainerStyle}
                errorMessage={errors?.paymentMethod?.message}
                onClick={() => clearErrors("paymentMethod")}
                {...register("paymentMethod")}
              >
                <option></option>
                <option value="mensal">Mensal</option>
                <option value="bimestral">Bimestral</option>
                <option value="trimestral">Trimestral</option>
              </SelectPrimary>

              <InputPrimary
                type="date"
                id="serviceStart"
                titleInput="Início de serviço"
                placeholder="00/00/0000"
                styleContainer={ContainerStyle}
                styleInput={InputStyle}
                errorMessage={errors?.serviceStart?.message}
                onClick={() => clearErrors("serviceStart")}
                {...register("serviceStart")}
              />
            </Division>

            <ButtonPrimary
              onClick={(handleSubmit(handleCreateCustomer))}
              textButton="Salvar cliente"
              loading={loading}
              styleContainer={{
                margin: 'auto',
                marginTop: '10px',
                marginBottom: '10px',
                maxWidth: '30rem',
                height: '2.5rem',
              }}
              styleButton={{
                fontSize: '1.5rem'
              }}
            />
          </ContainerInputs>
        </Container>
      </ContainerBox>
    </DefaultGridLayout> 
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (context) => {
    const userId = await getTokenId(context, 'customerControl.token');

    return {
      props: {
        userId: String(userId),
      }
    }
  }
)