import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Company from "./pages/Company";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import About from "./pages/About";
import Error from "./pages/Error";
import Worker from "./pages/Worker";
import Team from "./pages/Team";
import AddTeam from "./pages/AddTeam";
import AddWorker from "./pages/AddWorker";
import UpdateWorker from "./pages/UpdateWorker";
import UpdateTeam from "./pages/UpdateTeam";
import UpdateCompany from "./pages/UpdateCompany";
import LoginLayout from "./components/LoginLayout";
import RegistrationLayout from "./components/RegistrationLayout";
import Layout from "./components/Layout";
import Settings from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
    children: [
      {
        path: "*",
        element: <Error />,
      },
      {
        path: "/about",
        element: <About />,
      },

      {
        path: "",
        element: <Company />,
      },
      {
        path: "updateCompany",
        element: <UpdateCompany />,
      },
      {
        path: "team/:teamId/worker/:workerId",
        element: <Worker />,
      },
      {
        path: "team/:teamId/worker/:workerId/updateWorker",
        element: <UpdateWorker />,
      },
      {
        path: "team/:teamId",
        element: <Team />,
      },
      {
        path: "team/:teamId/updateTeam",
        element: <UpdateTeam />,
      },
      {
        path: "team/:teamId/addWorker",
        element: <AddWorker />,
      },
      {
        path: "addTeam",
        element: <AddTeam />,
      },
      {
        path: "addTeam",
        element: <AddTeam />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/registration",
    element: (
      <RegistrationLayout>
        <SignUp />
      </RegistrationLayout>
    ),
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <LoginLayout>
        <SignIn />
      </LoginLayout>
    ),
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
  },
  {
    path: "/lending",
    element: <About />,
    errorElement: (
      <Layout>
        <Error />
      </Layout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
