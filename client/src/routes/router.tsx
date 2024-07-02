import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import MainPage from "../components/pages/MainPage";
import MainLayout from "../components/layouts/MainLayout";
import SignInPage from "../components/pages/SignInPage";
import SignUpPage from "../components/pages/SignUpPage";
import Community from "../components/pages/Community";

const router = createBrowserRouter([
    {
        path:routes.main(),
        element: <MainLayout/>,
        children: [
            {
              path: routes.main(),
              element: <MainPage/>
            },
            {
              path: routes.rawUser(),
              element: <h1>user</h1>,
            },
            {
                path: routes.communities(),
                element: <h1>communities</h1>
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