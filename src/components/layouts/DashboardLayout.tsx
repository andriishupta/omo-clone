import type {
  FC,
  PropsWithChildren
} from 'react';
import { Container } from '@nextui-org/react';

import { Header } from '@/components/ui/Header';
import { AppRoute } from '@/common/constants';

export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header homeRoute={AppRoute.Dashboard}/>
      <Container as="main" fluid>
        {children}
      </Container>
    </>
  );
};
