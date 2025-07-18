import { logIn, startSession, logOut } from '../support/utils'

describe('template spec', () => {
  it('passes', () => {

    const username = Cypress.env('username')
    const password = Cypress.env('password')
    const originUrl = Cypress.env('url')
    const agentName = Cypress.env('agent')

    logIn(username, password)

    startSession(originUrl, agentName)

    logOut(originUrl)

  })
})

