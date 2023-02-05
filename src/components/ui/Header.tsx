import Link from 'next/link';
import {
  Avatar,
  Button,
  Checkbox,
  Dropdown,
  Input,
  Loading,
  Modal,
  Navbar,
  Row,
  Text,
  Container,
  Link as UILink,
} from '@nextui-org/react';
import { Logo } from './Logo';
import { type FC, useState } from 'react';
import { FiLock, FiMail } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { AppRoute } from '@/common/constants';
import { User, useSessionContext, useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Database } from '@/types/supabase';

const menuItems = [
  {
    id: AppRoute.Showcase,
    value: AppRoute.Showcase,
    name: 'Showcase',
  },
  {
    id: AppRoute.About,
    value: AppRoute.About,
    name: 'About',
  },
];

export const Header = () => {
  const { route } = useRouter();
  const { isLoading } = useSessionContext();
  const user = useUser();

  const isActiveRoute = (routeLink: AppRoute) => route === routeLink;

  return (
    <Navbar disableShadow variant="sticky">
      <Navbar.Toggle showIn="xs">
        <Navbar.Collapse>
          {menuItems.map((menuItem) => (
            <Navbar.CollapseItem key={menuItem.id}>
              <UILink as={Link} href={menuItem.value} underline={isActiveRoute(menuItem.value)}>
                <Text>{menuItem.name}</Text>
              </UILink>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar.Toggle>

      <Navbar.Content hideIn="xs">
        <Navbar.Brand>
          <Link href={AppRoute.Home}>
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
            jc: 'space-between',
          },
        }}
      >
        {isLoading ? <Loading type="points" /> : user ? <UserDropdown user={user} /> : <NavbarAuth />}
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
  const closeModal = () => setVisible(false);

  const onAuth = ({ email, password }: { email: string; password: string }) => {
    return supabase.auth
      .signInWithPassword({
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        router.push(AppRoute.Dashboard);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        closeModal();
        reset();
      });
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

const UserDropdown: FC<{ user: User }> = ({ user }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();

  const handleMenuClick = (actionKey: TMenuActionKey) => {
    if ([AppRoute.Dashboard].includes(actionKey as AppRoute)) {
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
          <Dropdown.Item key={AppRoute.Dashboard}>Dashboard</Dropdown.Item>
          <Dropdown.Item key={AppRoute.DashboardSettings} withDivider>
            Settings
          </Dropdown.Item>
          <Dropdown.Item key="logout" withDivider color="error">
            Log Out
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
