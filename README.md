# microservices-api
Simple GraphQL gateway for reviewing mails, creating new ones and sending them to receivers. 

Tech stack: GraphQL, MongoDB, RabbitMQ and MailJet. Separated to microservices.


### How to set up? 
1. Download this repository on your computer.
1. Replace all `[FILL_ME]` fields in the `ecosystem.config.js` file. This may require setting up MongoDB database, RabbitMQ and MailJet accounts.
2. Register and install PM2 globally ([ref](http://pm2.keymetrics.io/)).
4. Open Command Prompt / Terminal and go to the directory. 
5. Start the application by running `pm2 start ecosystem.config.js`.
6. You should be able to access the GraphQL API via `http://localhost:3000/graphql`.
