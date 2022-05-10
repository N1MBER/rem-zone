import React, { useMemo, Suspense } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Auth } from '../../pages/Auth/Auth';
import { PageLayout } from '../Layouts/PageLayout/PageLayout';
import { UserType } from '../../types/user';
import { RootState } from '../../store/reducers';
import { SkeletonPage } from '../Skeleton/SkeletonPage/SkeletonPage';
import { AboutUs } from '../../pages/AboutUs/AboutUs';
import { useSelector } from 'react-redux';

const Analytic = React.lazy(() => import('../../pages/Analytic/Analytic'));
const Shedule = React.lazy(() => import('../../pages/Shedule/Shedule'));
const Clients = React.lazy(() => import('../../pages/Clients/Clients'));
const Worklogs = React.lazy(() => import('../../pages/Worklogs/Worklogs'));
const Positions = React.lazy(() => import('../../pages/Positions/Positions'));
const Groups = React.lazy(() => import('../../pages/Groups/Groups'));
const Favours = React.lazy(() => import('../../pages/Favours/Favours'));
const Staff = React.lazy(() => import('../../pages/Staff/Staff'));
const Auto = React.lazy(() => import('../../pages/Auto/Auto'));
const Brand = React.lazy(() => import('../../pages/Brand/Brand'));
const Model = React.lazy(() => import('../../pages/Model/Model'));
const Balance = React.lazy(() => import('../../pages/Balance/Balance'));
const History = React.lazy(() => import('../../pages/History/History'));

type Props = {
  isAdmin?: boolean;
  authorized?: boolean;
};

type Path = {
  path: string;
  component: React.FC;
};

const paths = (userType?: UserType): Path[] => {
  if (userType !== 'master-executor') {
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
        path: '/clients',
        component: Clients,
      },
      {
        path: '/clients/balance',
        component: Balance,
      },
      {
        path: '/clients/history',
        component: History,
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
      {
        path: '/favours',
        component: Favours,
      },
      {
        path: '/auto',
        component: Auto,
      },
      {
        path: '/auto/brands',
        component: Brand,
      },
      {
        path: '/auto/models',
        component: Model,
      },
      {
        path: '/about_us',
        component: AboutUs,
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
    {
      path: '/auto',
      component: Auto,
    },
    {
      path: '/auto/brands',
      component: Brand,
    },
    {
      path: '/auto/models',
      component: Model,
    },
    {
      path: '/about_us',
      component: AboutUs,
    },
  ];
};

export const Routes = (props: Props) => {
  const { isAdmin, authorized = false } = props;

  const location = useLocation();
  const userType = useSelector((store: RootState) => store.user.userType);

  const error = useMemo(() => {
    return !paths(userType).find((route: Path) =>
      location.pathname.includes(route.path)
    );
  }, [location.pathname, location.search]);

  const renderRedirect = () => {
    if (location.pathname.includes('/auth') && authorized) {
      return (
        <Redirect
          to={userType === 'master-executor' ? '/timetable' : '/analytic'}
        />
      );
    }
    if (!authorized && location.pathname !== '/auth') {
      return <Redirect to="/auth" />;
    }
  };

  return (
    <Switch>
      <Route exact path="/auth">
        {authorized ? (
          <Redirect
            to={userType === 'master-executor' ? '/timetable' : '/analytic'}
          />
        ) : (
          <Auth />
        )}
      </Route>
      <PageLayout error={error} isAdmin={isAdmin}>
        {paths(userType).map((route, index) => {
          const Component = route.component;
          return (
            <Suspense key={`Route-${index}`} fallback={<SkeletonPage />}>
              <Route path={route.path} exact>
                <Component />
              </Route>
            </Suspense>
          );
        })}
        <Route strict path="/">
          {renderRedirect()}
        </Route>
      </PageLayout>
    </Switch>
  );
};
