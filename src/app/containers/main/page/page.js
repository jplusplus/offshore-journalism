export const mainPage = {
  template: require('./page.html'),
  bindings: {
    page: '<'
  },
  /** @ngInject */
  controller($document, $scope) {
    // Disabled scroll on body
    $document.find('body').addClass('--in-view');
    // Restore initial body state
    $scope.$on('$destroy', () => $document.find('body').removeClass('--in-view'));

    this.$onInit = () => {
      // Simplified category
      this.category = this.page.category.split(' ').join('-').toLowerCase();
    };
  }
};
