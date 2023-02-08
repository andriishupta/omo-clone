import Link from 'next/link';
import { Col, Container, Grid, Row, Spacer, Text } from '@nextui-org/react';

import {
  FiGithub,
  FiLinkedin,
  FiTwitter
} from 'react-icons/fi';
import { AppRoute, Socials } from '@/common/constants';

export const Footer = () => {
  return (
    <footer>
      <Grid.Container justify="center" css={{ background: '$primary', py: 32 }}>
        <Container lg display="flex">
          <Grid
            direction="column"
            xs={12}
            sm={5}
            css={{
              '@smMax': {
                alignItems: 'center',
              },
            }}
          >
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
          <Grid
            direction="column"
            xs={12}
            sm={3}
            css={{
              '@smMax': {
                alignItems: 'center',
              },
            }}
          >
            <Text h2 size={24} color="$white">
              Comparison
            </Text>
            <Link href={`${AppRoute.Blog}/omo-clone-vs-omo`}>
              <Text color="$white">OmoClone vs Omo</Text>
            </Link>
            <Link href={`${AppRoute.Blog}/omo-clone-vs-myfitnesspal`}>
              <Text color="$white">OmoClone vs MyFitnessPal</Text>
            </Link>
            <Link href={`${AppRoute.Blog}/omo-clone-vs-zero`}>
              <Text color="$white">OmoClone vs Zero</Text>
            </Link>
          </Grid>
          <Grid
            direction="column"
            xs={12}
            sm={3}
            css={{
              '@smMax': {
                alignItems: 'center',
              },
            }}
          >
            <Text h2 size={24} color="$white">
              Product
            </Text>
            <Link href={AppRoute.About}>
              <Text color="$white">About</Text>
            </Link>
            <Link href={AppRoute.AndriiTech}>
              <Text color="$white">AndriiTech</Text>
            </Link>
            <Link href={AppRoute.AndriiOps}>
              <Text color="$white">AndriiOps</Text>
            </Link>
          </Grid>
          <Grid
            direction="column"
            xs={12}
            sm={1}
            css={{
              '@smMax': {
                alignItems: 'center',
              },
            }}
          >
            <Spacer y={3} />
            <a href={Socials.Twitter} target="_blank" rel="noreferrer">
              <FiTwitter color="white" size={24} />
            </a>
            <a href={Socials.Github} target="_blank" rel="noreferrer">
              <FiGithub color="white" size={24} />
            </a>
          </Grid>
        </Container>
      </Grid.Container>
    </footer>
  );
};
