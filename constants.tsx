
import { BlogPost, Category } from './types';

export const CATEGORIES: Category[] = ['All', 'Tech', 'Culture', 'Design', 'Future'];

export const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Architecture of Silence',
    excerpt: 'In an era of digital noise, minimalist interface design isn\'t a choice—it\'s a survival mechanism.',
    content: `
      ## The Noise Floor
      Digital interfaces have reached a saturation point. Every pixel competes for attention, and every animation is a nudge. 
      
      ## The Antidote
      Aura is built on the principle of the 'Noise Floor'. By lowering the baseline stimulation, we allow the content to resonate. 
      
      - **Negative Space**: Not empty, but active.
      - **Type as Form**: Let the letters carry the weight.
      - **Contextual Clarity**: Only show what is needed, exactly when it is needed.

      Design is not what it looks like; it's how it focuses the mind.
    `,
    category: 'Design',
    author: 'Aura Editor',
    date: '2024.10.28',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=1200',
    readTime: '4m'
  },
  {
    id: '2',
    title: 'Post-Quantum Web3',
    excerpt: 'What happens to decentralized systems when encryption becomes obsolete?',
    content: `
      The horizon of quantum computing is closer than we anticipated. 
      
      ### The Vulnerability
      Most blockchain technologies rely on elliptical curve cryptography. In a post-quantum world, these are trivial to break.
      
      ### The Solution
      Lattice-based cryptography and other 'Quantum Resistant' algorithms are the new standard. We must rebuild the foundation before the walls are breached.
    `,
    category: 'Tech',
    author: 'Aura Editor',
    date: '2024.10.25',
    imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=1200',
    readTime: '6m'
  },
  {
    id: '3',
    title: 'Synthetic Realism',
    excerpt: 'The blur between generated and captured photography is now permanent.',
    content: `
      We no longer live in a world of 'fake' and 'real'. We live in a world of 'Intentional Reality'.
      
      Synthetic media is becoming the primary tool for creative expression. It allows us to bypass the physical constraints of light and lens to capture the feeling of a moment rather than its photons.
    `,
    category: 'Future',
    author: 'Aura Editor',
    date: '2024.10.20',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
    readTime: '3m'
  }
];
