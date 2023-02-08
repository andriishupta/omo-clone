import { Grid, Container, Text, Spacer, Image } from '@nextui-org/react';

const AndriiTech = () => {
  return (
    <Container sm>
      <Grid xs={12}>
        <Spacer y={2} />
      </Grid>
      <Grid.Container>
        <Grid xs={12} direction="column" justify="center">
          <Text h2>AndriiOps</Text>

          <Text h3>What?</Text>
          <Text>On this page, I would add examples of the Ops(both Tech and Non-tech) experience</Text>
          <Text>It represents my ability to do a different type of work that is not related to coding</Text>

          <Spacer y={1} />

          <Text h3>Some of the Ops tasks(both Tech and Non-tech) that I have completed</Text>
          <ul>
            <li>- Stripe API Webhooks + StepFunctions configuration</li>
            <li>- AWS Cognito basic Pools setup</li>
            <li>- Firebase Login with Providers</li>
            <li>- Azure B2B Active Directory</li>
            <li>- Nrwl NX monorepo with CI/CD: build/tests/e2e</li>
            <li>- Gitlab: full pipeline; job artifacts with node_modules cache; deploy coverage; plugins</li>
            <li>- SonarQube Cloud Setup</li>
            <li>- Jira: Filters, Boards and Charts: for project and convinience purposes</li>
            <li>
              - Jira / Project Management: Epic {'->'} Story {'->'} Task {'->'} Sub-tasks(DEV/QA/AQA/DB) and mixes of
              this approach
            </li>
            <li>- and others</li>
          </ul>

          <Spacer y={1} />

          <Text h3>My recent achievement</Text>
          <Text>
            Setting organization: Roles provisioning; Global config; Repo config for access; Auto reviewers, etc.
          </Text>
          <Text>
            I have created 2 new Github users(andriishupta1 & andriishupta2) for the organization to verify my ability
            to setup projects.
          </Text>

          <Text>
            <Text b>P.S.</Text> Use browser&apos;s zoom to read images. Image Previewer is in progress(😉).
          </Text>

          <Spacer y={1} />
          <Image width={480} src="/andrii-ops/1.png" alt="1" />

          <Spacer y={1} />
          <Image width={480} src="/andrii-ops/2.png" alt="2" />

          <Spacer y={1} />
          <Image width={480} src="/andrii-ops/3.png" alt="3" />

          <Spacer y={1} />
          <Image width={480} src="/andrii-ops/4.png" alt="4" />

          <Spacer y={1} />
          <Image width={480} src="/andrii-ops/5.png" alt="5" />

          <Spacer y={1} />
          <Image width={480} src="/andrii-ops/6.png" alt="6" />

          <Spacer y={1} />
          <Image width={480} src="/andrii-ops/7.png" alt="7" />

          <Spacer y={1} />
          <Image width={480} src="/andrii-ops/8.png" alt="8" />

          <Spacer y={1} />
          <Image width={480} src="/andrii-ops/9.png" alt="9" />

          <Spacer y={1} />
          <Image width={480} src="/andrii-ops/10.png" alt="10" />

          <Spacer y={1} />

          <Text h4>One disappointment - GitHub makes configurations too easy to work with.</Text>
          <Image width={480} src="/andrii-ops/easy.png" alt="Easy" />
        </Grid>

        <Grid xs={12}>
          <Spacer y={5} />
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export default AndriiTech;
