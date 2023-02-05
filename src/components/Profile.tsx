import { useEffect, useState } from 'react';
import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

export const Profile = () => {
  const session = useSession()!;
  const supabase = useSupabaseClient();
  const user = useUser()!;
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    void getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      const { data, error, status } = await supabase.from('profiles').select(`username`).eq('id', user.id).single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setUsername(data.username);
      }
    } catch (error) {
      alert('Error loading user data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username }: any) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        username: username,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);
      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={username || ''} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <div>
        <button className="button primary block" onClick={() => void updateProfile({ username })} disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <button className="button block" onClick={() => void supabase.auth.signOut()}>
          Sign Out
        </button>
      </div>
    </div>
  );
};
