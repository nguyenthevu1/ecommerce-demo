// routes

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';


// ----------------------------------------------------------------------

export default function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '';

    if (!user || !user.isAdmin) {
      navigate('/login');
    }
  }, []);

  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </ThemeProvider>
  );
}
