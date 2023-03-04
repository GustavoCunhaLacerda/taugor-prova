import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import AuthProvider from './contexts/AuthContext';

import './App.css';
import Test from "./pages/Test";
import Dashboard from "./pages/Dashboard";
import ProfileForm from "./pages/ProfileForm";
import DashboardProvider from "./contexts/DashboardContext";
import ProfileProvider from "./contexts/ProfileContext";
import Historic from "./pages/Historic";

const router = createBrowserRouter([
  {
    path: "*",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/profile",
    element: <ProfileForm />,
  },
  {
    path: "/historic/:id",
    element: <Historic />,
  }
]);

function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
        <ProfileProvider>
          <RouterProvider router={router} />
        </ProfileProvider>
      </DashboardProvider>
    </AuthProvider>
  );
}

export default App;
