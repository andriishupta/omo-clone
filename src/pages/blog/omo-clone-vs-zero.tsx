import { Grid, Container, Text, Spacer } from '@nextui-org/react';

const OmoCloneVsZero = () => {
  return (
    <Container sm>
      <Grid xs={12}>
        <Spacer y={2} />
      </Grid>
      <Grid.Container>
        <Grid xs={12} direction="column" justify="center">
          <Text h2>OmoClone Vs Zero</Text>
          <Text h3>Add SEO and take traffic from Zero ;)</Text>

          <Text>
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.
            Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
            search for &apos;lorem ipsum&apos; will uncover many web sites still in their infancy. Various versions have
            evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </Text>
          <Spacer y={2} />
          <Text>
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.
            Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
            search for &apos;lorem ipsum&apos; will uncover many web sites still in their infancy. Various versions have
            evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </Text>

          <Spacer y={2} />

          <Text>
            It is a long established fact that a reader will be distracted by the readable content of a page when
            looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.
            Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
            search for &apos;lorem ipsum&apos; will uncover many web sites still in their infancy. Various versions have
            evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
          </Text>
        </Grid>

        <Grid xs={12}>
          <Spacer y={5} />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default OmoCloneVsZero;
