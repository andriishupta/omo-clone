import { Grid, Container, Text, Spacer } from '@nextui-org/react';

const About = () => {
  return (
    <Container sm>
      <Grid xs={12}>
        <Spacer y={2} />
      </Grid>
      <Grid.Container>
        <Grid xs={12} direction="column" justify="center">
          <Text h2>About</Text>

          <Text h3>Motivation</Text>
          <Text>
            My motivation is to show in this application my desire and dedication to work with Welltech on OMO.
          </Text>
          <Text>
            Only main functionality has been covered such as it is a Showcase MVP, so use correct email and valid
            password
          </Text>
          <Text>The Code is available by the link in the footer.</Text>

          <Spacer y={1} />

          <Text h3>Example User</Text>
          <Text>First user: &quot;user+1@omoclone.com&quot; - &quot;12345678&quot;</Text>
          <Text>Running timer: &quot;user+2@omoclone.com&quot; - &quot;12345678&quot;</Text>

          <Spacer y={1} />

          <Text h3>Tech Stack</Text>
          <ul>
            <li>- Next.js 12</li>
            <li>- NextUI</li>
            <li>- Supabase</li>
          </ul>

          <Spacer y={1} />

          <Text h3>Focus / Skipped</Text>
          <Text h4>Focus</Text>
          <ul>
            <li>- Working Deployed App</li>
            <li>- UI with OMO-look like</li>
            <li>- Simple Fasting Tracker</li>
          </ul>

          <Text h4>Skipped</Text>
          <ul>
            <li>- Fasting Tracker is really simple</li>
          </ul>
        </Grid>

        <Grid xs={12}>
          <Spacer y={5} />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default About;
