import RootLayout from 'layouts/RootLayout';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import AppointmentPage from './pages/AppointmentPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Management from './pages/Management';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      {/* <Route path="doctor-picker" element={<DoctorPicker />} />
      <Route path="clinic-picker" element={<ClinicPicker />} /> */}
      <Route path="appointment-page" element={<AppointmentPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="management" element={<Management />} />
      <Route path="my-profile" element={<Management />} />
      <Route path="my-shifts" element={<Management />} />
      <Route path="my-reservations" element={<Management />} />
      <Route path="reservation-management" element={<Management />} />
      <Route path="employee-management" element={<Management />} />
      <Route path="global-settings" element={<Management />} />
    </Route>
  )
);

export const App = () => (
  <>
    <RouterProvider router={router} />
  </>
);
