import { IDefaultDashboardProps } from "./IDefaultDashboard";
import { 
  Badge,
  Container, 
  ContainerBase, 
  ContainerIcon, 
  ContainerImg, 
  ContainerInformation 
} from "./styles";

export default function DefaultDashboard({title, values, children, bgColor}: IDefaultDashboardProps) {
  return(
  <ContainerBase>
    <Container>
      
      <ContainerIcon>
        <Badge bgColor={bgColor}>
          <ContainerImg>
            {children}
          </ContainerImg>
        </Badge>
      </ContainerIcon>

      <ContainerInformation>
        <p>{title}</p>
        <span>{values}</span>
      </ContainerInformation>

    </Container>
  </ContainerBase>
  )
}