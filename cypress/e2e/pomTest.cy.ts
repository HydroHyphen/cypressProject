import loginPage from '../pages/loginPage'
import signupPage from '../pages/signupPage'
import { readPosts } from '../support/utils'

const username: string = Cypress.env('username')
const password: string = Cypress.env('password')
const originUrl: string = Cypress.env('url')
const agentName: string = Cypress.env('agent')
// const agentName = "Test2"

describe('Page Object Model Test', () => {
  it('passes', () => {
    signupPage.signup(username, password)
    cy.wait(60000) // 1 min to accept verification email 
    loginPage.login(username, password)

    cy.origin(originUrl, { args: { agentName } }, ({ agentName }) => {
      const { homePage } = Cypress.require('../pages/homePage')
      const HomePage = new homePage()

      HomePage.navigateToAgents()
      HomePage.createAgent(agentName)
    })

    // Workaround because cy.intercept isn't supported in cy.origin
    readPosts(originUrl, agentName)
    
    cy.origin(originUrl, { args: { agentName } }, ({ agentName }) => {
      const { homePage } = Cypress.require('../pages/homePage')
      const HomePage = new homePage()

      HomePage.testAgent(agentName)
      HomePage.logout()
    })


  })
})

//For normal use:
// nmp run cypress open
//For terminal use:
// npx cypress run --spec "cypress/e2e/pomTest.cy.ts" --env username='...',password='...'   

// Current Bugs:
// On rare occasions input will assert a 301 instead of a 200

//Possible fixes:
// looks like 301 is moving to another url -- might just be able to ignore

// Minor problems:
// found out that the function for feeding a url into intercept wasn't working but intercept worked regardless
// printing to the terminal is janky from outside the test file -- could feed inputs into an array or just read the final post for each chat seperately 
// mailslurp is still only like 95% set up -- ran out of free accounts to test on and not sure if It is important enough to use another account to finalize
// navigateToAgents just takes you out of dashboards if you start there because clicking on the sidebar wasn't working

// Todo:
// Fix bugs
// Start implementing CI using git actions 