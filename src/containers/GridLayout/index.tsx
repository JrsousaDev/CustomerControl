import { useState } from "react";
import { useLayout } from "../../contexts/LayoutContext";
import { IGridLayout } from "./IGridLayout";
import { ContainerGridLayout } from "./styles";

export default function GridLayout({children}: IGridLayout) {
  const { heightAsideMobile } = useLayout();

  return(
  <ContainerGridLayout heightAsideMobile={heightAsideMobile}>
    {children}
  </ContainerGridLayout>
  )
}