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
  ForgotYourPassword,
  BoxButtonLoginContainer
} from "../styles/pageStyles/home/styles";

import Router from "next/router";
import * as yup from "yup"; 
import Link from "next/link";
import { useState } from "react";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";

const signInFormSchema = yup.object().shape({
  email: yup.string().email('Digite um e-mail válido').required("Digite seu e-mail cadastrado"),
  password: yup.string().required("Digite sua senha"),
}); 

export default function Home() {
  const [loading, setLoading] = useState(false);
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
    setLoading(true)
    try {
      await signIn(data);
      Router.push('/dashboard');
    } catch (err) {
      if(err) toast.error(err);
      if(!err) toast.error('Internal server error');
    } finally {
      setLoading(false)
    }
    setLoading(false)
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

        <ButtonPrimary 
          textButton="Continuar"
          onClick={handleSubmit(handleSignIn)} 
          styleButton={BoxButtonLogin}
          styleContainer={BoxButtonLoginContainer}
          disabled={loading} 
          loading={loading}
        />

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
