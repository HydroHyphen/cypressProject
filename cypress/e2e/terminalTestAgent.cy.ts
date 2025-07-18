describe('template spec', () => {
  it('passes', () => {

    const username = Cypress.env('username')
    const password = Cypress.env('password')
    const originUrl = Cypress.env('url')
    const agentName = Cypress.env('agent')

    //Log in:
    cy.visit('/')
    cy.get('ak-flow-executor').shadow().find("ak-stage-identification").shadow().find("ak-form-element").find("input").type(username)
    cy.get('ak-flow-executor').shadow().find("ak-stage-identification").shadow().find('button[type="submit"]').click()
    cy.get('ak-flow-executor').shadow().find("ak-stage-password").shadow().find('#ak-stage-password-input').type(password)
    cy.get('ak-flow-executor').shadow().find("ak-stage-password").shadow().find('button[type="submit"]').click()
    cy.url().should('eq', '')


    //Go to agent: 
    let agentUrl = ""
    cy.origin(originUrl, { args: { agentName } }, ({ agentName }) => {
      cy.get('p').contains(agentName).click()
      cy.url().then((url) => {
        agentUrl = url
      })
    })

    //Start Session:
    cy.intercept('POST', agentUrl).as('sessionPost')
    cy.origin(originUrl, () => {

      //Still figuring out a good way to get this working outside of cy.origin  
      function input(message: string) {     // for chatting with an agent: will input a message, waits for the post to complete, logs the input and output, then skips the followup 504 post 
        cy.get('body').then(($body) => {
          if($body.find('textarea[placeholder="Chat with agent..."]').length > 0){
            cy.get('textarea[placeholder="Chat with agent..."]').type(message+'{enter}')
            cy.wait('@sessionPost').then(intercept => {
              expect(intercept.response?.statusCode).to.eq(200)
              const message = intercept?.response?.body
              const message2 = message.substring(message.indexOf("1:") + 2)
              var bubble = JSON.parse(message2)
              cy.task('log', 'Input: '+bubble['text'])
              cy.task('log', 'Output: '+bubble['response']['content']['message'])
              // console.log('Input: '+bubble['text'])
              // console.log('Output: '+bubble['response']['content']['message'])
            }).wait('@sessionPost')
          }
          else{
            console.log('chat ended')
          }
        })
      }

      //Chat functionality
      cy.get('button').contains('Start session').click()
      cy.wait('@sessionPost').wait('@sessionPost').wait('@sessionPost').then(intercept => {     //this works but is pretty scuffed -- see if there are better alternitives then just calling the waits to iterate through
        expect(intercept.response?.statusCode).to.eq(200)
      })      
      input('hello')
      input('what is the weather like in LA right now?')
      input('thanks')
      input('hang up')
      input('hang up')

      //Log out
      // cy.get('button[role="button"][tabindex="0"]').click()
      // cy.get('h6').contains('Logout').click()
    })
  })
})
