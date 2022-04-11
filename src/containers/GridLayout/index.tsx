import { ToastContainer } from "react-toastify";
import { IGridLayout } from "./IGridLayout";
import { ContainerGridLayout } from "./styles";

export default function GridLayout({children}: IGridLayout) {
  return(
  <ContainerGridLayout>
    <div style={{position: 'absolute', top: '0', right: '0'}}><ToastContainer /></div>
    {children}
  </ContainerGridLayout>
  )
}