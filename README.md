Made this in Next.js because I already had it set up for another project. 

From the files in e2e, pomTest is the main one. 

Everything else was from drafting functionality for specific tests.

That functionality was moved to utils.ts and then called as a function in testAgent.cy.

From there I was reccomended to look into a page object model, so I reworkek the functions into classes pertaining to specific pages.

Right now the funcitonality works for a specific test but If you want to do more and are using this code you need to do a bit of reworking. 

The main thing to know is that you can configure chats with agents in support > chats.st and import them in pages > homePage.ts. 

Make sure to make a cypress.env.json file for username, password, url, and test names. 