// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'List product',
    path: '/dashboard/products',
    icon: getIcon('eva:shopping-bag-fill'),
  },

  {
    title: 'add product',
    path: '/dashboard/blog',
    icon: getIcon('eva:plus-circle-fill'),
  },
  {
    title: 'oder',
    path: '/dashboard/oder',
    icon: getIcon('eva:shopping-cart-fill'),
  },
  {
    title: 'login',
    path: '/login',
    icon: getIcon('eva:lock-fill'),
  },
];

export default navConfig;
