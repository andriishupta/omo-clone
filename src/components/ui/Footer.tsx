import Link from 'next/link';
import { Col, Container, Grid, Row, Spacer, Text } from '@nextui-org/react';

import { FiLinkedin, FiTwitter } from 'react-icons/fi';
import { AppRoute, Socials } from '@/common/constants';

export const Footer = () => {
  return (
    <footer>
      <Grid.Container justify="center" css={{ background: '$primary', py: 32 }}>
        <Container lg display="flex">
          <Grid direction="column" justify="center" xs={12} sm={4}>
            <Text h1 size={32} color="$white">
              OmoClone
            </Text>
            <Text size={12} color="$white">
              Copyright 2023 &copy;
            </Text>
            <a href={Socials.Twitter} target="_blank" rel="noreferrer noopener">
              <Text color="pink">by Andrii Shupta</Text>
            </a>
          </Grid>
          <Grid justify="center" xs={12} sm={3}>
            <Container display="flex" direction="column">
              <Row>
                <Col>
                  <Text h2 size={24} color="$white">
                    Comparison
                  </Text>
                  <Link href={`${AppRoute.Blog}/omo-clone-vs-omo`}>
                    <Text color="$white">OmoClone vs Omo</Text>
                  </Link>
                  <Link href={`${AppRoute.Blog}/omo-clone-vs-myfitnesspal`}>
                    <Text color="$white">OmoClone vs MyFitnessPal</Text>
                  </Link>
                  <Link href={`${AppRoute.Blog}/omo-clone-vs-startups-fyi`}>
                    <Text color="$white">OmoClone vs Zero</Text>
                  </Link>
                </Col>
              </Row>
            </Container>
          </Grid>
          <Grid justify="center" xs={12} sm={2}>
            <Container display="flex" direction="column">
              <Row>
                <Col>
                  <Text h2 size={24} color="$white">
                    Product
                  </Text>
                  <Link href={AppRoute.Showcase}>
                    <Text color="$white">Showcase</Text>
                  </Link>
                </Col>
              </Row>
            </Container>
          </Grid>
          <Grid justify="center" xs={12} sm={2}>
            <Container display="flex" direction="column">
              <Row>
                <Col>
                  <Text h2 size={24} color="$white">
                    Resources
                  </Text>
                  <Link href={AppRoute.About}>
                    <Text color="$white">About</Text>
                  </Link>
                </Col>
              </Row>
            </Container>
          </Grid>
          <Grid justify="center" xs={12} sm={1}>
            <Container>
              <Row>
                <Col>
                  <Spacer y={3} />
                  <Row>
                    <a href={Socials.Twitter} target="_blank" rel="noreferrer">
                      <FiTwitter color="white" size={24} />
                    </a>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Grid>
        </Container>
      </Grid.Container>
    </footer>
  );
};
