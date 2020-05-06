// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'pma1ta2ihk'
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'dev-8o8y6cnh.auth0.com',            // Auth0 domain
  clientId: 'c9dUs1D4ZwdO1cyeP2GRagPaqZBUJH4s',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}
