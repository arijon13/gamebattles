"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatBubbleLeftRightIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi! How can we help you today?", isUser: false }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputText, isUser: true }]);
    setInputText("");

    // Simulate support response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thanks for your message! Our support team will respond shortly.", 
        isUser: false 
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r 
                   from-[#00e7ff] to-[#0077ff] text-white shadow-lg z-50
                   ${isOpen ? 'hidden' : 'block'}`}
      >
        <ChatBubbleLeftRightIcon className="w-6 h-6" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-[#1f2236] 
                     rounded-xl shadow-2xl overflow-hidden z-50 border border-[#3d4674]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#00e7ff] to-[#0077ff] p-4 flex justify-between items-center">
              <h3 className="text-white font-bold">Live Support</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:opacity-80 transition-opacity"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-[380px] overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      message.isUser
                        ? 'bg-[#00e7ff] text-white'
                        : 'bg-[#2a2f48] text-[#c3c8f3]'
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-[#3d4674]">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#2a2f48] text-white rounded-lg px-4 py-2
                           border border-[#3d4674] focus:outline-none focus:border-[#00e7ff]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#00e7ff] to-[#0077ff]
                           text-white rounded-lg hover:opacity-80 transition-opacity"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 