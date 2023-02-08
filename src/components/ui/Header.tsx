import Link from 'next/link';
import { Avatar, Button, Dropdown, Input, Link as UILink, Loading, Modal, Navbar, Text } from '@nextui-org/react';
import { Logo } from './Logo';
import { type FC, useState } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { AppRoute } from '@/common/constants';
import type { User} from '@supabase/auth-helpers-react';
import { useSessionContext, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import type { Database } from '@/types/supabase';
import { toast } from 'react-toastify';

const menuItems = [
  {
    id: AppRoute.About,
    value: AppRoute.About,
    name: 'About',
  },
  {
    id: AppRoute.AndriiTech,
    value: AppRoute.AndriiTech,
    name: 'AndriiTech',
  },
  {
    id: AppRoute.AndriiOps,
    value: AppRoute.AndriiOps,
    name: 'AndriiOps',
  },
];

export const Header = ({ homeRoute }: { homeRoute: AppRoute }) => {
  const { route } = useRouter();
  const { isLoading } = useSessionContext();
  const user = useUser();

  const isActiveRoute = (routeLink: AppRoute) => route === routeLink;

  return (
    <Navbar disableShadow variant="sticky">
      <Navbar.Brand showIn="xs">
        <Navbar.Toggle aria-label="toggle navigation"/>
        <Navbar.Collapse>
          {menuItems.map((menuItem) => (
            <Navbar.CollapseItem key={menuItem.id}>
              <Link href={menuItem.value}>
                <Text>{menuItem.name}</Text>
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar.Brand>

      <Navbar.Content hideIn="xs">
        <Navbar.Brand>
          <Link href={homeRoute}>
            <Logo />
          </Link>
        </Navbar.Brand>

        {menuItems.map((menuItem) => (
          <Navbar.Link key={menuItem.id} as={Link} isActive={isActiveRoute(menuItem.value)} href={menuItem.value}>
            {menuItem.name}
          </Navbar.Link>
        ))}
      </Navbar.Content>
      <Navbar.Content
        css={{
          '@xsMax': {
            w: '100%',
            jc: 'flex-end',
          },
        }}
      >
        {isLoading ? (
          <Loading type="points" />
        ) : user ? (
          <UserDropdown user={user} homeRoute={homeRoute} />
        ) : (
          <NavbarAuth />
        )}
      </Navbar.Content>
    </Navbar>
  );
};

const AuthFormScheme = z.object({
  email: z.string().min(1).email('Enter valid email'),
  password: z.string().min(6),
});

const NavbarAuth = () => {
  const router = useRouter();
  const supabase = useSupabaseClient<Database>();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    // todo add errors message
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(AuthFormScheme),
  });

  const [visible, setVisible] = useState(false);
  const openModal = () => setVisible(true);
  const closeModal = () => {
    setVisible(false);
    reset()
  }

  const onAuth = async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast(<Text>{error.message}</Text>, { type: 'error' });
      closeModal()
    } else {
      await router.push(AppRoute.Dashboard);
    }
  };

  return (
    <>
      <Navbar.Link color="inherit" onClick={() => openModal()}>
        Sign In
      </Navbar.Link>
      <Navbar.Item>
        <Button auto rounded>
          <Link href={AppRoute.Welcome}>
            <Text color="$white">Get Started For Free!</Text>
          </Link>
        </Button>
      </Navbar.Item>

      <Modal closeButton blur aria-labelledby="Sign in/up" open={visible} onClose={closeModal}>
        <form onSubmit={handleSubmit(onAuth)}>
          <Modal.Header>
            <Text id="modal-title" size={18}>
              Sign in to{' '}
              <Text b size={18}>
                OmoClone
              </Text>
              <Text>
                <Logo />
              </Text>
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Input
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Email"
              contentLeft={<FiMail />}
              {...register('email')}
            />
            <Input
              type="password"
              clearable
              bordered
              fullWidth
              color="primary"
              size="lg"
              placeholder="Password"
              contentLeft={<FiLock />}
              {...register('password')}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button auto light onPress={closeModal}>
              Close
            </Button>
            <Button type="submit" auto disabled={isSubmitting}>
              {isSubmitting ? (
                <Loading type="points" color="currentColor" size="sm" />
              ) : (
                <Text color="$whiteH">Sign in</Text>
              )}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

type TMenuActionKey = AppRoute | 'theme' | 'logout';

const UserDropdown: FC<{ user: User; homeRoute: AppRoute }> = ({ user, homeRoute }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleMenuClick = (actionKey: TMenuActionKey) => {
    if ([AppRoute.Dashboard, AppRoute.DashboardSettings, AppRoute.Home].includes(actionKey as AppRoute)) {
      return router.push(actionKey);
    }

    if (actionKey === 'logout') {
      return supabase.auth.signOut().then(() => router.push(AppRoute.Home));
    }
  };

  return (
    <>
      <Dropdown placement="bottom-right">
        <Navbar.Item>
          <Dropdown.Trigger>
            <Avatar
              bordered
              as="button"
              color="primary"
              size="md"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </Dropdown.Trigger>
        </Navbar.Item>
        <Dropdown.Menu
          aria-label="User menu actions"
          color="secondary"
          onAction={(actionKey) => void handleMenuClick(actionKey as unknown as TMenuActionKey)}
        >
          <Dropdown.Item key="user">
            <Text b>{user.email}</Text>
          </Dropdown.Item>
          <Dropdown.Item withDivider key={homeRoute === AppRoute.Home ? AppRoute.Dashboard : AppRoute.Home}>
            {homeRoute === AppRoute.Home ? 'Dashboard' : 'Home'}
          </Dropdown.Item>
          <Dropdown.Item key={AppRoute.DashboardSettings}>Settings</Dropdown.Item>
          <Dropdown.Item key="logout" withDivider color="error">
            Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
