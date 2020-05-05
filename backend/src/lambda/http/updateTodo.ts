import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import {getUserId} from '../utils';
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import {updateTodo} from '../../businessLogic/todo'
import { createLogger } from '../../utils/logger'

const logger = createLogger('updateTodo')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId: string = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  const userId: string = getUserId(event);
  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  logger.info('Updating the TODO object');
  await updateTodo(updatedTodo, todoId, userId)
  
  return {
    statusCode: 200,
    headers:{
      'Access-Control-Allow-Origin': '*'
    },
    body:null
  }
}
