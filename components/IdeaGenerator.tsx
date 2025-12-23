
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
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
          <i className="fa-solid fa-lightbulb"></i>
        </div>
        <div>
          <h3 className="text-xl font-bold">Content Spark</h3>
          <p className="text-sm text-slate-500">Generate post ideas with Gemini AI</p>
        </div>
      </div>

      <div className="flex space-x-2 mb-8">
        <input 
          type="text" 
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g. Hiking, Coding, Cooking)"
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button 
          onClick={handleGenerate}
          disabled={isLoading || !topic.trim()}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all font-bold disabled:opacity-50"
        >
          {isLoading ? <i className="fa-solid fa-circle-notch animate-spin"></i> : 'Spark'}
        </button>
      </div>

      {ideas.length > 0 && (
        <div className="space-y-4">
          {ideas.map((idea, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 hover:bg-indigo-50 transition-colors border border-transparent hover:border-indigo-100">
              <h4 className="font-bold text-slate-800 mb-1">{idea.title}</h4>
              <p className="text-xs text-slate-500">{idea.outline}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IdeaGenerator;
