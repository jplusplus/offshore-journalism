// External modules
import 'babel-polyfill';
import angular from 'angular';
import 'angular-animate';
import 'angular-cookies';
import 'angular-bind-html-compile';
import 'angular-scroll';

import unsafeFilter from './app/components/unsafe/unsafe.filter';
import {main} from './app/containers/main/main';
import {mainPage} from './app/containers/main/page/page';
import 'angular-ui-router';
import routesConfig from './routes';

import './index.scss';

export const app = 'app';

angular
  .module(app, [
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'angular-bind-html-compile',
    'duScroll'
  ])
  .config(routesConfig)
  .filter('unsafe', unsafeFilter)
  .component('main', main)
  .component('mainPage', mainPage);
