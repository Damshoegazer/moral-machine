
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useState, useEffect, useRef } from 'react';
import RangeSliderNew from '@/components/side-controls/RangeSliderNew';

export default function Page() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [slider1Value, setSlider1Value] = useState(0);
  const [slider2Value, setSlider2Value] = useState(0); 
  const [slider3Value, setSlider3Value] = useState(0); 
  /* const [slider4Value, setSlider4Value] = useState(0); */ 
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setIsLoading(true);

    try {

      const userMessageContent = `E${slider1Value} M${slider2Value} L${slider3Value} ${input}`;
      const userMessage = { role: 'user', content: userMessageContent };
      setMessages((prev) => [...prev, { role: 'user', content: input }]);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();
      console.log('Respuesta de la API:', data);
      if (res.ok) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.text }]);
      } else {
        throw new Error(data.error || 'Error en la API');
      }
      setInput('');
    } catch (error) {
      console.error('Error en el frontend:', error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Error al generar la respuesta' }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-end">
      <div className="w-[30%] h-screen bg-black z-10 fixed top-[16vh] left-0">
        <div className="space-y-4 p-5 text-white">
          <RangeSliderNew
            label="Etica"
            min={0}
            max={5}
            step={1}
            onChange={setSlider1Value}
          />
          <RangeSliderNew
            label="Moral"
            min={0}
            max={5}
            step={1}
            onChange={setSlider2Value}
          />
          <RangeSliderNew
            label="Longitud"
            min={0}
            max={2}
            step={1}
            onChange={setSlider3Value}
          />
          {/* <RangeSliderNew
            label="Fantasía"
            min={0}
            max={2}
            step={1}
            onChange={setSlider4Value}
          /> */}
          <div className="mt-4 p-4 bg-[#47454500] text-white rounded">
            <p>Valores actuales:</p>
            <p>Etica: {slider1Value}</p>
            <p>Moral: {slider2Value}</p>
            <p>Longitud: {slider3Value}</p>
            {/* <p>Fantasía: {slider4Value}</p> */}
          </div>
        </div>
      </div>

      <div className="px-[5vw] w-[70%] mt-[4rem] flex flex-col gap-3 bg-[#474545] font-stretch-expanded">
        <div className="pb-[35vh]">
          <div className="w-full flex gap-5 flex-col p-6 rounded">
            <AnimatePresence>
              {isLoading ? (
                <div className="fixed w-full z-[9] flex justify-center items-center h-screen top-0 left-0 bg-[#000000af]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="#e87e0c"
                    className=" w-[20%] animate-spin  "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </div>
              ) : (
                <div className=""></div>
              )}
            </AnimatePresence>
            {messages.map((m, index) => (
              <AnimatePresence key={index}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 5 } }}
                  exit={{ opacity: 0 }}
                  className={` flex flex-col ${m.role === 'user' ? 'text-white p-6 bg-[#5e5b5b] rounded-2xl' : 'bg-[#2f2e2e] text-white p-6 rounded-2xl'}`}
                >
                  <strong>{m.role === 'user' ? 'Tú:' : <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#da5416" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>}</strong>
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <motion.p className="mb-2 text-[1rem]">{children}</motion.p>,
                      strong: ({ children }) => <motion.strong className="font-bold">{children}</motion.strong>,
                      ul: ({ children }) => <motion.ul className="list-none pl-5 mb-2">{children}</motion.ul>,
                      ol: ({ children }) => <motion.ol className="list-none pl-5 mb-2">{children}</motion.ol>,
                      li: ({ children }) => <motion.li className="mb-1 bg-[#474545] p-1 ">{children}</motion.li>,
                      hr: ({ children }) => <motion.hr className="opacity-0">{children}</motion.hr>,
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                </motion.div>
              </AnimatePresence>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className='bg-[#00000000] w-[100%] pt-10 pb-10 pr-20 flex justify-end items-center fixed top-[70%] left-0 z-10 '>
          <div className='w-full h-full bg-[#000] absolute blur-2xl'></div>
          <form onSubmit={handleSubmit} className=" bg-[#47474700] rounded-3xl z-50 w-[60%] h-[15vh] flex gap-2 ">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              rows={1}
              className="flex-1 p-4 text-white overflow-hidden bg-[#302f2f] border-orange-500 rounded-3xl border-4 resize-none max-h-[150px] min-h-[50px] w-full custom-scrollbar overflow-y-scroll"
              disabled={isLoading}
              style={{
                resize: 'none',
                overflowY: 'auto'
              }}
            />
            <button
              type="submit"
              className="bg-[#404040] group text-white px-4 py-2 rounded hover:bg-orange-500 transition-all duration-500 disabled:bg-blue-300 overflow-hidden"
              disabled={isLoading}
            >
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 1 } }}
                  exit={{ opacity: 0 }}
                  className=""
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                    />
                  </svg>
                </motion.div>
              ) : (
                <div className="group-hover:animate-bounce group-hover:animate-duration-[3000ms] group-hover:animate-delay-200 group-hover:animate-ease-out ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}