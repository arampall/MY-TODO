import {TodoDB} from '../dataLayer/dbTodos';
import { TodoItem } from '../models/TodoItem';
import { CreateTodoRequest } from '../requests/CreateTodoRequest';
import * as uuid from 'uuid';
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest';
import {getPreformedURL, getUploadUrl} from '../s3/uploadImage';

const todoDB = new TodoDB();

export async function getTodos(userId: string): Promise<TodoItem[]>{
    return await todoDB.fetchAllTodos(userId);
}

export async function createTodo(
            requestItem: CreateTodoRequest, userId: string): Promise<TodoItem>{
    const todoId = uuid.v4();
    return await todoDB.createTodo({
        userId: userId,
        todoId: todoId,
        createdAt: new Date().toISOString(),
        done: false,
        ...requestItem
    });
}

export async function updateTodo(
            updateRequest: UpdateTodoRequest, todoId: string, userId: string){
    await todoDB.updateTodo(updateRequest, todoId, userId);
}

export async function deleteTodo(todoId: string, userId: string){
    await todoDB.deleteTodo(todoId, userId);
}

export async function updateImage(todoId:string, userId: string): Promise<string>{
    const imageUrl =  getPreformedURL(todoId);
    await todoDB.updateImageUrl(imageUrl, todoId, userId);
    return getUploadUrl(todoId);
}
