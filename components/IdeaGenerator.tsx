
import React, { useState } from 'react';
import { generatePostIdeas } from '../services/gemini';

const IdeaGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [ideas, setIdeas] = useState<{title: string, outline: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    const result = await generatePostIdeas(topic);
    setIdeas(result);
    setIsLoading(false);
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-8 shadow-sm border border-slate-800">
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-lg">
          <i className="fa-solid fa-lightbulb text-xl"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-100">Content Spark</h3>
          <p className="text-xs text-slate-500 font-medium">Idea Engine powered by Gemini</p>
        </div>
      </div>

      <div className="flex space-x-2 mb-8">
        <input 
          type="text" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Topic (e.g. AI, Space, Art)"
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-100 placeholder-slate-500"
        />
        <button 
          onClick={handleGenerate}
          disabled={isLoading || !topic.trim()}
          className="bg-indigo-600 text-white px-5 py-3 rounded-xl hover:bg-indigo-700 transition-all font-bold disabled:opacity-50 shadow-lg shadow-indigo-900/20"
        >
          {isLoading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : <i className="fa-solid fa-bolt"></i>}
        </button>
      </div>

      {ideas.length > 0 && (
        <div className="space-y-4 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
          {ideas.map((idea, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800 transition-all border border-slate-800 hover:border-indigo-500/30 group cursor-default">
              <h4 className="font-bold text-slate-100 mb-2 group-hover:text-indigo-400 transition-colors leading-snug">{idea.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed font-medium">{idea.outline}</p>
            </div>
          ))}
        </div>
      )}
      
      {ideas.length === 0 && !isLoading && (
        <div className="text-center py-6 border-2 border-dashed border-slate-800 rounded-2xl">
          <p className="text-xs text-slate-600 font-medium italic">Your next great post starts here...</p>
        </div>
      )}
    </div>
  );
};

export default IdeaGenerator;
