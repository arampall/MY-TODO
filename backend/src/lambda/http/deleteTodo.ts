import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import {getUserId} from '../utils';
import {deleteTodo} from '../../businessLogic/todo';
import { createLogger } from '../../utils/logger'

const logger = createLogger('deleteTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const userId = getUserId(event);
  // TODO: Remove a TODO item by id
  logger.log('Removing Item with Id ', todoId);
  
  await deleteTodo(todoId, userId);
  
  logger.log('Deleted the TODO item with id ', todoId);

  return {
    statusCode: 200,
    headers:{
      'Access-Control-Allow-Origin': '*'
    },
    body: null
  }
}
