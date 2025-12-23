
import React, { useState, useMemo } from 'react';
import { MOCK_POSTS, CATEGORIES } from './constants';
import { Category, BlogPost } from './types';
import PostCard from './components/PostCard';
import PostDetail from './components/PostDetail';

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

  const featuredPost = MOCK_POSTS[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            onClick={() => setSelectedPostId(null)}
            className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent cursor-pointer"
          >
            LUMINA.
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSelectedPostId(null); }}
                className={`text-sm font-medium transition-colors ${selectedCategory === cat ? 'text-indigo-400' : 'text-slate-400 hover:text-indigo-400'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <input 
                type="text" 
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-slate-900 border-none rounded-full px-4 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 w-48 text-slate-100 placeholder-slate-500 transition-all"
              />
              <i className="fa-solid fa-magnifying-glass absolute right-3 top-2 text-slate-500 text-xs"></i>
            </div>
            <button className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-indigo-900/20 hover:bg-indigo-700 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {selectedPost ? (
          <PostDetail post={selectedPost} onBack={() => setSelectedPostId(null)} />
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Featured Post */}
            {!searchQuery && selectedCategory === 'All' && (
              <div 
                onClick={() => handlePostClick(featuredPost.id)}
                className="relative h-[450px] md:h-[600px] rounded-3xl overflow-hidden mb-16 cursor-pointer group shadow-2xl shadow-indigo-500/5"
              >
                <img 
                  src={featuredPost.imageUrl} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75 group-hover:brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-8 md:p-16">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 w-fit">
                    Featured
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 max-w-2xl leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-slate-200 text-lg mb-8 max-w-xl line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center space-x-4 text-slate-400 text-sm font-medium">
                    <span className="text-slate-100">{featuredPost.author}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Blog Feed */}
              <div className="lg:col-span-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-slate-50">
                    {searchQuery ? `Search Results for "${searchQuery}"` : `${selectedCategory} Stories`}
                  </h2>
                  <div className="text-sm text-slate-500">{filteredPosts.length} posts found</div>
                </div>

                {filteredPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredPosts.map(post => (
                      <PostCard key={post.id} post={post} onClick={handlePostClick} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24 bg-slate-900 rounded-3xl border border-slate-800 shadow-sm">
                    <i className="fa-solid fa-ghost text-slate-700 text-6xl mb-4"></i>
                    <p className="text-slate-400 text-lg">No stories found matching your criteria.</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-4 space-y-12">
                {/* About Me Widget */}
                <div className="bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-800">
                  <div className="w-24 h-24 rounded-full bg-slate-800 mx-auto mb-6 flex items-center justify-center text-4xl text-indigo-400 font-bold overflow-hidden border-2 border-slate-700">
                    <img src="https://picsum.photos/seed/profile/200/200" alt="Author" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-2 text-slate-100">Alex Rivers</h3>
                  <p className="text-center text-slate-400 text-sm mb-6 leading-relaxed">
                    A tech explorer documenting the evolution of our digital world. Writing about AI, Design, and the future of humans.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-900/50 hover:text-indigo-400 transition-all"><i className="fa-brands fa-twitter"></i></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-900/50 hover:text-indigo-400 transition-all"><i className="fa-brands fa-instagram"></i></a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-900/50 hover:text-indigo-400 transition-all"><i className="fa-brands fa-medium"></i></a>
                  </div>
                </div>

                {/* Newsletter Widget */}
                <div className="bg-indigo-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-950/20">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <i className="fa-solid fa-envelope-open-text text-8xl -rotate-12"></i>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 relative z-10">Lumina Insider</h3>
                  <p className="text-indigo-100 text-sm mb-6 relative z-10 leading-relaxed">
                    Get weekly insights on the future of technology delivered straight to your inbox.
                  </p>
                  <input 
                    type="email" 
                    placeholder="name@email.com" 
                    className="w-full bg-indigo-500/50 border border-indigo-400/30 text-white placeholder-indigo-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 mb-4"
                  />
                  <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-all">
                    Sign Up
                  </button>
                </div>
              </aside>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent mb-8">
            LUMINA.
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-12">
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">About</a>
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-slate-400 hover:text-indigo-400 transition-colors">Contact</a>
          </div>
          <p className="text-slate-600 text-sm font-medium">
            © {new Date().getFullYear()} Lumina Personal Blog.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
