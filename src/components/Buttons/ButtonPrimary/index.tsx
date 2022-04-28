import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import SpinnerLoader from "../../Spinners/SpinnerCircular";
import { 
  Button,
  Container,
} from "./styles";

export type ButtonPrimary = ButtonHTMLAttributes<HTMLButtonElement> &
AnchorHTMLAttributes<HTMLAnchorElement> & {
  textButton: string;
  styleContainer?: any;
  styleButton?: any;
  url?: string;
  loading?: boolean;
  sizeSpinner?: number;
}

const ButtonPrimary: React.FC<ButtonPrimary> = ({
  textButton,
  styleContainer,
  styleButton,
  url,
  loading,
  sizeSpinner,
  ...rest
}) => {
  return(
  <>
    {url && 
      <Link href={url} passHref>
        <Container 
          style={styleContainer}
        >
          <Button style={styleButton} {...rest}>
          {
            loading 
            ? <SpinnerLoader colorSpinner="currentColor" loading={loading} sizeSpinner={sizeSpinner}/> 
            : textButton
          }
          </Button>
        </Container>
      </Link>
    }
    {!url &&
      <Container 
        style={styleContainer}
      >
        <Button style={styleButton} {...rest}>
          {
            loading 
            ? <SpinnerLoader colorSpinner="currentColor" loading={loading} sizeSpinner={sizeSpinner}/> 
            : textButton
          }
        </Button>
      </Container>
    }
  </>
  )
}

export default ButtonPrimary;