import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import {createTodo} from '../../businessLogic/todo'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { TodoItem } from '../../models/TodoItem';
import {getUserId} from '../utils';
import { createLogger } from '../../utils/logger'

const logger = createLogger('createTodo')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newTodo: CreateTodoRequest = JSON.parse(event.body)
  logger.info('Event ', event.body);
  // TODO: Implement creating a new TODO item
  logger.info('Starting to create TODO item');
  const userId: string = getUserId(event);
  const item: TodoItem = await createTodo(newTodo, userId); 

  return {
    statusCode: 201,
    headers:{
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      item
      
    })
  }
}
