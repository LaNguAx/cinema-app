import { createBrowserRouter } from 'react-router';
import AppLayout from '../ui/AppLayout';
import Home from '../ui/pages/Home';
import About from '../ui/components/About';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
    ],
  },
]);
