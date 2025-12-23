
import React, { useState, useEffect } from 'react';
import { BlogPost } from '../types';
import AIAssistant from './AIAssistant';

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  const [liked, setLiked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Persistent Likes logic
    const likes = JSON.parse(localStorage.getItem('aura_likes') || '[]');
    setLiked(likes.includes(post.id));

    // Scroll Progress logic
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [post.id]);

  const toggleLike = () => {
    const likes = JSON.parse(localStorage.getItem('aura_likes') || '[]');
    let newLikes;
    if (liked) {
      newLikes = likes.filter((id: string) => id !== post.id);
    } else {
      newLikes = [...likes, post.id];
    }
    localStorage.setItem('aura_likes', JSON.stringify(newLikes));
    setLiked(!liked);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-0.5 bg-emerald-500 z-50 transition-all duration-100" style={{ width: `${scrollProgress}%` }} />

      <div className="max-w-screen-xl mx-auto px-6 py-20 flex flex-col md:flex-row gap-20">
        {/* Navigation Sidebar */}
        <aside className="md:w-64 shrink-0 flex flex-col items-start gap-12 sticky top-32 h-fit">
          <button 
            onClick={onBack}
            className="mono text-xs uppercase tracking-[0.2em] text-white/40 hover:text-emerald-500 transition-colors flex items-center group"
          >
            <i className="fa-solid fa-arrow-left-long mr-4 group-hover:-translate-x-2 transition-transform"></i>
            Return
          </button>

          <div className="space-y-8">
            <div>
              <p className="mono text-[10px] text-white/20 uppercase mb-2">Category</p>
              <p className="text-sm font-medium text-emerald-500">{post.category}</p>
            </div>
            <div>
              <p className="mono text-[10px] text-white/20 uppercase mb-2">Published</p>
              <p className="text-sm font-medium text-white/60">{post.date}</p>
            </div>
            <div>
              <p className="mono text-[10px] text-white/20 uppercase mb-2">Duration</p>
              <p className="text-sm font-medium text-white/60">{post.readTime}</p>
            </div>
          </div>

          <button 
            onClick={toggleLike}
            className={`w-12 h-12 flex items-center justify-center border ${liked ? 'border-emerald-500 text-emerald-500 bg-emerald-500/5' : 'border-white/10 text-white/40'} hover:border-emerald-500 transition-all`}
          >
            <i className={`fa-${liked ? 'solid' : 'regular'} fa-heart text-lg`}></i>
          </button>
        </aside>

        {/* Content Area */}
        <div className="flex-1 max-w-3xl">
          <header className="mb-20">
            <h1 className="text-5xl md:text-8xl font-light leading-[1.1] mb-12 tracking-tighter">
              {post.title}
            </h1>
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10"
            />
          </header>

          <article className="prose prose-invert prose-emerald max-w-none">
            <div className="text-white/70 text-lg leading-relaxed space-y-8 font-light whitespace-pre-line prose-headings:font-normal prose-headings:tracking-tight prose-h2:text-4xl prose-h3:text-2xl">
              {post.content}
            </div>
          </article>

          <footer className="mt-32 pt-16 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-white/5 border border-white/10 flex items-center justify-center text-xl mono text-white/40">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-medium">{post.author}</p>
                  <p className="text-xs text-white/30 mono uppercase mt-1">Founding Curator</p>
                </div>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-white/20 hover:text-emerald-500 transition-colors"><i className="fa-brands fa-twitter text-xl"></i></a>
                <a href="#" className="text-white/20 hover:text-emerald-500 transition-colors"><i className="fa-brands fa-linkedin text-xl"></i></a>
              </div>
            </div>
          </footer>
        </div>
      </div>
      
      {/* AI Assistant context-aware overlay */}
      <AIAssistant postContent={post.content} />
    </div>
  );
};

export default PostDetail;
