import * as AWS from 'aws-sdk';
import {TodoItem} from '../models/TodoItem';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { TodoUpdate } from '../models/TodoUpdate';

export class TodoDB {
    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly todoTable = process.env.TODO_TABLE){
    };

    async fetchAllTodos(userId: string): Promise<TodoItem[]>{
        const result = await this.docClient
        .query({
            TableName: this.todoTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
            ':userId': userId
            }
        }).promise();
        return result.Items as TodoItem[];
    }

    async createTodo(todo: TodoItem): Promise<TodoItem>{
        await this.docClient.put({
            TableName: this.todoTable,
            Item: todo
          }).promise();
        return todo;
    }
    
    async updateTodo(todo: TodoUpdate, todoId: string, userId: string){
        await this.docClient.update({
            TableName: this.todoTable,
            Key: {
              "userId": userId,
              "todoId": todoId
            },
            UpdateExpression: "set #itemName = :todoName, #itemDueDate = :todoDueDate, #itemDone = :todoDone",
            ExpressionAttributeValues: {
              ':todoName' : todo.name,
              ':todoDueDate' : todo.dueDate,
              ':todoDone' : todo.done
            },
            ExpressionAttributeNames:{
              '#itemName': 'name',
              '#itemDueDate': 'dueDate',
              '#itemDone':'done'
            }
        }).promise();
    }
    
    async deleteTodo(todoId: string, userId: string){
        await this.docClient.delete({
            TableName: this.todoTable,
            Key: {
              userId,
              todoId
            }
        }).promise();
    }
    
    async updateImageUrl(imageUrl: string, todoId: string, userId: string): Promise<void>{
        await this.docClient.update({
            TableName: this.todoTable,
            Key: {
              "userId": userId,
              "todoId": todoId
            },
            UpdateExpression: "set #itemUrl = :todoAttachmentUrl",
            ExpressionAttributeValues: {
              ':todoAttachmentUrl' : imageUrl
            },
            ExpressionAttributeNames:{
              '#itemUrl': 'attachmentUrl'
            }
          }).promise();
        
    }
    
};



