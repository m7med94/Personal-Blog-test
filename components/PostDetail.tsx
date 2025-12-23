
import React from 'react';
import { BlogPost } from '../types';
import AIAssistant from './AIAssistant';

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 relative">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
      >
        <i className="fa-solid fa-arrow-left mr-2"></i>
        Back to Feed
      </button>

      <div className="mb-10 text-center">
        <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 inline-block">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center space-x-4 text-slate-500 text-sm">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold mr-2">
              {post.author.charAt(0)}
            </div>
            <span>By {post.author}</span>
          </div>
          <span>•</span>
          <span>{post.date}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>
      </div>

      <div className="rounded-3xl overflow-hidden mb-12 shadow-2xl">
        <img src={post.imageUrl} alt={post.title} className="w-full h-[400px] object-cover" />
      </div>

      <article className="prose prose-slate lg:prose-xl mx-auto text-slate-700 leading-relaxed whitespace-pre-line">
        {post.content}
      </article>

      <div className="mt-16 pt-10 border-t border-slate-200">
        <h3 className="text-2xl font-bold mb-6">About the Author</h3>
        <div className="flex items-start space-x-6 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold shrink-0">
            {post.author.charAt(0)}
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">{post.author}</h4>
            <p className="text-slate-600 text-sm">
              Passionate writer, developer, and design enthusiast. Alex explores the intersection of human creativity and technological advancement.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors"><i className="fa-brands fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* AI Context Hub */}
      <AIAssistant postContent={post.content} />
    </div>
  );
};

export default PostDetail;
