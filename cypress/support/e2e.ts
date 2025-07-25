// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-mailslurp';


Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('getTheme is not a function') || err.message.includes('419') || err.message.includes("Failed to set the 'adoptedStyleSheets'") || err.message.includes('Cannot read properties of null')) {
    return false;
  }
});

Cypress.on('fail', (error,runnable) => {
  cy.screenshot()
  throw error
})