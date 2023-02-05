import {
  Button,
  Col,
  Container,
  Input,
  Loading,
  Row,
  Spacer,
  Text
} from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { Database } from '@/types/supabase';
import { toast } from 'react-toastify';
import type { TRowType } from '@/types/helpers';
import { UsernameRegexString } from '@/common/regex';
import type {
  GetServerSideProps,
  NextPage
} from 'next';
import { serverSideUserProfileExtractor } from '@/supabase/server-side-user-profile-extractor';

import _fromPairs from 'lodash.frompairs';
import _toPairs from 'lodash.topairs';
import _differenceWith from 'lodash.differencewith';
import _isEqual from 'lodash.isequal';

const SettingsFormScheme = z.object({
  username: z
    .string()
    .uuid()
    .or(z.string().min(4).max(36).regex(new RegExp(UsernameRegexString))),
  first_name: z.string().max(32).nullish(),
  last_name: z.string().max(32).nullish(),
});

const DashboardSettings: NextPage<{ profile: TRowType<'profiles'> }> = ({ profile }) => {
  const supabaseClient = useSupabaseClient<Database>();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm({
    // todo add errors message
    defaultValues: {
      username: profile.username,
      first_name: profile.first_name,
      last_name: profile.last_name,
    },
    resolver: zodResolver(SettingsFormScheme),
  });

  const onSubmit = async (data: Partial<TRowType<'profiles'>>) => {
    const { id, created_at, updated_at, ...initialProfileValues } = profile;
    const changed = _fromPairs(_differenceWith(_toPairs(data), _toPairs(initialProfileValues), _isEqual));

    const { error } = await supabaseClient.from('profiles').update(changed).eq('id', profile?.id);

    if (error) {
      toast('Error while saving profile', { type: 'error' });
      reset(initialProfileValues);
    } else {
      toast('Profile has been updated!');
    }
  };

  return (
    <>
      <Container sm justify="center" alignItems="center">
        <Row><Spacer y={2}/></Row>
        <Row justify="center"><Text h2>Account Settings</Text></Row>
        <Row><Spacer y={2}/></Row>
        <Row justify="center">
          <Col span={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset disabled={isSubmitting} style={{ border: 'none', margin: 0, padding: 0 }}>
                <Row>
                  <Input label="Username" {...register('username')} />
                </Row>
                <Spacer y={1}/>
                <Row>
                  <Input clearable css={{ marginRight: '$sm' }} label="First Name" {...register('first_name')} />
                  <Input clearable css={{ marginRight: '$sm' }} label="Last Name" {...register('last_name')} />
                </Row>
                <Spacer y={1}/>
              </fieldset>

              <Row>
                <Button type="submit" disabled={!isDirty || isSubmitting}>
                  {isSubmitting ? <Loading type="points" color="currentColor" size="sm"/> : 'Save'}
                </Button>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { user, profile } = await serverSideUserProfileExtractor(ctx);

  return {
    props: {
      user,
      profile,
    },
  };
};

export default DashboardSettings;
