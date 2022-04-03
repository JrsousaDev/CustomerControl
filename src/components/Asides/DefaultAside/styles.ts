import styled from 'styled-components';

import { IRedirectLinksProps } from './IAside';

export const DefaultAsideContainer = styled.aside`
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url("https://demos.creative-tim.com/nextjs-material-dashboard/_next/static/images/sidebar-2-310509c95512893dc661bd3a6b0d2a5d.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 15.625rem;
  height: 100%;
  color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 1px 4px 4px 1px rgba(0, 0, 0, 0.25);
`

export const ContainerAll = styled.div`
  max-width: 90%;
  width: 100%;
`

export const AsideHeader = styled.div`
  text-align: center;
  width: 100%;
  padding-top: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #BDBDBD;
  font-weight: bold;
  font-size: 1.2rem;
`

export const AsideBody = styled.div`
  padding-top: 3.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const RedirectLinks = styled.a<IRedirectLinksProps>`
  max-width: 200px;
  width: 100%;
  padding-bottom: 1rem;
  text-align: left;
`