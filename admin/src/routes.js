import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Oder from './pages/Oder';
import Edit from './pages/Edit';
import DetailOrder from './sections/@dashboard/order/DetailOrder';

// ----------------------------------------------------------------------

export default function Router() {
  function RequireAuth({ children }) {
    if (localStorage.getItem('userInfo') === null) {
      return <Navigate to="/login" />;
    }
    return children;
  }
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <RequireAuth> <DashboardApp /></RequireAuth> },
        { path: 'products', element: <RequireAuth> <User /></RequireAuth> },
        { path: 'user', element: <RequireAuth><Products /></RequireAuth> },
        { path: 'oder', element: <RequireAuth><Oder /></RequireAuth> },
        { path: 'blog', element: <RequireAuth> <Blog /> </RequireAuth> },
        { path: 'products/:id', element: <RequireAuth> <Edit /></RequireAuth> },
        { path: 'oder/:id', element: <RequireAuth><DetailOrder /></RequireAuth> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
