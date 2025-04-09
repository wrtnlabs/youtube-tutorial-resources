import { v4 } from "uuid";

import {
  CreateTodoPayload,
  FindTodoPayload,
  ITodo,
  RemoveTodoPayload,
  ToggleTodoPayload,
} from "./types";

/**
 * Service for managing Todo items in-memory.
 * Provides methods to create, find, list, toggle, and remove Todos.
 */
export class TodoService {
  /**
   * Internal in-memory storage for Todos.
   */
  private readonly todos: ITodo[] = [];

  /**
   * Returns all existing Todo items.
   * @returns An array of Todo items
   */
  public index(): ITodo[] {
    return this.todos;
  }

  /**
   * Finds a specific Todo item by its ID.
   * @param props - Object containing the ID of the Todo
   * @returns The found Todo or null if not found
   */
  public find(props: FindTodoPayload): ITodo | null {
    return this.todos.find((todo) => todo.id === props.id) || null;
  }

  /**
   * Creates a new Todo item.
   * @param props - Object containing the content of the Todo
   * @returns The newly created Todo item
   */
  public create(props: CreateTodoPayload): ITodo {
    const now = new Date().toISOString();

    const todo: ITodo = {
      id: v4(),
      content: props.content,
      completed: false,
      created_at: now,
      updated_at: now,
    };

    this.todos.push(todo);
    return todo;
  }

  /**
   * Toggles the completion status of a Todo item.
   * @param props - Object containing the ID of the Todo to toggle
   * @throws Error if the Todo is not found
   */
  public toggle(props: ToggleTodoPayload): void {
    const todo = this.todos.find((t) => t.id === props.id);
    if (!todo) {
      throw new Error("Todo not found.");
    }

    todo.completed = !todo.completed;
    todo.updated_at = new Date().toISOString();
  }

  /**
   * Removes a Todo item by its ID.
   * @param props - Object containing the ID of the Todo to remove
   * @throws Error if the Todo is not found
   */
  public remove(props: RemoveTodoPayload): void {
    const index = this.todos.findIndex((t) => t.id === props.id);
    if (index === -1) {
      throw new Error("Todo not found.");
    }

    this.todos.splice(index, 1);
  }
}
