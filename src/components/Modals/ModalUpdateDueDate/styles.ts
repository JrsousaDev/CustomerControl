import styled from 'styled-components';

type Props = {
  openModal: boolean;
}

export const Box = styled.div<Props>`
  display: ${props => props.openModal ? 'block' : 'none'};

  position: fixed;
  z-index: 999;

  right: 50%;
  top: 30%;
  transform: translate(50%);

  max-width: 300px;
  width: 100%;
  height: 200px;

  background: #FFFFFF;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`

export const Container = styled.div`
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  height: 100%;
  width: 100%;
`

export const InputDate = styled.input`
  padding: 10px;
  border-left: 1px solid #000;
  border-radius: 10px;
`
export const TitleContainerModal = styled.h4`
`

export const TitleNameClient = styled.div`
`

export const ContainerButtonsResponse = styled.div`
  max-width: 170px;
  width: 100%;
  display: flex;
  justify-content: space-around;

  button{
    max-width: 80px;
    width: 100%;
    margin-top: 5px;
    border-radius: 5px;
    padding: 5px;
  }
`