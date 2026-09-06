import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import type { ChatMessage } from '../types';
import { sendChatMessage } from '../services/geminiService';

function renderMarkdownLite(text: string) {
  const html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\n/g, '<br />');
  return html.includes('<li>') ? `<ul class="list-disc pl-4 space-y-1">${html}</ul>` : html;
}

const SUGGESTED_PROMPTS = [
  'What should I budget per day in Kyoto?',
  "What's the best time to visit Iceland?",
  'Any local etiquette tips for Morocco?',
];

export function TravelAssistantChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hi, I'm **Aura** — your AI travel companion. Ask me about budgets, best times to visit, safety, or local etiquette for any destination.",
      createdAt: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isSending]);

  const submitMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: trimmed,
      createdAt: Date.now(),
    };
    const history = messages;
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsSending(true);

    try {
      const reply = await sendChatMessage(history, trimmed);
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-assistant`, role: 'assistant', content: reply, createdAt: Date.now() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          role: 'assistant',
          content: "Sorry, I couldn't process that. Please try again in a moment.",
          createdAt: Date.now(),
          isError: true,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    submitMessage(input);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close travel assistant chat' : 'Open travel assistant chat'}
        aria-expanded={open}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-5 z-[80] flex h-14 w-14 items-center justify-center rounded-full bg-amber-400 text-obsidian-950 shadow-glow-amber sm:bottom-6 sm:right-6"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageCircle className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Aura travel assistant chat"
            className="fixed bottom-24 right-5 z-[80] flex h-[min(600px,70vh)] w-[calc(100%-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-obsidian-700 bg-obsidian-900/95 shadow-editorial backdrop-blur-xl sm:right-6"
          >
            <div className="flex items-center gap-2.5 border-b border-obsidian-800 px-5 py-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/15 text-amber-300">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Aura</p>
                <p className="text-xs text-obsidian-500">Your AI travel companion</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-amber-400 text-obsidian-950'
                        : message.isError
                          ? 'bg-red-950/50 text-red-200'
                          : 'bg-obsidian-800 text-obsidian-100'
                    }`}
                    dangerouslySetInnerHTML={{ __html: renderMarkdownLite(message.content) }}
                  />
                </div>
              ))}
              {isSending && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-obsidian-800 px-3.5 py-2.5 text-sm text-obsidian-400">
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Aura is thinking...
                  </div>
                </div>
              )}
            </div>

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 px-5 pb-2">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => submitMessage(prompt)}
                    className="rounded-full border border-obsidian-700 px-2.5 py-1 text-[11px] text-obsidian-400 transition hover:border-amber-400/50 hover:text-amber-200"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-obsidian-800 p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a destination..."
                aria-label="Message Aura, your travel assistant"
                className="flex-1 rounded-full border border-obsidian-700 bg-obsidian-950 px-4 py-2.5 text-sm text-obsidian-100 placeholder:text-obsidian-500 focus:border-amber-400/60"
              />
              <button
                type="submit"
                disabled={!input.trim() || isSending}
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 text-obsidian-950 transition hover:bg-amber-300 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
