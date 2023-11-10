import Calendar from 'react-calendar';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import ClinicPicker from './components/ClinicPicker';
import DoctorPicker from './components/DoctorPicker';
import ErrorPage from './components/ErrorPage';
import HomePage from './components/HomePage';
import { Store } from './state/Store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'clinic-picker',
    element: <ClinicPicker />,
  },
  {
    path: 'doctor-picker',
    element: <DoctorPicker />,
  },
  {
    path: 'calendar',
    element: <Calendar />,
  },
]);

export const App = () => (
  <Provider store={Store}>
    <RouterProvider router={router} />
  </Provider>
);
