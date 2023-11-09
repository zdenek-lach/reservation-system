import Calendar from 'react-calendar';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import ClinicPicker from './components/ClinicPicker';
import DoctorPicker from './components/DoctorPicker';
import ErrorPage from './components/ErrorPage';
import HomePage from './components/HomePage';
import ReservationManager from './services/ReservationManager';

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
  {
    path: 'testReservationManager',
    element: <ReservationManager />,
  },
]);

export const App = () => (
  <>
    <RouterProvider router={router} />
  </>
);
