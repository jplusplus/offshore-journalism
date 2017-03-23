export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(false).hashPrefix('');
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      component: 'main'
    })
    .state('main.page', {
      url: ':uid',
      component: 'mainPage',
      resolve: {
        /** @ngInject */
        page: ($http, $stateParams) => {
          return $http.get(`./data/page-${$stateParams.uid}.json`).then(res => res.data);
        }
      }
    });
}
