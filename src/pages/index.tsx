import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { GetServerSideProps } from "next";
import { withSSRAuthLogged } from "../utils/withSSRAuthLogged";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputPrimary } from "../components/Inputs/InputPrimary";
import { 
  BoxButtonLogin,
  BoxContainer, 
  BoxTitle, 
  Container, 
  ContainerInputs, 
  ForgotYourPassword
} from "../styles/pageStyles/home/styles";

import Router from "next/router";
import * as yup from "yup"; 
import Link from "next/link";

const signInFormSchema = yup.object().shape({
  email: yup.string().email('Digite um e-mail válido').required("Digite seu e-mail cadastrado"),
  password: yup.string().required("Digite sua senha"),
}); 

export default function Home() {
  const { signIn } = useAuth();

  const { 
    register, 
    handleSubmit, 
    clearErrors,
    formState
  } = useForm({
    resolver: yupResolver(signInFormSchema)
  });
  const { errors } = formState;

  const handleSignIn = async (data) => {
    try {
      await signIn(data);
      Router.push('/dashboard');
    } catch (err) {
      if(err) toast.error(err);
      if(!err) toast.error('Internal server error');
    }
  }

  return(
    <Container>
      <BoxContainer>
        <BoxTitle>Faça seu login</BoxTitle>

        <ContainerInputs>
          <InputPrimary 
            id="email"
            name="email"
            titleInput="E-mail"
            placeholder="contato@exemplo.com"
            errorMessage={errors?.email?.message}
            onClick={() => clearErrors("email")}
            {...register("email")}
          />
          <InputPrimary
            id="password"
            name="password"
            type="password"
            titleInput="Senha"
            placeholder="1234"
            errorMessage={errors?.password?.message}
            onClick={() => clearErrors("password")}
            {...register("password")}
          /> 
        </ContainerInputs>

        <BoxButtonLogin onClick={handleSubmit(handleSignIn)}>
          Continuar
        </BoxButtonLogin>

        <Link href="#" passHref>
          <ForgotYourPassword>Esqueceu sua senha?</ForgotYourPassword>
        </Link>

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
