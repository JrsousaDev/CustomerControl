import styled from 'styled-components';
import { IBadgeProps } from './IDefaultDashboard';

export const ContainerBase = styled.div`
  background-color: #FFFFFF;
  max-width: 25rem;
  width: 100%;
  height: 9.375rem;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  display: flex;
  justify-content: center;
`

export const Container = styled.div`
  width: 100%;
  margin: 2rem 1rem;
  border-bottom: 1px solid #D9D7D7;
`

export const ContainerIcon = styled.div`
  position: relative;
`

export const ContainerInformation = styled.div`
  text-align: right;

  p{
    color: #ACACAC;
    font-weight: 400;
    font-size: 0.938rem;
    padding-bottom: 5px;
  }

  span{
    font-size: 1.563rem;
    color: #000;
  }
`

export const Badge = styled.div<IBadgeProps>`
  position: absolute;
  background-color: ${props => props.bgColor};
  width: 6.25rem;
  height: 6.25rem;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  top: -60px;
  left: 10px;
`

export const ContainerImg = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  margin-top: 5px;

  svg{
    width: 100%;
  }
`