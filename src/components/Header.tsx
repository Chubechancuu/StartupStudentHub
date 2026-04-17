import { motion } from "motion/react";
import { Lightbulb, Factory, Users, Gavel, LayoutDashboard } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

export default function Header({ activeTab, setActiveTab }: HeaderProps) {
  const tabs = [
    { id: 'home', label: 'DASHBOARD', icon: LayoutDashboard },
    { id: 'idealab', label: 'PHÒNG LAB', icon: Lightbulb },
    { id: 'workshop', label: 'XƯỞNG SẢN XUẤT', icon: Factory },
    { id: 'legal', label: 'PHÁP LÝ', icon: Gavel },
  ];

  return (
    <header className="px-[60px] pt-[40px] pb-[20px] bg-paper border-b border-border-subtle">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
        <div className="logo-text">
          STARTUP<br /><span className="logo-accent">HUB VN</span>
        </div>
        
        <div className="text-right hidden md:block">
          <div className="font-bold text-sm tracking-widest uppercase">
            LỘ TRÌNH: <span className="text-accent">NĂM 2 / FOUNDATION</span>
          </div>
          <div className="text-zinc-500 text-xs mt-1 uppercase">
            Sinh viên khởi nghiệp — HUB VIETNAM
          </div>
        </div>
      </div>

      <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 py-2 text-[11px] font-extrabold tracking-widest transition-colors flex items-center gap-2 border-b-2
              ${activeTab === tab.id ? 'text-ink border-ink' : 'text-zinc-400 border-transparent hover:text-ink'}`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
