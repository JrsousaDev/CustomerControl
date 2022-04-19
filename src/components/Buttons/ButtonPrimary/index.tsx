import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
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
}

const ButtonPrimary: React.FC<ButtonPrimary> = ({
  textButton,
  styleContainer,
  styleButton,
  url,
}) => {
  return(
  <>
    {url && 
      <Link href={url} passHref>
        <Container 
          style={styleContainer}
        >
          <Button style={styleButton}>
            {textButton}
          </Button>
        </Container>
      </Link>
    }
    {!url &&
      <Container 
        style={styleContainer}
      >
        <Button style={styleButton}>
          {textButton}
        </Button>
      </Container>
    }
  </>
  )
}

export default ButtonPrimary;