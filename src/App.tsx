import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import IdeaLab from "./components/IdeaLab";
import ProductionWorkshop from "./components/ProductionWorkshop";
import Networking from "./components/Networking";
import LegalCenter from "./components/LegalCenter";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'idealab' | 'workshop' | 'legal'>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home onStartIdea={() => setActiveTab('idealab')} />;
      case 'idealab':
        return <IdeaLab />;
      case 'workshop':
        return <ProductionWorkshop />;
      case 'legal':
        return <LegalCenter />;
      default:
        return <Home onStartIdea={() => setActiveTab('idealab')} />;
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink flex flex-col font-sans selection:bg-accent selection:text-white">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 px-[20px] md:px-[60px] py-[40px] md:py-[60px] max-w-[1600px] mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="px-[20px] md:px-[60px] py-10 border-t border-border-subtle bg-white mt-20">
        <div className="max-w-[1600px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <div className="text-xl font-display uppercase tracking-[-1px] leading-tight">
              STARTUP<br /><span className="text-accent">STUDENT HUB</span>
            </div>
            <div className="h-10 w-px bg-border-subtle hidden md:block" />
            <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest hidden md:block">
              PLATFORM SỐ 1 CHO KHỞI NGHIỆP SINH VIÊN
            </div>
          </div>
          
          <div className="flex items-center gap-8 text-[10px] font-extrabold tracking-widest text-zinc-400">
            <a href="#" className="hover:text-ink transition-colors uppercase">VỀ CHÚNG TÔI</a>
            <a href="#" className="hover:text-ink transition-colors uppercase">ĐIỀU KHOẢN</a>
            <a href="#" className="hover:text-ink transition-colors uppercase text-accent font-black">LIÊN HỆ MENTOR</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
