import { Footer } from '@/components/ui/Footer';
import { Header } from '@/components/ui/Header';
import type { FC, PropsWithChildren } from 'react';
import { Container } from '@nextui-org/react';
import { AppRoute } from '@/common/constants';

export const DefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header homeRoute={AppRoute.Home} />
      <Container as="main" display="flex" direction="column">
        {children}
      </Container>
      <Footer />
    </>
  );
};
