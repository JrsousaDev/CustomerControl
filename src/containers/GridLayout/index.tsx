import { IGridLayout } from "./IGridLayout";
import { ContainerGridLayout } from "./styles";

export default function GridLayout({children}: IGridLayout) {
  return(
  <ContainerGridLayout>
    {children}
  </ContainerGridLayout>
  )
}