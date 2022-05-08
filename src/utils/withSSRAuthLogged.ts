import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { parseCookies } from "nookies";

export function withSSRAuthLogged<P>(fn: GetServerSideProps<P>) {
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



    return await fn(context);
  }
}