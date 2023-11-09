import Calendar from 'react-calendar';
import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import ReservationManager from './ReservationManager';
import ClinicPicker from './components/UI/ClinicPicker';
import DoctorPicker from './components/UI/DoctorPicker';
import ErrorPage from './components/errorPage/ErrorPage';
import HomePage from './components/homePage/HomePage';
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
