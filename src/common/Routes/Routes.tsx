import React, { useMemo } from 'react';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { Auth } from '../../pages/Auth/Auth';
import { Analytic } from '../../pages/Analytic/Analytic';
import { PageLayout } from '../Layouts/PageLayout/PageLayout';
import { menuLinks } from '../../components/Menu/helper';
import { Link } from '../../components/Menu/MenuLinks/MenuLinks';
import { Shedule } from '../../pages/Shedule/Shedule';

type Props = {
  isAdmin?: boolean;
  authorized?: boolean;
};

export const Routes = (props: Props) => {
  const { isAdmin, authorized = false } = props;

  const location = useLocation();

  const error = useMemo(() => {
    return !menuLinks.find((link: Link) =>
      link.link.includes(location.pathname)
    );
  }, [location.pathname, location.search]);

  return (
    <Switch>
      <Route exact path="/auth">
        <Auth />
      </Route>
      <PageLayout error={error} isAdmin={isAdmin}>
        {menuLinks.map((link, index) =>
          link.link !== '/timetable' ? (
            <Route key={`Route-${index}`} strict exact path={link.link}>
              <Analytic />
            </Route>
          ) : null
        )}
        <Route path="/timetable" exact>
          <Shedule />
        </Route>
        <Route exact path="/">
          {!authorized ? <Redirect to="/auth" /> : <Redirect to="/analytic" />}
        </Route>
      </PageLayout>
    </Switch>
  );
};
