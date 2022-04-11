import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { GetServerSideProps } from "next";
import { withSSRAuthLogged } from "../utils/withSSRAuthLogged";
import { toast } from "react-toastify";
import { InputPrimary } from "../components/Inputs/InputPrimary";
import { 
  BoxButtonLogin,
  BoxContainer, 
  BoxTitle, 
  Container, 
  ContainerInputs 
} from "../styles/pageStyles/home/styles";

import Router from "next/router";


/* import * as yup from "yup"; */

/* const signInFormSchema = yup.object().shape({
  email: yup.string().required("Digite seu e-mail cadastrado"),
  password: yup.string().required("Digite sua senha"),
}); */

export default function Home() {
  const { signIn } = useAuth();

  const { 
    register, 
    handleSubmit, 
  } = useForm();

  const handleSignIn = async (data) => {
    try {
      await signIn(data);
      Router.push('/dashboard');
    } catch (err) {
      toast.error(err)
    }
  }

  return(
    <Container>
      <BoxContainer>
        <BoxTitle>Controle de Clientes v1.0</BoxTitle>

        <ContainerInputs>
          <InputPrimary 
            id="email"
            name="email"
            placeholder="E-mail"
            {...register("email")}
          />
          <InputPrimary
            id="password"
            name="password"
            type="password"
            placeholder="Senha"
            {...register("password")}
          /> 
        </ContainerInputs>

        <BoxButtonLogin onClick={handleSubmit(handleSignIn)}>
          Login
        </BoxButtonLogin>

      </BoxContainer>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuthLogged(
  async (context) => {
    
    return{
      props:{}
    }
  }
)
