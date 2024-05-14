import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";
import MainPage from "../components/pages/MainPage";
import MainLayout from "../components/layouts/MainLayout";

const router = createBrowserRouter([
    {
        path:routes.main,
        element: <MainLayout/>,
        children: [
            {
              path: routes.main,
              element: <MainPage/>
            },
            {
              path: routes.user,
              element: <h1>user</h1>,
            },
            {
                path: routes.communities,
                element: <h1>communities</h1>
            },
            {
              path: routes.community,
              element: <h1>specific community</h1>
            }
          ]
    },
    {
        path:"*",
        element: <h1>404</h1>
    }
])

export default router;