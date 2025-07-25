This is an Intern project to set up cypress end to end testing in a UI.

There are 3 ways I found to run: 
1. The dev tool with nmp run cypress:open (lets you use google dev tools like inspect which helps for creating tests -- can see html and css for the test selecting buttons, navs, etc., )
2. The terminal run with npx cypress run (if you make an account and link it to the project, you can use a record key to have better display in the cypress website)
3. Github actions Job (allows for parallelization, automatic canceling on test failure, automated test execution, seamless CI/CD integration, enhanced reporting and visibility, optimized teest exectuion, dependency management and caching, customizable workflows, etc.)

My code is janky but I got enough put together to do a proper test. Here are some hurtles that might be relevant if you are usign this code as a setup: 

Completed: 
1. The login page (and only the login page) uses shadow roots (means that elements in page have their own DOM) and this needs to be accessed in the test.
2. The console's IDs and Classes seem to be procedually generated. You can usually just use .contains("Agent").parent() if you do find like a child or parent attribute that has something unique you can latch onto.
3. Cypress is a little strict with cross-origin testing. If you are doing end to end testing using the UI, the login page and the hompe page are different origins. There is a built in cy.origin() feature but this has limited features. In the sample test I made for chatting with an agent, I used cy.intercept() to get POST methods and cy.task() for logging the results directly into a terminal, but these had to be configured to be out of the Page Obeject Model (POM) as they were were not compatable with the origin() feature.
4. If you are using envs with github actions, make sure to set your enviornment in the .yml file. For accessing emvs: you can do something similar to what I did in the yml file. It was bad convention to use lowercase but CYPRESS_username: ${{ secrets.USERNAME }} will access the github secret enviornmental variable you set for username, and the CYPRESS_ in from of it automatically loads it into cypress so you can call it with Cypress.env('username').
5. Cypress doesn't handle while loops well. I ended up using recursion for the inputs in utils as a workaround but this might not be ideal for other tests. 

Ongoing: 
1. Got a 403 when verifying accounts manually when setting them up through cypress.  
2. I tried automating email with mailslurp but it didn't go great. I was able to make a test that created a mailslurp account, use cypress to enter the credentials into the syllable sign in page, then wait to recieve the email, extract the http link from the email, then use cypress to visit it. For some reason this didn't work to authenticate the account and I ran out of free acounts before I could figure out a workaround. Might be related to problem 1. This will also cost $$ if you use more than 50 accounts per month. 
3. I needed to manually ignore some error messages like icons not loading properlly. I also ignored some other things that came up last second so I could present but If this gets used you should probably go to e2e.ts in support, disable the uncaughtLexception funciton, and do some debuging.
4. The homepage shifted a bit as I was making tests. Using cypress started putting me into dashboards after logging in, while doing it manually got put me to the agents page. I also had a temp workaround because I couldn't figure out getting the tests using the sidebar ui for navigating and a temp workaround for a new 204 post method occuring while testing agents. 

A good deal of these problems dissapear if you integrate cypress directly into the front end. It can be set up in next.js in the right version, and can do compent testing by directly accessing funcitonality. This would probably solve a lot of the origin issues too. A Page Object Model seems amazing for UI end to end testing, but if you use this there is something called cypress App Actions that would be ideal for directly interacting with the code. You could also probably just use funcions in a utils file too.

The main files are as follows: 
e2e: 
1. mailslurptest2.cy.js for a mostly configured mailslrup setup
2. pomTest for full functionality of creating a user, (you gotta manually verify it using the email you set in the env), ...
