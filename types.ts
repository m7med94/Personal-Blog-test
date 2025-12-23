
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

export type Category = 'All' | 'Technology' | 'Lifestyle' | 'Design' | 'AI' | 'Personal';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
