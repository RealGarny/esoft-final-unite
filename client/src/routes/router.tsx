import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import MainPage from "../components/pages/MainPage";
import MainLayout from "../components/layouts/MainLayout";
import SignInPage from "../components/pages/SignInPage";
import SignUpPage from "../components/pages/SignUpPage";
import Community from "../components/pages/Community";
import Settings from "../components/pages/Settings";
import Communities from "../components/pages/Communities";
import { ScrollRestoration } from "../utils/router";

const router = createBrowserRouter([
  {
    path:routes.main(),
    element: <>
    <MainLayout/>
    <ScrollRestoration/>
    </>,
    children: [
        {
          path: routes.main(),
          element: <MainPage/>
        },
        {
          path: routes.settings(),
          element: <Settings/>
        },
        {
          path: routes.rawUser(),
          element: <h1>user</h1>,
        },
        {
            path: routes.communities(),
            element: <Communities/>
        },
        {
          path: routes.rawCommunity(),
          element: <Community/>
        }
      ]
  },
  {
    path: routes.signIn(),
    element: <SignInPage/>
  },
  {
    path: routes.signUp(),
    element: <SignUpPage/>
  },
  {
      path:"*",
      element: <h1>404</h1>
  }
])

export default router;