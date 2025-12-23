
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
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center text-xs text-slate-500 mb-3 space-x-3">
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-800 group-hover:text-indigo-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-slate-600 text-sm line-clamp-3 mb-4">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center pt-4 border-t border-slate-50">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
            {post.author.charAt(0)}
          </div>
          <span className="ml-2 text-xs font-medium text-slate-700">{post.author}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
