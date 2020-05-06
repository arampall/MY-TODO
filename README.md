
# ServiceEndpoint: 
  https://pma1ta2ihk.execute-api.us-east-1.amazonaws.com/dev

# REST Endpoints:
  [GET TODO](#gettodos) - https://pma1ta2ihk.execute-api.us-east-1.amazonaws.com/dev/todos   
  [CREATE TODO](#createtodo) - https://pma1ta2ihk.execute-api.us-east-1.amazonaws.com/dev/todos   
  [UPDATE TODO](#updatetodo) - https://pma1ta2ihk.execute-api.us-east-1.amazonaws.com/dev/todos/{todoId}   
  [DELETE TODO](#deletetodo) - https://pma1ta2ihk.execute-api.us-east-1.amazonaws.com/dev/todos/{todoId}   
  [GENERATE UPLOAD URL](#generateuploadurl) - https://pma1ta2ihk.execute-api.us-east-1.amazonaws.com/dev/todos/{todoId}/attachment

# Frontend
The config.ts needs to be updated accordingly. Here are the values for this application.

```ts
const apiId = 'pma1ta2ihk' API Gateway id
export const apiEndpoint = `https://${apiId}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: 'dev-8o8y6cnh.auth0.com',    // Domain from Auth0
  clientId: 'c9dUs1D4ZwdO1cyeP2GRagPaqZBUJH4s',  // Client id from an Auth0 application
  callbackUrl: 'http://localhost:3000/callback'
}
```

# Functionality of the application

This application will allow creating/removing/updating/fetching TODO items. Each TODO item can optionally have an attachment image. Each user only has access to TODO items that he/she has created.

# TODO items

The application should store TODO items, and each TODO item contains the following fields:

* `userId` (string) - a unique id for a registered user. 
* `todoId` (string) - a unique id for an item
* `createdAt` (string) - date and time when an item was created
* `name` (string) - name of a TODO item (e.g. "Change a light bulb")
* `dueDate` (string) - date and time by which an item should be completed
* `done` (boolean) - true if an item was completed, false otherwise
* `attachmentUrl` (string) (optional) - a URL pointing to an image attached to a TODO item



# Functions to be implemented

To implement this project, you need to implement the following functions and configure them in the `serverless.yml` file:

### Auth
A custom authorizer for API Gateway that validates all other functions.

### GetTodos
Returns all TODOs for a current user. A user id can be extracted from a JWT token that is sent by the frontend

The response date format looks like this:

```json
{
  "items": [
    {
      "userId": "111",
      "todoId": "123",
      "createdAt": "2019-07-27T20:01:45.424Z",
      "name": "Buy milk",
      "dueDate": "2019-07-29T20:01:45.424Z",
      "done": false,
      "attachmentUrl": "http://example.com/image.png"
    },
    {
      "userId": "222",
      "todoId": "456",
      "createdAt": "2019-07-27T20:01:45.424Z",
      "name": "Send a letter",
      "dueDate": "2019-07-29T20:01:45.424Z",
      "done": true,
      "attachmentUrl": "http://example.com/image.png"
    },
  ]
}
```

### CreateTodo
Creates a new TODO for a current user. A shape of data send by a client application to this function can be found in the `CreateTodoRequest.ts` file

It receives a new TODO item to be created in JSON format that looks like this:

```json
{
  "name": "Buy milk",
  "dueDate": "2019-07-29T20:01:45.424Z"
}
```

The response after creation of new TODO item looks like this:

```json
{
  "item": {
    "userId": "111",
    "todoId": "123",
    "createdAt": "2019-07-27T20:01:45.424Z",
    "name": "Buy milk",
    "dueDate": "2019-07-29T20:01:45.424Z",
    "done": false,
    "attachmentUrl": "http://example.com/image.png"
  }
}
```

### UpdateTodo 
Updates a TODO item created by a current user. A shape of data send by a client application to this function can be found in the `UpdateTodoRequest.ts` file

It receives an object that contains three fields that can be updated in a TODO item:

```json
{
  "name": "Buy bread",
  "dueDate": "2019-07-29T20:01:45.424Z",
  "done": true
}
```

The id of an item that should be updated is passed as a URL parameter.


### DeleteTodo 
Deletes a TODO item created by a current user. Expects an id of a TODO item to remove. It returns an empty response.



### GenerateUploadUrl 
Returns a pre-signed URL that can be used to upload an attachment file for a TODO item.

It returns a JSON object that looks like this:

```json
{
  "uploadUrl": "https://s3-bucket-name.s3.eu-west-2.amazonaws.com/image.png"
}
```

All functions are already connected to appropriate events from API Gateway.

An id of a user can be extracted from a JWT token passed by a client.

