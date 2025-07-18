//had trouble getting this to work with ts

const apiKey = Cypress.env('MAILSLURP_API_KEY')

describe('mailslurpTest', () => {
  beforeEach(() => {
    cy.mailslurp({
      apiKey 
    }).then(mailslurp => mailslurp.createInbox()).then(inbox => {
      cy.wrap(inbox.id).as('inboxId')
      cy.wrap(inbox.emailAddress).as('emailAddress')
    })
  })

  it('passes', function() {
    const currentDate = new Date();
    const betterDate = currentDate.toString().substring(4,15).replaceAll(" ", "-")
    const password = "__TestAccount__!101010"
    const link = ''
    // const email = "baingriffin+staging2.0"+betterDate+"@gmail.com"
    cy.visit('/')    
    cy.get('ak-flow-executor').shadow().find('ak-stage-identification').shadow().find('a').contains('Sign up').click()
    cy.get('ak-flow-executor').shadow().find('ak-stage-prompt').shadow().find('input[type="email"]').type(this.emailAddress)
    cy.get('ak-flow-executor').shadow().find('ak-stage-prompt').shadow().find('input[name="password"]').type(password)
    cy.get('ak-flow-executor').shadow().find('ak-stage-prompt').shadow().find('input[name="password_repeat"]').type(password)
    cy.get('ak-flow-executor').shadow().find('ak-stage-prompt').shadow().find('button[type="submit"]').click()
    
    cy.mailslurp({
      apiKey
    }).then(function(mailslurp){
      return mailslurp.waitForLatestEmail(this.inboxId,120_000,true)
    }).then(email => {
      const emailHTML = email.body
      const regexLink = /<a[^>]+href=["'](.*?)["'][^>]*>/
      const match = emailHTML.match(regexLink)
      link = match[1]
      cy.log(link)
      cy.visit(link)
    })
    // cy.visit('/')
    // cy.get('ak-flow-executor').shadow().find("ak-stage-identification").shadow().find("ak-form-element").find("input").type(this.emailAddress)
    // cy.get('ak-flow-executor').shadow().find("ak-stage-identification").shadow().find('button[type="submit"]').click()
    // cy.get('ak-flow-executor').shadow().find("ak-stage-password").shadow().find('#ak-stage-password-input').type(password)
    // cy.get('ak-flow-executor').shadow().find("ak-stage-password").shadow().find('button[type="submit"]').click()
    // cy.url().should('eq', '')

  })
})