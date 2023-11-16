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
  },
  {
    path: 'doctor-picker',
    element: <DoctorPicker />,
  },
  {
    path: 'appointment-page',
    element: <AppointmentPage />,
  },
  {
    path: 'management',
    element: <Management />,
  },
]);

export const App = () => (
  <>
    <RouterProvider router={router} />
  </>
);
