import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";
import { AuthTokenError } from "../../services/errors/AuthTokenError";
import destroyAllCookies from "../destroyAllCookies";

/* type WithSSRAuthOptions = {
  permissions?: string[];
  roles?: string[];
} */

export function withSSRAuthLogged<P>(fn: GetServerSideProps<P>/* , options?: WithSSRAuthOptions */): GetServerSideProps {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

    const cookies = parseCookies(context);
    const token = cookies['customerControl.token'];

    if (token) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        }
      }
    }

    try {
      return await fn(context)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyAllCookies();

        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }
    }
  }
}