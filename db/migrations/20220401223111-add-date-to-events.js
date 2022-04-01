'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Events', 'takesPlaceOn', { type: Sequelize.DATE });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Events', 'takesPlaceOn');
  }
};
