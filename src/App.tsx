import RootLayout from 'layouts/RootLayout';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import AppointmentPage from './pages/AppointmentPage';
import ClinicPicker from './pages/ClinicPicker';
import DoctorPicker from './pages/DoctorPicker';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import Management from './pages/Management';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path="doctor-picker" element={<DoctorPicker />} />
      <Route path="clinic-picker" element={<ClinicPicker />} />
      <Route path="appointment-page" element={<AppointmentPage />} />
      <Route path="management" element={<Management />} />
    </Route>
  )
);

export const App = () => (
  <>
    <RouterProvider router={router} />
  </>
);
