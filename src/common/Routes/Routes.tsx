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

type Props = {
  isAdmin?: boolean;
  authorized?: boolean;
};

type Path = {
  path: string;
  component: React.FC;
};

const paths: Path[] = [
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

export const Routes = (props: Props) => {
  const { isAdmin, authorized = false } = props;

  const location = useLocation();

  const error = useMemo(() => {
    return !paths.find((route: Path) => location.pathname.includes(route.path));
  }, [location.pathname, location.search]);

  return (
    <Switch>
      <Route exact path="/auth">
        <Auth />
      </Route>
      <PageLayout error={error} isAdmin={isAdmin}>
        {paths.map((route, index) => {
          const Component = route.component;
          return (
            <Route path={route.path} key={`Route-${index}`} exact>
              <Component />
            </Route>
          );
        })}

        <Route exact path="/">
          {!authorized ? <Redirect to="/auth" /> : <Redirect to="/analytic" />}
        </Route>
      </PageLayout>
    </Switch>
  );
};
