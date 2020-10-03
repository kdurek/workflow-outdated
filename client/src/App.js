import React, { lazy, Suspense, useContext } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { FetchProvider } from "./context/FetchContext";
import { SnackbarProvider } from "./context/SnackbarContext";

import AppShell from "./AppShell";

import Login from "./pages/Login";
import FourOFour from "./pages/FourOFour";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const UserListAdmin = lazy(() => import("./pages/User/UserListAdmin"));
const UserForm = lazy(() => import("./pages/User/UserForm"));
const TonerList = lazy(() => import("./pages/Toner/TonerList"));
const TonerListAdmin = lazy(() => import("./pages/Toner/TonerListAdmin"));
const CmsHelper = lazy(() => import("./pages/Cms/CmsHelper"));

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function App() {
  const classes = useStyles();

  const LoadingFallback = () => (
    <AppShell>
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </AppShell>
  );

  const UnauthenticatedRoutes = () => (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>

      <Route path="*">
        <FourOFour />
      </Route>
    </Switch>
  );

  const AuthenticatedRoute = ({ children, ...rest }) => {
    const auth = useContext(AuthContext);
    return (
      <Route
        {...rest}
        render={() =>
          auth.isAuthenticated() ? (
            <AppShell>{children}</AppShell>
          ) : (
            <Redirect to="/login" />
          )
        }
      ></Route>
    );
  };

  const AdminRoute = ({ children, ...rest }) => {
    const auth = useContext(AuthContext);
    return (
      <Route
        {...rest}
        render={() =>
          auth.isAuthenticated() && auth.isAdmin() ? (
            <AppShell>{children}</AppShell>
          ) : (
            <Redirect to="/login" />
          )
        }
      ></Route>
    );
  };

  const AppRoutes = () => {
    const auth = useContext(AuthContext);

    return (
      <>
        <Suspense fallback={<LoadingFallback />}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return auth.isAuthenticated ? (
                  <Redirect to="/dashboard" />
                ) : (
                  <Redirect to="/login" />
                );
              }}
            ></Route>
            <AuthenticatedRoute path="/dashboard">
              <Dashboard />
            </AuthenticatedRoute>

            <AuthenticatedRoute path="/toners">
              <TonerList />
            </AuthenticatedRoute>

            <AuthenticatedRoute path="/tools/cmshelper">
              <CmsHelper />
            </AuthenticatedRoute>

            <AdminRoute path="/admin/users">
              <UserListAdmin />
            </AdminRoute>

            <AdminRoute path="/admin/users/create">
              <UserForm />
            </AdminRoute>

            <AdminRoute path="/admin/toners">
              <TonerListAdmin />
            </AdminRoute>

            <UnauthenticatedRoutes />
          </Switch>
        </Suspense>
      </>
    );
  };

  return (
    <Router>
      <SnackbarProvider>
        <AuthProvider>
          <FetchProvider>
            <AppRoutes />
          </FetchProvider>
        </AuthProvider>
      </SnackbarProvider>
    </Router>
  );
}

export default App;
