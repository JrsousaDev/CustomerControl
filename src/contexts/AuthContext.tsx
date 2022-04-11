import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { api } from "../services/api";
import { parseCookies, setCookie } from "nookies";
import { createAuthenticationUser, getUserInID } from "../services/user";

import Router from "next/router";
import destroyAllCookies from "../utils/destroyAllCookies";
import jwtDecode from "jwt-decode";

interface SignInData {
  email: string;
  password: string;
}

interface ITokenDecoded {
  _id: string;
}

type AuthContextData = {
  signIn: (data: SignInData) => Promise<void>,
  signOut: () => void,
  user?: any,
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider( {children}: AuthProviderProps ) {
  const [ user, setUser ] = useState<any>();

  useEffect(() => {
    const { "customerControl.token": token } = parseCookies();

    async function onGetUserFunction() {
      if (token) {
        const tokenDecoded: ITokenDecoded = await jwtDecode(token);
        const id = tokenDecoded?._id;
        const user = await getUserInID({userId: id});

        let objectUser = {
          _id: user._id,
          name: user.name,
          email: user.email,
        }

        setUser(objectUser);
      }
    }

    onGetUserFunction();
  }, []);

  const signIn = async ({ email, password }) => {
    try {
      const user = await createAuthenticationUser({ email, password });
      const token = user.authorization;
      const objectUser = {
        _id: user._id,
        name: user.name,
        email: user.email
      }

      if (!token || !objectUser) throw "E-mail ou senha incorreta!";

      setCookie(undefined, "customerControl.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser(objectUser);

      api.defaults.headers["Authorization"] = `${token}`;

    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    destroyAllCookies();
    Router.push("/");
  }

  return(
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);