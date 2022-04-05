import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

import { InputPrimary } from "../components/Inputs/InputPrimary";
import { 
  BoxButtonLogin,
  BoxContainer, 
  BoxTitle, 
  Container, 
  ContainerInputs 
} from "../styles/pageStyles/home/styles";

import * as yup from "yup";

const signInFormSchema = yup.object().shape({
  email: yup.string().required("Digite seu e-mail cadastrado"),
  password: yup.string().required("Digite sua senha"),
});

export default function Home() {
  const { signIn } = useAuth();

  const { 
    register, 
    handleSubmit, 
    setValue, 
    clearErrors, 
    formState, 
    getValues 
  } = useForm();
  const { errors, isSubmitting } = formState;

  const handleSignIn = async (data) => {
    console.log(data);
  }

  return(
    <Container>
      <BoxContainer>
        <BoxTitle>Welcome</BoxTitle>

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
