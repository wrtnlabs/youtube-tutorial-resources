/**
 * Represents a single Todo item.
 */
export interface ITodo {
  /** Unique identifier for the Todo */
  id: string;
  /** The content or description of the Todo */
  content: string;
  /** Whether the Todo is completed or not */
  completed: boolean;
  /** ISO string representing when the Todo was created */
  created_at: string;
  /** ISO string representing the last update time of the Todo */
  updated_at: string;
}

/**
 * Payload for creating a new Todo item.
 */
export interface CreateTodoPayload {
  /** The content or description of the Todo */
  content: string;
}

/**
 * Payload for finding a specific Todo by its ID.
 */
export interface FindTodoPayload {
  /** Unique identifier of the Todo item */
  id: string;
}

/**
 * Payload for toggling the completion status of a Todo.
 */
export interface ToggleTodoPayload {
  /** Unique identifier of the Todo to toggle */
  id: string;
}

/**
 * Payload for removing a specific Todo.
 */
export interface RemoveTodoPayload {
  /** Unique identifier of the Todo to remove */
  id: string;
}
