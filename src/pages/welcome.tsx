import {
  Button,
  Card,
  Col,
  Container,
  Grid,
  Image,
  Input,
  Loading,
  Radio,
  Row,
  Spacer,
  Text
} from '@nextui-org/react';
import { useState } from 'react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import {
  GetServerSideProps,
  NextPage
} from 'next';
import {
  FiLock,
  FiMail
} from 'react-icons/fi';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/router';
import { AppRoute } from '@/common/constants';
import { toast } from 'react-toastify';

enum ActiveStep {
  Initial = 'initial',
  ProductSelect = 'product-select',
  Goal = 'goal',
  Final = 'final',
}

const Steps = {
  [ ActiveStep.Initial ]: InitialStep,
  [ ActiveStep.ProductSelect ]: ProductSelectStep,
  [ ActiveStep.Goal ]: GoalStep,
  [ ActiveStep.Final ]: FinalStep,
};

type NextStepFn = (step: ActiveStep) => void;

const Welcome: NextPage<{ completed: boolean }> = ({ completed }) => {
  const [activeStep, setActiveStep] = useState(ActiveStep.Initial);
  const StepComponent = Steps[ activeStep ];

  if (completed) {
    return (
      <Container sm display="flex" justify="center" alignItems="center" css={{ height: 'calc(100vh - 76px)' }}>
        <Row justify="center">
          <Text h2> All set 😉</Text>
        </Row>
      </Container>
    );
  }

  return (
    <>
      <Container sm display="flex" justify="center" alignItems="center" css={{ height: 'calc(100vh - 76px)' }}>
        <StepComponent setNextStep={setActiveStep}/>
      </Container>
    </>
  );
};

function InitialStep({ setNextStep }: { setNextStep: NextStepFn }) {
  return (
    <>
      <Row>
        <Col>
          <Row justify="center">
            <Text h2>300,000 users chosen us</Text>
          </Row>
          <Image width="50%" src="/people-use-omo.png" alt="People use Omo"/>
          <Spacer y={2}/>
          <Row justify="center">
            <Button auto rounded onClick={() => setNextStep(ActiveStep.ProductSelect)}>
              Continue
            </Button>
          </Row>
        </Col>
      </Row>
    </>
  );
}

function ProductSelectStep({ setNextStep }: { setNextStep: NextStepFn }) {
  return (
    <>
      <Text h2>Select your Product</Text>
      <Grid.Container>
        <Grid xs={12} sm={6}>
          <Card css={{ p: '$6', mw: '400px' }}>
            <Card.Header>
              <Image alt="Omo logo" src="/omo-logo.webp" width="34px" height="34px"/>
              <Grid.Container css={{ pl: '$6' }}>
                <Grid xs={4}>
                  <Text h4 css={{ lineHeight: '$xs' }}>
                    Omo Fasting
                  </Text>
                </Grid>
                <Grid xs={4}>
                  <Spacer y={1}/>
                </Grid>
                <Grid xs={4}>
                  <Radio.Group defaultValue="omo-fasting">
                    <Radio value="omo-fasting"/>
                  </Radio.Group>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: '$2' }}>
              <Text>Keep your fasting and eating windows under control using the fasting tracker</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={6}>
          <Card css={{ p: '$6', mw: '400px' }}>
            <Card.Header>
              <Image alt="Omo logo" src="/omo-logo.webp" width="34px" height="34px"/>
              <Grid.Container css={{ pl: '$6' }}>
                <Grid xs={4}>
                  <Text h4 css={{ lineHeight: '$xs' }}>
                    Other products
                  </Text>
                </Grid>
                <Grid xs={4}>
                  <Spacer y={1}/>
                </Grid>
                <Grid xs={4}>
                  <Radio.Group>
                    <Radio isDisabled value="omo-fasting"/>
                  </Radio.Group>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: '$2' }}>
              <Text>Coming soon...</Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
      <Row justify="center">
        <Button auto rounded onClick={() => setNextStep(ActiveStep.Goal)}>
          Continue
        </Button>
      </Row>
    </>
  );
}

function GoalStep({ setNextStep }: { setNextStep: NextStepFn }) {
  const [goal, setGoal] = useState('');
  return (
    <>
      <Text h2>Weight Goal?</Text>
      <Grid.Container>
        <Grid xs={12} sm={6}>
          <Card css={{ p: '$6', mw: '400px' }}>
            <Card.Header>
              <Grid.Container css={{ pl: '$6' }}>
                <Grid xs={4}>
                  <Text h4 css={{ lineHeight: '$xs' }}>
                    Loose 👇
                  </Text>
                </Grid>
                <Grid xs={4}>
                  <Spacer y={1}/>
                </Grid>
                <Grid xs={4}>
                  <Radio.Group value={goal} onChange={setGoal}>
                    <Radio value="loose"/>
                  </Radio.Group>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: '$2' }}>
              <Text>Keep your fasting and eating windows under control using the fasting tracker</Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} sm={6}>
          <Card css={{ p: '$6', mw: '400px' }}>
            <Card.Header>
              <Grid.Container css={{ pl: '$6' }}>
                <Grid xs={4}>
                  <Text h4 css={{ lineHeight: '$xs' }}>
                    Maintain 🤝
                  </Text>
                </Grid>
                <Grid xs={4}>
                  <Spacer y={1}/>
                </Grid>
                <Grid xs={4}>
                  <Radio.Group value={goal} onChange={setGoal}>
                    <Radio value="maintain"/>
                  </Radio.Group>
                </Grid>
              </Grid.Container>
            </Card.Header>
            <Card.Body css={{ py: '$2' }}>
              <Text>
                With the weight-loss app, you can save your favorite meals, making it easier to track the same meal each
                time you have it
              </Text>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
      <Row justify="center">
        <Button auto rounded onClick={() => setNextStep(ActiveStep.Final)}>
          Continue
        </Button>
      </Row>
    </>
  );
}

const AuthFormScheme = z.object({
  email: z.string().min(1).email('Enter valid email'),
  password: z.string().min(6),
});

function FinalStep() {
  const supabase = useSupabaseClient<Database>();
  const router = useRouter();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(AuthFormScheme),
  });

  const onAuth = async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      toast(<Text>{error.message}</Text>, { type: 'error' });
    } else {
      await router.push(AppRoute.Dashboard);
    }
  };

  return (
    <>
      <Row justify="center" align="center">
        <form onSubmit={handleSubmit(onAuth)}>
          <Row justify="center" css={{ mb: '$sm' }}>
            <Text h2>Registration</Text>
          </Row>
          <Row css={{ mb: '$sm' }}>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
              contentLeft={<FiMail/>}
              {...register('email')}
            />
          </Row>
          <Row css={{ mb: '$sm' }}>
            <Input
              type="password"
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Password"
              contentLeft={<FiLock/>}
              {...register('password')}
            />
          </Row>

          <Row justify="flex-end">
            <Button type="submit" auto disabled={isSubmitting}>
              {isSubmitting ? (
                <Loading type="points" color="currentColor" size="sm"/>
              ) : (
                <Text color="$whiteH">Sign up</Text>
              )}
            </Button>
          </Row>
        </form>
      </Row>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabaseServerClient = createServerSupabaseClient<Database>(ctx);
  const { data, error } = await supabaseServerClient.auth.getSession();

  if (error) {
    throw new Error('ERROR_WITH_SESSION');
  }

  const completed = !!data.session?.user;

  return {
    props: {
      completed,
    },
  };
};

export default Welcome;
