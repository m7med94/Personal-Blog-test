
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  imageUrl: string;
  readTime: string;
}

export type Category = 'All' | 'Tech' | 'Culture' | 'Design' | 'Future';

/**
 * Represents a single message in a chat conversation.
 */
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
