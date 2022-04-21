import styled from 'styled-components';

export const ContainerSplitDashboard = styled.div`
  padding-top: 5rem;
  display: flex;
  justify-content: center;
  gap: 30px;

  @media (max-width: 800px){
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`