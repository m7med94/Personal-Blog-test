
import React, { useState, useMemo } from 'react';
import { MOCK_POSTS, CATEGORIES } from './constants';
import { Category, BlogPost } from './types';
import PostCard from './components/PostCard';
import PostDetail from './components/PostDetail';
import IdeaGenerator from './components/IdeaGenerator';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const selectedPost = useMemo(() => 
    MOCK_POSTS.find(p => p.id === selectedPostId), 
  [selectedPostId]);

  const handlePostClick = (id: string) => {
    setSelectedPostId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedPost) {
    return <PostDetail post={selectedPost} onBack={() => setSelectedPostId(null)} />;
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-emerald-500 selection:text-black">
      {/* Structural Borders */}
      <div className="fixed inset-0 pointer-events-none border-[12px] border-white/5 z-50"></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-12 h-24 flex items-center justify-between border-b border-white/10 bg-black/80 backdrop-blur-sm">
        <div 
          onClick={() => setSelectedPostId(null)}
          className="text-xl font-bold tracking-[0.4em] uppercase cursor-pointer hover:text-emerald-500 transition-colors"
        >
          Aura<span className="text-emerald-500">.</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-12">
          {CATEGORIES.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`mono text-[10px] uppercase tracking-widest transition-all ${selectedCategory === cat ? 'text-emerald-500' : 'text-white/40 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-8">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="SEARCH"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-b border-white/10 py-1 mono text-[10px] w-32 focus:w-48 focus:border-emerald-500 outline-none transition-all placeholder:text-white/10"
            />
          </div>
          <button className="mono text-[10px] border border-white/20 px-6 py-2 hover:bg-white hover:text-black transition-all">
            NEWSLETTER
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-48 pb-20 px-12 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <p className="mono text-[10px] text-emerald-500 uppercase tracking-[0.5em] mb-8">Quarterly Journal — 2024</p>
          <h1 className="text-[10vw] font-light leading-none tracking-tighter mb-12">
            The New <br />
            <span className="italic">Perspective</span>
          </h1>
          <div className="flex items-end justify-between">
            <p className="max-w-md text-white/40 text-lg font-light leading-relaxed">
              Curating the intersection of technology, human behavior, and the architectural silence of minimalist design.
            </p>
            <div className="text-right hidden md:block">
              <p className="mono text-[10px] text-white/20 uppercase">Local Time</p>
              <p className="mono text-sm text-white/60">{new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Feed Grid */}
      <main className="px-12 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-r border-b border-white/10">
            {filteredPosts.map((post, idx) => (
              <div key={post.id} className={`border-t border-white/10 ${idx % 3 !== 2 ? 'lg:border-r border-white/10' : ''}`}>
                <PostCard post={post} onClick={handlePostClick} />
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="py-40 text-center border-t border-white/10">
              <p className="mono text-xs text-white/20 uppercase tracking-widest">No entries found in this sector</p>
            </div>
          )}

          {/* AI Idea Generator Section */}
          <div className="mt-32 max-w-2xl mx-auto border-t border-white/10 pt-32">
            <IdeaGenerator />
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="px-12 py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="text-xl font-bold tracking-[0.4em] uppercase">Aura.</div>
          <div className="flex gap-16">
            <div className="space-y-4">
              <p className="mono text-[10px] text-white/20 uppercase">Social</p>
              <div className="flex flex-col gap-2">
                <a href="#" className="mono text-[10px] hover:text-emerald-500 transition-colors">TWITTER</a>
                <a href="#" className="mono text-[10px] hover:text-emerald-500 transition-colors">SUBSTACK</a>
              </div>
            </div>
            <div className="space-y-4">
              <p className="mono text-[10px] text-white/20 uppercase">Legal</p>
              <div className="flex flex-col gap-2">
                <a href="#" className="mono text-[10px] hover:text-emerald-500 transition-colors">PRIVACY</a>
                <a href="#" className="mono text-[10px] hover:text-emerald-500 transition-colors">TERMS</a>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="mono text-[10px] text-white/20 uppercase">&copy; 2024 Aura Media Group</p>
            <p className="mono text-[10px] text-white/10 mt-1 uppercase">Building in silence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
