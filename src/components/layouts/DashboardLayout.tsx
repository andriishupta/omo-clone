import type { FC, PropsWithChildren } from 'react';
import { Col, Container, Row } from '@nextui-org/react';

import { Header } from '@/components/ui/Header';

export const DashboardLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <Container fluid css={{ height: 'calc(100vh - 76px)', padding: 0 }}>
        <Row gap={3} css={{ height: '100%', marginLeft: 0 }}>
          <Col>
            <Container as="main" display="flex" direction="column" css={{ overflowY: 'scroll' }}>
              {children}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};
