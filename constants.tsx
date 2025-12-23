
import { BlogPost, Category } from './types';

export const CATEGORIES: Category[] = ['All', 'Technology', 'Lifestyle', 'Design', 'AI', 'Personal'];

export const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Development in 2025',
    excerpt: 'Exploring how AI and edge computing are reshaping the way we build and deploy applications.',
    content: `
      The landscape of web development is shifting faster than ever. By 2025, we are likely to see a convergence of several major trends:
      
      ## 1. AI-Driven Coding
      Generative AI isn't just writing snippets anymore; it's architecting entire systems. Developers are becoming "System Prompters" rather than syntax experts.
      
      ## 2. The Edge is the New Cloud
      Latency is the ultimate enemy. Moving computation to the edge ensures that users get lightning-fast responses regardless of their geographic location.
      
      ## 3. WebAssembly (Wasm) Maturity
      We are seeing more desktop-grade applications running in the browser thanks to the maturity of Wasm. From video editors to CAD software, the browser is becoming the universal OS.
      
      Conclusion: Stay curious, stay adaptable. The tools will change, but the problem-solving core remains.
    `,
    category: 'Technology',
    author: 'Alex Rivers',
    date: 'Oct 24, 2024',
    imageUrl: 'https://picsum.photos/seed/tech/800/600',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Minimalist Design: Less is Actually More',
    excerpt: 'Why stripping away the clutter leads to better user experiences and clearer communication.',
    content: `
      Minimalism isn't about the absence of things; it's about the presence of value.
      
      When we design with a minimalist mindset, we are forced to prioritize what truly matters to the user.
      
      ### Key Principles:
      - Whitespace as a layout tool.
      - Typography that speaks for itself.
      - Purposeful color palettes.
      
      By removing distractions, we guide the user's eye to the call to action, the content, and the core message.
    `,
    category: 'Design',
    author: 'Sam Chen',
    date: 'Oct 22, 2024',
    imageUrl: 'https://picsum.photos/seed/design/800/600',
    readTime: '3 min read'
  },
  {
    id: '3',
    title: 'My Journey into Generative AI',
    excerpt: 'Reflections on the first year of building products with Large Language Models.',
    content: `
      It started with a simple API call. One year later, my entire workflow has been transformed.
      
      Generative AI has enabled me to build features that were previously impossible for a solo developer. From automated content tagging to intelligent search, the possibilities are endless.
      
      However, the biggest lesson I've learned is that AI is an assistant, not a replacement. Human intuition still reigns supreme in creative direction.
    `,
    category: 'AI',
    author: 'Alex Rivers',
    date: 'Oct 15, 2024',
    imageUrl: 'https://picsum.photos/seed/ai/800/600',
    readTime: '7 min read'
  }
];
