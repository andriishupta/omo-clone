import { Col, Container, Grid, Image, Row, Spacer, Text } from '@nextui-org/react';
import { toast } from 'react-toastify';

const Dashboard = () => {
  return (
    <Container sm>
      <Grid.Container gap={3}>
        <Grid xs={12}>
          <Image
            css={{ cursor: 'pointer' }}
            width="256px"
            height="500px"
            src="/eating-time-omo.png"
            alt="Eating time"
            objectFit="contain"
            onClick={() => toast('Please, provide OmoAPI for full integration', { type: 'warning' })}
          />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default Dashboard;
