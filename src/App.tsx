import RootLayout from 'layouts/RootLayout';
import EmployeeManagement from 'pages/EmployeeManagement';
import GlobalSettings from 'pages/GlobalSettings';
import MyProfile from 'pages/MyProfile';
import MyReservations from 'pages/MyReservations';
import MyShifts from 'pages/MyShifts';
import ReservationManagement from 'pages/ReservationManagement';
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
      <Route path="appointment-page" element={<AppointmentPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="management" element={<Management />} />
      <Route path="management/my-profile" element={<MyProfile />} />
      <Route path="management/my-shifts" element={<MyShifts />} />
      <Route path="management/my-reservations" element={<MyReservations />} />
      <Route
        path="management/reservation-management"
        element={<ReservationManagement />}
      />
      <Route
        path="management/employee-management"
        element={<EmployeeManagement />}
      />
      <Route path="management/global-settings" element={<GlobalSettings />} />
    </Route>
  )
);

export const App = () => (
  <>
    <RouterProvider router={router} />
  </>
);
