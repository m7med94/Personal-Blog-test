
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
        className="w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all flex items-center justify-center group"
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
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[70vh]">
          <div className="p-4 bg-indigo-600 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-robot"></i>
              <span className="font-bold">Lumina Assistant</span>
            </div>
            <button onClick={() => setChatHistory([])} className="text-indigo-200 hover:text-white transition-colors text-xs">
              Clear Chat
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
            {/* Quick Actions */}
            {!summary && (
              <button 
                onClick={handleSummarize}
                disabled={isLoadingSummary}
                className="w-full py-2 px-4 rounded-xl border-2 border-dashed border-indigo-200 text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-center space-x-2 text-sm font-medium"
              >
                {isLoadingSummary ? (
                  <i className="fa-solid fa-circle-notch animate-spin"></i>
                ) : (
                  <i className="fa-solid fa-bolt"></i>
                )}
                <span>Summarize this post</span>
              </button>
            )}

            {summary && (
              <div className="bg-indigo-50 p-3 rounded-xl border border-indigo-100 relative">
                <div className="text-xs font-bold text-indigo-400 uppercase tracking-tighter mb-1">AI Summary</div>
                <p className="text-sm text-slate-700 italic">"{summary}"</p>
                <button onClick={() => setSummary(null)} className="absolute top-1 right-1 text-indigo-300 hover:text-indigo-500">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            )}

            {/* Chat Area */}
            {chatHistory.length === 0 && !summary && (
              <div className="text-center py-8">
                <i className="fa-solid fa-comments text-slate-300 text-4xl mb-3"></i>
                <p className="text-slate-500 text-sm">Ask me anything about the article or the author!</p>
              </div>
            )}

            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-slate-100 text-slate-800 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-100 flex items-center space-x-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
