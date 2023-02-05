import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';
import type { GetServerSidePropsContext } from 'next';
import type { TRowType } from '@/types/helpers';
import type { User } from '@supabase/auth-helpers-react';

export const serverSideUserProfileExtractor = async (
  ctx: GetServerSidePropsContext
): Promise<{ user: User; profile: TRowType<'profiles'> }> => {
  const supabaseServerClient = createServerSupabaseClient<Database>(ctx);
  const {
    data: { session },
    error: sessionError,
  } = await supabaseServerClient.auth.getSession();

  if (!session || sessionError) {
    throw new Error('Session error!');
  }

  const { data: profile, error: profileError } = await supabaseServerClient
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (!profile || profileError) {
    throw new Error('Profile error!');
  }

  return {
    user: session.user,
    profile,
  };
};
