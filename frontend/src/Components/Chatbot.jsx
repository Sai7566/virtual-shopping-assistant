import React, { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";
import { AiOutlineSend, AiOutlineRobot } from "react-icons/ai";
import { XCircle, BotIcon } from "lucide-react";
import { FaMicrophone, FaMicrophoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "👋 Hello! Ask me anything.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const { backendUrl } = useContext(ShopContext);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const sr = recognition ? new recognition() : null;

  const cleanText = (text) => {
    return text.trim().replace(/[.,!?]$/, "").toLowerCase();
  };

  const startVoiceRecognition = () => {
    if (!sr) return;

    sr.interimResults = true;
    sr.lang = "en-IN";
    let liveTranscript = "";

    sr.onstart = () => setIsListening(true);

    sr.onresult = (event) => {
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          liveTranscript += transcript;
        }
      }

      const processedText = cleanText(finalTranscript || liveTranscript);
      setInput(processedText);
    };

    sr.onerror = () => setIsListening(false);

    sr.onend = () => {
      setIsListening(false);
      if (input.trim()) {
        sendMessage();
      }
    };

    sr.start();
  };

  const stopVoiceRecognition = () => {
    if (sr && isListening) sr.stop();
    setIsListening(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    stopVoiceRecognition();

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setIsBotTyping(true);

    try {
      const response = await axios.post(backendUrl + "/api/chatbot", {
        message: input,
      });

      setMessages([
        ...newMessages,
        { text: response.data.response, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error fetching chatbot response", error);
    } finally {
      setIsBotTyping(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  return (
    <div className="z-[100]">
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsChatbotOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col items-center justify-center gap-[2px]
                   px-4 py-3 rounded-full shadow-xl z-50 backdrop-blur-md bg-white/80
                   text-blue-700 hover:text-blue-900 transition-all duration-300 
                   hover:shadow-blue-400 border border-blue-100 
                   hover:bg-gradient-to-br hover:from-white hover:to-blue-100"
      >
        <span className="absolute inset-0 w-full h-full bg-blue-400 opacity-20 rounded-full animate-ping" />
        <motion.div
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <BotIcon className="w-6 h-6 drop-shadow-sm" />
        </motion.div>
        <span className="text-[11px] font-semibold leading-none">AISSISTANT</span>
      </motion.button>

      {/* Chat Window */}
      {isChatbotOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-20 right-4 md:bottom-24 md:right-6 w-[92%] md:w-80 h-[70vh]
                     bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col z-50"
        >
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-50 px-4 py-3 border-b">
            <div className="flex items-center gap-2 font-semibold text-blue-900">
              <div className="bg-blue-500 p-2 rounded-full text-white">
                <AiOutlineRobot size={20} />
              </div>
              Assistant
            </div>
            <button onClick={() => setIsChatbotOpen(false)}>
              <XCircle size={22} className="text-gray-500 hover:text-red-500" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3 bg-white">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className={`px-4 py-2 text-sm rounded-xl shadow-md max-w-[75%] ${
                  msg.sender === "bot"
                    ? "bg-gradient-to-r from-blue-100 via-gray-100 to-blue-100 text-gray-800 self-start border border-blue-200 font-mono"
                    : "bg-blue-500 text-white self-end"
                }`}
                style={{
                  alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end",
                }}
              >
                {msg.text}
              </motion.div>
            ))}
            {isBotTyping && (
              <div className="self-start bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-xl animate-pulse max-w-[60%]">
                🤖 Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex flex-col items-center border-t bg-white px-3 py-2">
            <div className="flex items-center w-full">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    stopVoiceRecognition();
                    sendMessage();
                  }
                }}
                placeholder={isListening ? "🎤 Listening..." : "Type a message..."}
                className="flex-1 px-4 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              {/* Mic */}
              <div className="relative ml-2">
                <button
                  onClick={startVoiceRecognition}
                  className={`p-2 rounded-full relative z-10 ${
                    isListening
                      ? "bg-red-100 text-red-500"
                      : "bg-gray-100 text-blue-600 hover:bg-blue-200"
                  }`}
                  title="Speak"
                >
                  {isListening ? (
                    <FaMicrophoneAlt className="w-5 h-5" />
                  ) : (
                    <FaMicrophone className="w-5 h-5" />
                  )}
                </button>

                {isListening && (
                  <>
                    <span className="absolute top-0 left-0 w-full h-full rounded-full bg-red-400 opacity-30 animate-ping z-0" />
                    <span className="absolute top-0 left-0 w-full h-full rounded-full bg-red-400 opacity-20 animate-ping delay-200 z-0" />
                  </>
                )}
              </div>

              {/* Send */}
              <button
                onClick={() => {
                  stopVoiceRecognition();
                  sendMessage();
                }}
                className="ml-2 p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              >
                <AiOutlineSend className="text-lg" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;

