export interface ChatOptions {
  temperature?: number;
  maxTokens?: number;
}

export interface ModelMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface StructuredOutputOptions<T> {
  schema: Record<string, unknown>;
  validator?: (data: unknown) => data is T;
}

export interface ModelAdapter {
  providerName: string;
  modelName: string;

  chat(messages: ModelMessage[], options?: ChatOptions): Promise<string>;

  reason(prompt: string, context?: Record<string, unknown>): Promise<string>;

  generateStructuredOutput<T>(
    prompt: string,
    schemaOptions: StructuredOutputOptions<T>
  ): Promise<T>;
}
