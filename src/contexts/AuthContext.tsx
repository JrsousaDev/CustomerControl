import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { parseCookies, setCookie } from "nookies";
import { createAuthenticationUser, getUser } from "../services/user";
import { api } from "../services/apiClient";

import Router from "next/router";
import destroyAllCookies from "../utils/destroyAllCookies";

type User = {
  _id: string;
  email: string;
  permissions: string[];
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn: (data: SignInCredentials) => Promise<void>,
  signOut: () => void,
  user: User,
  isAuthenticated: boolean,
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut(broadcast: boolean = true) {
  destroyAllCookies();

  if(broadcast) {
    authChannel.postMessage('signOut');
  }

  Router.push("/");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = (message) => {
      switch (message.data) {
        case 'signOut':
          signOut(false);
          break;
        default:
          break;
      }
    }
  }, [])

  useEffect(() => {
    const { "customerControl.token": token } = parseCookies();

    (async () => {
      if (token) {
        await getUser({}).then(user => {
          const { roles, confidential, _id, permissions } = user;

          setUser({
            _id,
            email: confidential.email,
            permissions,
            roles: roles,
          });

        }).catch(() => {
          signOut();
        });
      } 
    })()

  }, []);

  const signIn = async ({ email, password }) => {
    try {
      const user = await createAuthenticationUser({ email, password });

      const { _id, authorization: token, permissions, roles } = user;

      if (!token || !user) {
        throw "E-mail ou senha incorreta!";
      }

      setCookie(undefined, "customerControl.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser({
        _id,
        email,
        permissions,
        roles
      });

      api.defaults.headers["Authorization"] = `${token}`;
    } catch (error) {
      throw error
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);