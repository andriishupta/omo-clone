import {
  Button,
  Card,
  Container,
  Grid,
  Loading,
  Spacer,
  Table,
  Text
} from '@nextui-org/react';
import { FiEdit } from 'react-icons/fi';
import type {
  GetServerSideProps,
  NextPage
} from 'next';
import dynamic from 'next/dynamic';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { Database } from '@/types/supabase';

import moment from 'moment';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { TRowType } from '@/types/helpers';

const Tracker = dynamic(() => import('../../components/Tracker').then((m) => m.Tracker), {
  loading: () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '256px', height: '256px' }}>
      <Loading type="points" color="currentColor" size="lg"/>
    </div>
  ),
  ssr: false,
});

type TActiveFast = Partial<TRowType<'active_fast'>>;
type TFast = Partial<TRowType<'fasts'>>;

const Dashboard: NextPage<{ activeFast: TActiveFast; fasts: TFast[] }> = ({ activeFast, fasts }) => {
  const [currentFast, setCurrentFast] = useState<TActiveFast | null>(activeFast);
  const [currentFasts, setCurrentFasts] = useState<TFast[] | []>(fasts);
  const supabaseClient = useSupabaseClient<Database>();

  const getFastingMinutes = (startTime: moment.Moment, endTime: moment.Moment) =>
    moment.duration(endTime.diff(startTime)).asMinutes();

  const handleStartFast = async () => {
    const { data, error } = await supabaseClient
      .from('active_fast')
      .insert({
        start: moment.utc().toISOString(),
      })
      .select('id,start')
      .single();

    if (error) {
      toast('Error with starting fast', { type: 'error' });
    } else {
      toast('Started the FAST!');
      setCurrentFast(data);
    }
  };

  const handleEndFast = async () => {
    const { data, error } = await supabaseClient
      .from('fasts')
      .insert({
        start: currentFast!.start as string,
        end: moment.utc().toISOString(),
      })
      .select('id,start,end')
      .order('id', { ascending: false });

    const { error: activeFastError } = await supabaseClient.from('active_fast').delete().eq('id', currentFast!.id);

    if (error || activeFastError) {
      toast('Error with ending fast', { type: 'error' });
    } else {
      toast('Ended the FAST!');
      setCurrentFast(null);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setCurrentFasts(data?.concat(currentFasts));
    }
  };

  return (
    <Container sm>
      <Grid.Container gap={3}>
        <Grid xs={12} justify="center">
          <Text h2>{currentFast ? 'You are fasting!' : "It's eating time"}</Text>
        </Grid>
        <Grid xs={12} justify="center">
          <Card css={{ width: '200px', background: '$omo300', cursor: 'not-allowed' }}>
            <Card.Body css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text color="$white">
                16:8 Fasting <FiEdit color="white"/>
              </Text>
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} justify="center">
          {currentFast ? (
            <Tracker fastingMinutes={getFastingMinutes(moment.utc(currentFast.start), moment.utc())}/>
          ) : (
            <Tracker fastingMinutes={0}/>
          )}
        </Grid>

        <Grid xs={12} justify="center">
          {currentFast ? (
            <Button auto onClick={handleEndFast}>
              End Fast
            </Button>
          ) : (
            <Button auto onClick={handleStartFast}>
              Start Fast
            </Button>
          )}
        </Grid>

        <Grid xs={12}>
          <Spacer y={1}/>
        </Grid>
        <Grid xs={12} direction="column" alignItems="center">
          <Text h3>Past Fasts</Text>
          {currentFasts?.length ? (
            <Table
              aria-label="Example table with static content"
              css={{
                height: 'auto',
                minWidth: '100%',
              }}
            >
              <Table.Header>
                <Table.Column>Start</Table.Column>
                <Table.Column>End</Table.Column>
                <Table.Column>Minutes</Table.Column>
              </Table.Header>
              <Table.Body>
                {currentFasts.map((fast) => (
                  <Table.Row key={fast.id}>
                    <Table.Cell>{moment.utc(fast.start).format()}</Table.Cell>
                    <Table.Cell>{moment.utc(fast.end).format()}</Table.Cell>
                    <Table.Cell>
                      ~ {Math.round(getFastingMinutes(moment.utc(fast.start), moment.utc(fast.end)))}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          ) : (
            <Text h4 color="$omo300">
              No completed fasts
            </Text>
          )}
        </Grid>
      </Grid.Container>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabaseServerClient = createServerSupabaseClient<Database>(ctx);
  const [{ data: activeFast, error: afE }, { data: fasts, error: fsE }] = await Promise.all([
    supabaseServerClient.from('active_fast').select('id,start'),
    supabaseServerClient.from('fasts').select('id,start,end').order('id', { ascending: false }),
  ]);

  if (afE || fsE) {
    throw new Error('ERROR_WITH_FAST_DATA');
  }

  return {
    props: {
      activeFast: activeFast?.length ? activeFast[ 0 ] : null,
      fasts,
    },
  };
};

export default Dashboard;
