import styled from 'styled-components';
import { IRedirectLinksAsideProps } from './IRedirectLinksAside';

export const RedirectLinks = styled.a<IRedirectLinksAsideProps>`
  max-width: 200px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;
  border-radius: 5px;
  margin-bottom: 1rem;

  transition: all 0.2s ease-in-out;

  border: 2px solid transparent;
  background-color: ${props => props.asPath === props.asHref ? '#FFFFFF' : 'transparent'};
  color: ${props => props.asPath === props.asHref ? '#000' : '#FFFFFF'};

  &:hover{
    border: ${props => props.asPath !== props.asHref ? '2px solid #FFFFFF' : ''};
  }
`