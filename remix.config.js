const { flatRoutes } = require('remix-flat-routes');
/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/*'],
  routes: async (defineRoutes) => {
    return flatRoutes('routes', defineRoutes, {
      basePath: '/', // optional base path (defaults to /)
      ignoredRouteFiles: [], // same as remix config})
    });
  },
  serverDependenciesToBundle: [/.*/],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
