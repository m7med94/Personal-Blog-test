
import React from 'react';
import { BlogPost } from '../types';

interface PostCardProps {
  post: BlogPost;
  onClick: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onClick }) => {
  return (
    <div 
      onClick={() => onClick(post.id)}
      className="group relative border-l border-white/10 hover:border-emerald-500 transition-all duration-500 cursor-pointer py-8 pl-8"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center space-x-4 mb-4">
          <span className="mono text-[10px] uppercase tracking-tighter text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
            {post.category}
          </span>
          <span className="mono text-[10px] text-white/40">{post.date}</span>
        </div>
        
        <h3 className="text-3xl font-light mb-4 group-hover:translate-x-2 transition-transform duration-500 leading-tight">
          {post.title}
        </h3>
        
        <p className="text-white/50 text-sm leading-relaxed mb-6 line-clamp-2 font-light">
          {post.excerpt}
        </p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-white/5 border border-white/10 flex items-center justify-center text-[10px] mono text-white/60">
              {post.author.charAt(0)}
            </div>
            <span className="text-[10px] mono uppercase tracking-widest text-white/30">{post.author}</span>
          </div>
          <span className="text-[10px] mono text-white/20 uppercase">{post.readTime}</span>
        </div>
      </div>
      
      {/* Decorative dot */}
      <div className="absolute top-1/2 -left-[5px] w-2 h-2 bg-black border border-white/20 group-hover:border-emerald-500 transition-colors"></div>
    </div>
  );
};

export default PostCard;
