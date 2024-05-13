import { createBrowserRouter } from "react-router-dom";
import routes from "./routes";

const router = createBrowserRouter([
    {
        path:routes.main,
        children: [
            {
              path: routes.main,
              element: <h1>main</h1>
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