import { useAppContext } from 'context/AppContext';
import RootLayout from 'layouts/RootLayout';
import EmployeeManagement from 'pages/EmployeeManagement';
import GlobalSettings from 'pages/GlobalSettings';
import MyProfile from 'pages/MyProfile';
import MyReservations from 'pages/MyReservations';
import MyShifts from 'pages/MyShifts';
import ReservationManagement from 'pages/ReservationManagement';
import { useEffect } from 'react';
import {
  Navigate,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import AppointmentPage from './pages/AppointmentPage';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Management from './pages/Management';
import { startRefreshing } from 'security/AuthService';
import ShiftManagement from 'pages/ShiftManagement';
export const App = () => {
  const { isLoggedIn, setIsLoggedIn, timerSet, setTimerSet } = useAppContext();

  if (isLoggedIn && (timerSet == false || timerSet == null)) {
    startRefreshing(setIsLoggedIn);
    setTimerSet(true);
  }

  const router = createBrowserRouter(
		createRoutesFromElements(
			<Route
				path='/'
				element={<RootLayout />}
				errorElement={<ErrorPage />}>
				<Route
					index
					element={<HomePage />}
				/>
				<Route
					path='appointment-page'
					element={<AppointmentPage />}
				/>
				<Route
					path='login'
					element={<LoginPage />}
				/>

				<Route
					path='management'
					element={
						isLoggedIn ? (
							<Management />
						) : (
							<Navigate
								to='/login'
								replace
							/>
						)
					}
				/>
				<Route
					path='management/my-profile'
					element={
						isLoggedIn ? (
							<MyProfile />
						) : (
							<Navigate
								to='/login'
								replace
							/>
						)
					}
				/>
				<Route
					path='management/my-shifts'
					element={
						isLoggedIn ? (
							<MyShifts />
						) : (
							<Navigate
								to='/login'
								replace
							/>
						)
					}
				/>
				<Route
					path='management/my-reservations'
					element={
						isLoggedIn ? (
							<MyReservations />
						) : (
							<Navigate
								to='/login'
								replace
							/>
						)
					}
				/>
				<Route
					path='management/reservation-management'
					element={
						isLoggedIn ? (
							<ReservationManagement />
						) : (
							<Navigate
								to='/login'
								replace
							/>
						)
					}
				/>
				<Route
					path='management/employee-management'
					element={
						isLoggedIn ? (
							<EmployeeManagement />
						) : (
							<Navigate
								to='/login'
								replace
							/>
						)
					}
				/>
				<Route
					path='management/shift-management'
					element={
						isLoggedIn ? (
							<ShiftManagement />
						) : (
							<Navigate
								to='/login'
								replace
							/>
						)
					}
				/>
				<Route
					path='management/global-settings'
					element={
						isLoggedIn ? (
							<GlobalSettings />
						) : (
							<Navigate
								to='/login'
								replace
							/>
						)
					}
				/>
			</Route>
		)
	);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
