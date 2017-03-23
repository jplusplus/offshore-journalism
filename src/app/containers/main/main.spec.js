import angular from 'angular';
import 'angular-mocks';
import {main} from './main';

describe('main component', () => {
  beforeEach(() => {
    angular
      .module('fountainMain', [])
      .component('fountainMain', main);
    angular.mock.module('fountainMain');
  });
});
