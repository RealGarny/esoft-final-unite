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
import Userpage from "../components/pages/Userpage";
import NotFound from "../components/pages/NotFound";
import { CommunityProvider } from "../context/CommunityContext";
import CommunitySettings from "../components/pages/CommunitySettings";
import UserCommunityFeed from "../components/primitives/Feed/UserCommunityFeed";
import UserPostsFeed from "../components/primitives/Feed/UserPostsFeed";

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
          element: <Userpage/>,
          children: [
            {
              path: routes.rawUser(),
              element: <UserPostsFeed/>
            },
            {
              path: routes.rawUserCommunities(),
              element: <UserCommunityFeed/>
            }
          ]
        },
        {
            path: routes.communities(),
            element: <Communities/>
        },
        {
          path: routes.rawCommunity(),
          element: <CommunityProvider><Community/></CommunityProvider>,
        },
        {
          path: routes.rawCommunitySettings(),
          element: <CommunityProvider><CommunitySettings/></CommunityProvider>
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
      element: <NotFound pageUrl="test"/>
  }
])

export default router;