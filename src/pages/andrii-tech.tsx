import { Grid, Container, Text, Spacer, Image } from '@nextui-org/react';

const AndriiTech = () => {
  return (
    <Container sm>
      <Grid xs={12}>
        <Spacer y={2} />
      </Grid>
      <Grid.Container>
        <Grid xs={12} direction="column" justify="center">
          <Text h2>AndriiTech</Text>

          <Text h3>What?</Text>
          <Text>On this page I would add examples of My Product Development: Idea; UX Mocks; Flow, etc.</Text>
          <Text>
            These screens represent my ability to create and work on a product, care about features, and how I
            understand different aspects of Product Development.
          </Text>

          <Spacer y={1} />

          <Text h3>Idea</Text>
          <Image width={256} src="/andrii-tech/1.png" alt="Idea" />

          <Spacer y={1} />

          <Text h3>Architecture</Text>
          <Image width={256} src="/andrii-tech/2.png" alt="Architecture" />

          <Spacer y={1} />

          <Text h3>UX Mocks</Text>
          <Image width={256} src="/andrii-tech/3.png" alt="UX Mocks" />

          <Spacer y={1} />

          <Text h3>Flow</Text>
          <Image width={256} src="/andrii-tech/4.png" alt="Flow" />
        </Grid>

        <Grid xs={12}>
          <Spacer y={5} />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default AndriiTech;
