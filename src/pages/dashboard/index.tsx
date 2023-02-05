import { Card, Container, Grid, Text, Button, Spacer } from '@nextui-org/react';
import { FiEdit } from 'react-icons/fi';
import { NextPage } from 'next';

const Dashboard: NextPage<{ activeFast: string; fasts: string[] }> = ({ activeFast, fasts }) => {
  return (
    <Container sm>
      <Grid.Container gap={3}>
        <Grid xs={12} justify="center">
          <Text h2>{ activeFast ? 'You are fasting!' : 'It\'s eating time'}</Text>
        </Grid>
        <Grid xs={12} justify="center">
          <Card css={{ width: '200px', background: '$omo300', cursor: 'not-allowed' }}>
            <Card.Body css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text color="$white">
                16:8 Fasting <FiEdit color="white" />
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} justify="center">
          <Card css={{ width: '256px', height: '256px' }}>
            {activeFast ? (
              <Card.Body>Body</Card.Body>
            ) : (
              <Card.Body>Body</Card.Body>
            )}
          </Card>
        </Grid>

        <Grid xs={12} justify="center">
          {activeFast ? <Button auto>End Fast</Button> : <Button auto>Start Fast</Button>}
        </Grid>

        <Grid xs={12}>
          <Spacer y={1} />
        </Grid>
        <Grid xs={12} direction="column" alignItems="center">
          <Text h3>Past Fasts</Text>
          {fasts.length ? fasts.map((fast) => 'fast') : <Text h4 color="$omo300">No completed fasts</Text>}
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export const getServerSideProps = () => {
  return {
    props: {
      activeFast: '',
      fasts: [],
    },
  };
};

export default Dashboard;
