import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/Header';
import type { FC, PropsWithChildren } from 'react';
import { Container } from '@nextui-org/react';

export const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Container as="main" display="flex" direction="column">
        {children}
      </Container>
      <Footer />
    </>
  );
};
