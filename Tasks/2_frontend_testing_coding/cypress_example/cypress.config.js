const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://www.aldi.hu/hu',
    supportFile: 'cypress/support/e2e.js',
  },
});
