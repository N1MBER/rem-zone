import React, { useMemo } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Auth } from '../../pages/Auth/Auth';
import { Analytic } from '../../pages/Analytic/Analytic';
import { PageLayout } from '../Layouts/PageLayout/PageLayout';
import { Shedule } from '../../pages/Shedule/Shedule';
import { Staff } from '../../pages/Staff/Staff';
import { Groups } from '../../pages/Groups/Groups';
import { Positions } from '../../pages/Positions/Positions';
import { Worklogs } from '../../pages/Worklogs/Worklogs';
import { Group } from '../../types/user';
import { RootState } from '../../store/reducers';
import { useSelector } from 'react-redux';

type Props = {
  isAdmin?: boolean;
  authorized?: boolean;
};

type Path = {
  path: string;
  component: React.FC;
};

const paths = (groups?: Group[], superUser?: boolean): Path[] => {
  if ((groups && groups.find((el) => el.id === 1)) || superUser) {
    return [
      {
        path: '/auth',
        component: Auth,
      },
      {
        path: '/analytic',
        component: Analytic,
      },
      {
        path: '/staff',
        component: Staff,
      },
      {
        path: '/timetable',
        component: Shedule,
      },
      {
        path: '/staff/groups',
        component: Groups,
      },
      {
        path: '/staff/positions',
        component: Positions,
      },
      {
        path: '/staff/worklogs',
        component: Worklogs,
      },
    ];
  }
  return [
    {
      path: '/auth',
      component: Auth,
    },
    {
      path: '/timetable',
      component: Shedule,
    },

    {
      path: '/staff/worklogs',
      component: Worklogs,
    },
  ];
};

export const Routes = (props: Props) => {
  const { isAdmin, authorized = false } = props;

  const location = useLocation();
  const user = useSelector((store: RootState) => store.user.profile);

  const error = useMemo(() => {
    return !paths(user?.groups, user?.is_superuser).find((route: Path) =>
      location.pathname.includes(route.path)
    );
  }, [location.pathname, location.search]);

  const renderRedirect = () => {
    if (location.pathname.includes('/auth') && authorized) {
      return <Redirect to="/analytic" />;
    }
    if (!authorized && location.pathname !== '/auth') {
      return <Redirect to="/auth" />;
    }
  };

  return (
    <Switch>
      <Route exact path="/auth">
        {authorized ? <Redirect to="/analytic" /> : <Auth />}
      </Route>
      <PageLayout error={error} isAdmin={isAdmin}>
        {paths(user?.groups, user?.is_superuser).map((route, index) => {
          const Component = route.component;
          return (
            <Route path={route.path} key={`Route-${index}`} exact>
              <Component />
            </Route>
          );
        })}
        <Route strict path="/">
          {renderRedirect()}
        </Route>
      </PageLayout>
    </Switch>
  );
};
