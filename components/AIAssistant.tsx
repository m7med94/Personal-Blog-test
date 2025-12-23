
import React, { useState, useEffect, useRef } from 'react';
import { summarizePost, chatWithAuthor } from '../services/gemini';
import { ChatMessage } from '../types';

interface AIAssistantProps {
  postContent: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ postContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isTyping]);

  const handleSummarize = async () => {
    setIsLoadingSummary(true);
    const result = await summarizePost(postContent);
    setSummary(result);
    setIsLoadingSummary(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setChatHistory(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const botResponse = await chatWithAuthor(chatHistory, postContent, input);
    const botMsg: ChatMessage = { role: 'assistant', content: botResponse };
    setChatHistory(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all flex items-center justify-center group"
      >
        {isOpen ? <i className="fa-solid fa-xmark text-xl"></i> : <i className="fa-solid fa-sparkles text-xl"></i>}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500"></span>
          </span>
        )}
      </button>

      {/* Assistant Panel */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[70vh]">
          <div className="p-5 bg-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <i className="fa-solid fa-robot text-sm"></i>
              </div>
              <span className="font-bold tracking-tight">Lumina Assistant</span>
            </div>
            <button onClick={() => setChatHistory([])} className="text-indigo-200 hover:text-white transition-colors text-xs font-semibold">
              Reset
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-900 scroll-smooth" ref={scrollRef}>
            {/* Quick Actions */}
            {!summary && (
              <button 
                onClick={handleSummarize}
                disabled={isLoadingSummary}
                className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-slate-800 text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all flex items-center justify-center space-x-2 text-sm font-bold"
              >
                {isLoadingSummary ? (
                  <i className="fa-solid fa-circle-notch animate-spin"></i>
                ) : (
                  <i className="fa-solid fa-bolt text-indigo-400"></i>
                )}
                <span>Summarize Article</span>
              </button>
            )}

            {summary && (
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700 relative group animate-in fade-in slide-in-from-top-2">
                <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-2 flex items-center">
                  <i className="fa-solid fa-sparkles mr-1.5"></i> AI Insights
                </div>
                <p className="text-sm text-slate-300 italic leading-relaxed">"{summary}"</p>
                <button onClick={() => setSummary(null)} className="absolute top-2 right-2 text-slate-600 hover:text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            )}

            {/* Chat Area */}
            {chatHistory.length === 0 && !summary && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-600 mx-auto mb-4">
                  <i className="fa-solid fa-comments text-2xl"></i>
                </div>
                <p className="text-slate-500 text-sm font-medium">Have questions? Let's discuss this article!</p>
              </div>
            )}

            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none font-medium' 
                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700 shadow-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none flex space-x-1.5 border border-slate-700">
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-800 bg-slate-900 flex items-center space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 bg-slate-800 border border-slate-700 text-slate-100 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder-slate-500"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-indigo-600 text-white w-11 h-11 flex items-center justify-center rounded-2xl hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-600/20"
            >
              <i className="fa-solid fa-paper-plane text-sm"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
