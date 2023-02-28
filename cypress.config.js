const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern : "cypress/e2e/Tests/*.js",
    defaultCommandTimeout: 15000,
    pageLoadTimeout: 60000,
    requestTimeout: 20000,
  },
});
