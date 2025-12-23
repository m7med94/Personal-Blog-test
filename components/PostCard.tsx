
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
      className="group bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-indigo-900/10 transition-all duration-300 cursor-pointer border border-slate-800 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-90 group-hover:brightness-100"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-slate-500 mb-3 space-x-3">
          <span className="font-medium">{post.date}</span>
          <span>•</span>
          <span className="font-medium">{post.readTime}</span>
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-100 group-hover:text-indigo-400 transition-colors">
          {post.title}
        </h3>
        <p className="text-slate-400 text-sm line-clamp-3 mb-4 leading-relaxed">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center pt-4 border-t border-slate-800">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 font-bold text-xs border border-slate-700">
            {post.author.charAt(0)}
          </div>
          <span className="ml-2 text-xs font-semibold text-slate-300">{post.author}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
