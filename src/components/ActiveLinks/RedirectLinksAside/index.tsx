import Link from 'next/link';

import { useRouter } from 'next/router';
import { RedirectLinks } from './styles';

function ActiveLink({ children, href }) {
  const router = useRouter()

  return (
    <Link href={href} passHref>
      <RedirectLinks asPath={router.asPath} asHref={href}>
        {children}
      </RedirectLinks>
    </Link>
  )
}

export default ActiveLink