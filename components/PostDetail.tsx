
import React from 'react';
import { BlogPost } from '../types';

interface PostDetailProps {
  post: BlogPost;
  onBack: () => void;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 relative">
      <button 
        onClick={onBack}
        className="mb-8 flex items-center text-indigo-400 hover:text-indigo-300 font-semibold transition-colors group"
      >
        <i className="fa-solid fa-arrow-left mr-2 transform group-hover:-translate-x-1 transition-transform"></i>
        Back to Feed
      </button>

      <div className="mb-10 text-center">
        <span className="bg-indigo-500/10 text-indigo-400 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block border border-indigo-500/20">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-50 mb-8 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center justify-center space-x-6 text-slate-400 text-sm">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-indigo-400 font-bold mr-3 border border-slate-700 shadow-xl">
              {post.author.charAt(0)}
            </div>
            <span className="font-semibold text-slate-200">By {post.author}</span>
          </div>
          <span className="text-slate-700">|</span>
          <span className="font-medium">{post.date}</span>
          <span className="text-slate-700">|</span>
          <span className="font-medium">{post.readTime}</span>
        </div>
      </div>

      <div className="rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl shadow-indigo-500/5 border border-slate-800">
        <img src={post.imageUrl} alt={post.title} className="w-full h-[400px] md:h-[500px] object-cover brightness-90" />
      </div>

      <article className="prose prose-invert prose-slate lg:prose-xl mx-auto text-slate-300 leading-relaxed whitespace-pre-line prose-headings:text-slate-50 prose-strong:text-slate-50 prose-a:text-indigo-400">
        {post.content}
      </article>

      <div className="mt-20 pt-12 border-t border-slate-800">
        <h3 className="text-2xl font-bold mb-8 text-slate-50">About the Author</h3>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 bg-slate-900 p-8 md:p-10 rounded-[2rem] shadow-sm border border-slate-800">
          <div className="w-24 h-24 rounded-3xl bg-indigo-900/30 flex items-center justify-center text-indigo-400 text-4xl font-bold shrink-0 border border-indigo-500/20">
            {post.author.charAt(0)}
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-bold mb-3 text-slate-50">{post.author}</h4>
            <p className="text-slate-400 text-base leading-relaxed mb-6">
              Passionate writer, developer, and design enthusiast. Alex explores the intersection of human creativity and technological advancement in our rapidly changing world.
            </p>
            <div className="flex justify-center md:justify-start space-x-5">
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-all text-xl"><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-all text-xl"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="text-slate-500 hover:text-indigo-400 transition-all text-xl"><i className="fa-brands fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
