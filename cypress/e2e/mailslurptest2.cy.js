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
    // const currentDate = new Date();
    // const betterDate = currentDate.toString().substring(4,15).replaceAll(" ", "-")
    const password = "__TestAccount__#001"
    const link = ''
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
      const link = match[1]
      cy.log(link)
      // cy.visit(link)
    })
    // cy.visit('/')
    // cy.get('ak-flow-executor').shadow().find("ak-stage-identification").shadow().find("ak-form-element").find("input").type(this.emailAddress)
    // cy.get('ak-flow-executor').shadow().find("ak-stage-identification").shadow().find('button[type="submit"]').click()
    // cy.get('ak-flow-executor').shadow().find("ak-stage-password").shadow().find('#ak-stage-password-input').type(password)
    // cy.get('ak-flow-executor').shadow().find("ak-stage-password").shadow().find('button[type="submit"]').click()
    // cy.url().should('eq', '')

  })
})

      // https://auth.syllable.cloud/if/flow/syl-enroll-new/?next=%2Fapplication%2Fo%2Fauthorize%2F%3Fapproval_prompt%3Dforce%26client_id%3D3V5YBJ6wfQ3LsZ24QJdwAyBtxYIm2QClES3wQswd%26redirect_uri%3Dhttps%253A%252F%252Fstaging.syllable.cloud%252Foauth2%252Fcallback%26response_type%3Dcode%26scope%3Dopenid%2Bemail%2Bprofile%26state%3DgjkPwnJ-CbIp-ujHiSlGyCNWuJQnZgpa11J2JHvytq0%253A%252F&flow_token=8yHTYs2RyhXFJaTGPpgNXiKPbt4ARxo6RBxNw11UbbBn6yXzZFYyhhMVEfN0
      // https://auth.syllable.cloud/if/flow/syl-enroll-new/?next=%2Fapplication%2Fo%2Fauthorize%2F%3Fapproval_prompt%3Dforce%26client_id%3D3V5YBJ6wfQ3LsZ24QJdwAyBtxYIm2QClES3wQswd%26redirect_uri%3Dhttps%253A%252F%252Fstaging.syllable.cloud%252Foauth2%252Fcallback%26response_type%3Dcode%26scope%3Dopenid%2Bemail%2Bprofile%26state%3DgjkPwnJ-CbIp-ujHiSlGyCNWuJQnZgpa11J2JHvytq0%253A%252F&flow_token=8yHTYs2RyhXFJaTGPpgNXiKPbt4ARxo6RBxNw11UbbBn6yXzZFYyhhMVEfN0 -> 301: https://staging.syllable.cloud/%2520https:/auth.syllable.cloud/if/flow/syl-enroll-new/?next=%2Fapplication%2Fo%2Fauthorize%2F%3Fapproval_prompt%3Dforce%26client_id%3D3V5YBJ6wfQ3LsZ24QJdwAyBtxYIm2QClES3wQswd%26redirect_uri%3Dhttps%253A%252F%252Fstaging.syllable.cloud%252Foauth2%252Fcallback%26response_type%3Dcode%26scope%3Dopenid%2Bemail%2Bprofile%26state%3DgjkPwnJ-CbIp-ujHiSlGyCNWuJQnZgpa11J2JHvytq0%253A%252F&&flow_token=8yHTYs2RyhXFJaTGPpgNXiKPbt4ARxo6RBxNw11UbbBn6yXzZFYyhhMVEfN0 -> 302: https://auth.syllable.cloud/application/o/authorize/?approval_prompt=force&client_id=3V5YBJ6wfQ3LsZ24QJdwAyBtxYIm2QClES3wQswd&redirect_uri=https%3A%2F%2Fstaging.syllable.cloud%2Foauth2%2Fcallback&response_type=code&scope=openid+email+profile&state=9bApQ2lV2EQtrneff-llSQmhkXiu8uH2iSVdrevpfaI%3A%2F%252520https%3A%2Fauth.syllable.cloud%2Fif%2Fflow%2Fsyl-enroll-new%2F%3Fnext%3D%252Fapplication%252Fo%252Fauthorize%252F%253Fapproval_prompt%253Dforce%2526client_id%253D3V5YBJ6wfQ3LsZ24QJdwAyBtxYIm2QClES3wQswd%2526redirect_uri%253Dhttps%25253A%25252F%25252Fstaging.syllable.cloud%25252Foauth2%25252Fcallback%2526response_type%253Dcode%2526scope%253Dopenid%252Bemail%252Bprofile%2526state%253DgjkPwnJ-CbIp-ujHiSlGyCNWuJQnZgpa11J2JHvytq0%25253A%25252F%26amp%26flow_token%3D8yHTYs2RyhXFJaTGPpgNXiKPbt4ARxo6RBxNw11UbbBn6yXzZFYyhhMVEfN0 -> 302: https://auth.syllable.cloud/flows/-/default/authentication/?next=/application/o/authorize/%3Fapproval_prompt%3Dforce%26client_id%3D3V5YBJ6wfQ3LsZ24QJdwAyBtxYIm2QClES3wQswd%26redirect_uri%3Dhttps%253A%252F%252Fstaging.syllable.cloud%252Foauth2%252Fcallback%26response_type%3Dcode%26scope%3Dopenid%2Bemail%2Bprofile%26state%3D9bApQ2lV2EQtrneff-llSQmhkXiu8uH2iSVdrevpfaI%253A%252F%25252520https%253A%252Fauth.syllable.cloud%252Fif%252Fflow%252Fsyl-enroll-new%252F%253Fnext%253D%25252Fapplication%25252Fo%25252Fauthorize%25252F%25253Fapproval_prompt%25253Dforce%252526client_id%25253D3V5YBJ6wfQ3LsZ24QJdwAyBtxYIm2QClES3wQswd%252526redirect_uri%25253Dhttps%2525253A%2525252F%2525252Fstaging.syllable.cloud%2525252Foauth2%2525252Fcallback%252526response_type%25253Dcode%252526scope%25253Dopenid%25252Bemail%25252Bprofile%252526state%25253DgjkPwnJ-CbIp-ujHiSlGyCNWuJQnZgpa11J2JHvytq0%2525253A%2525252F%2526amp%2526flow_token%253D8yHTYs2RyhXFJaTGPpgNXiKPbt4ARxo6RBxNw11UbbBn6yXzZFYyhhMVEfN0 -> 302: https://auth.syllable.cloud/if/flow/syl-password-authenticate/?next=%2Fapplication%2Fo%2Fauthorize%2F%3Fapproval_prompt%3Dforce%26client_id%3D3V5YBJ6wfQ3LsZ24QJdwAyBtxYIm2QClES3wQswd%26redirect_uri%3Dhttps%253A%252F%252Fstaging.syllable.cloud%252Foauth2%252Fcallback%26response_type%3Dcode%26scope%3Dopenid%2Bemail%2Bprofile%26state%3D9bApQ2lV2EQtrneff-llSQmhkXiu8uH2iSVdrevpfaI%253A%252F%25252520https%253A%252Fauth.syllable.cloud%252Fif%252Fflow%252Fsyl-enroll-new%252F%253Fnext%253D%25252Fapplication%25252Fo%25252Fauthorize%25252F%25253Fapproval_prompt%25253Dforce%252526client_id%25253D3V5YBJ6wfQ3LsZ24QJdwAyBtxYIm2QClES3wQswd%252526redirect_uri%25253Dhttps%2525253A%2525252F%2525252Fstaging.syllable.cloud%2525252Foauth2%2525252Fcallback%252526response_type%25253Dcode%252526scope%25253Dopenid%25252Bemail%25252Bprofile%252526state%25253DgjkPwnJ-CbIp-ujHiSlGyCNWuJQnZgpa11J2JHvytq0%2525253A%2525252F%2526amp%2526flow_token%253D8yHTYs2RyhXFJaTGPpgNXiKPbt4ARxo6RBxNw11UbbBn6yXzZFYyhhMVEfN0

// 100% happens when it doesn't get authenticated so even though I am using the email link in cypress it doesn't authenticate it
