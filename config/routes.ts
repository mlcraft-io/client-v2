export default [
  {
    path: "/",
    component: "./layouts/RootLayout",
    routes: [
      {
        path: "/callback",
        component: "./pages/Callback",
      },
      {
        path: "/auth",
        routes: [
          {
            path: "/auth/signup",
            component: "./pages/SignUp",
          },
          {
            path: "/auth/signin",
            component: "./pages/SignIn",
          },
          {
            path: "/auth/logout",
            component: "./pages/Logout",
          },
          {
            redirect: "/auth/signin",
          },
        ],
      },
      {
        path: "/models/:dataSourceId?/:branch?/:slug?",
        component: "./pages/Models",
      },
      {
        path: "/export/:dataSourceId",
        component: "./pages/ExportModels",
      },
      {
        path: "/docs/:versionId",
        component: "./pages/Docs",
      },
      {
        path: "/signals",
        component: "./layouts/SettingsLayout",
        routes: [
          {
            path: "/signals/alerts/:alertId?",
            component: "./pages/Alerts",
          },
          {
            path: "/signals/reports/:reportId?",
            component: "./pages/Reports",
          },
        ],
      },
      {
        path: "/settings",
        component: "./layouts/SettingsLayout",
        routes: [
          {
            path: "/",
            component: "./pages/Home",
          },
          {
            path: "/models",
            component: "./pages/Models",
          },
          {
            path: "/settings/teams/:slug?",
            component: "./pages/Teams",
          },
          {
            path: "/settings/sources/:slug?/:generate?",
            component: "./pages/DataSources",
          },
          {
            path: "/settings/members/:slug?",
            component: "./pages/Members",
          },
          {
            path: "/settings/sql-api/:editId?",
            component: "./pages/SqlApi",
          },
          {
            path: "/settings/access/:slug?",
            component: "./pages/RolesAndAccess",
          },
          {
            path: "/settings/info",
            component: "./pages/PersonalInfo",
          },
        ],
      },
      {
        path: "/",
        routes: [
          {
            path: "/",
            component: "./pages/Home",
          },
          {
            path: "/explore/:dataSourceId?/:explorationId?/:modalType?/:delivery?",
            component: "./pages/Explore",
          },
          {
            path: "/logs/query",
            component: "./pages/QueryLogs",
          },
          {
            path: "/logs/query/:id",
            component: "./pages/QueryDetailed",
          },
          {
            component: "./pages/404",
          },
        ],
      },
      {
        component: "./pages/404",
      },
    ],
  },
  {
    component: "./pages/404",
  },
];
