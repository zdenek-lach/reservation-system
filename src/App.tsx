import { RouterProvider } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import AppointmentPage from './components/calendar/AppointmentPage';
import ClinicPicker from './components/clinicPicker/ClinicPicker';
import DoctorPicker from './components/doctorPicker/DoctorPicker';
import ErrorPage from './components/generic/ErrorPage';
import HomePage from './components/generic/HomePage';
import Management from './components/management/Management';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'clinic-picker',
    element: <ClinicPicker />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'doctor-picker',
    element: <DoctorPicker />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'appointment-page',
    element: <AppointmentPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'management',
    element: <Management />,
    errorElement: <ErrorPage />,
  },
]);

export const App = () => (
  <>
    <RouterProvider router={router} />
  </>
);
