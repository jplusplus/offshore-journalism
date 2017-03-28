export const main = {
  template: require('./main.html'),
  controller() {
    this.intro = require('../../../data/page-intro.json');
    this.structure = require('../../../data/structure.json');
    this.categories = [
      {title: "Intro", slug: 'intro'},
      {title: "Case studies", slug: 'case-studies'},
      {title: "Solutions", slug: 'solutions'}
    ];
  }
};
