import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Users, Search, Filter, MessageSquare, Handshake, MapPin, Briefcase, Code, Palette, Zap } from "lucide-react";

export default function Networking() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const mockUsers = [
    {
      id: "1",
      name: "Trần Thế Anh",
      role: "Kỹ thuật (Tech)",
      skills: ["React", "Node.js", "Firebase"],
      bio: "Sinh viên CNTT năm 3, muốn build app giúp kết nối việc làm part-time cho sinh viên.",
      lookingFor: "Business Founder, Designer",
      icon: Code,
      color: "blue"
    },
    {
      id: "2",
      name: "Nguyễn Minh Châu",
      role: "Kinh doanh (Business)",
      skills: ["Market Research", "Pitching", "Finance"],
      bio: "Đam mê startup về F&B, đã có mô hình kinh doanh café mang đi lãi 5tr/tháng.",
      lookingFor: "Tech Co-founder",
      icon: Briefcase,
      color: "green"
    },
    {
      id: "3",
      name: "Lê Diệp Anh",
      role: "Thiết kế (Design)",
      skills: ["Figma", "Branding", "UI/UX"],
      bio: "Freelance Designer, yêu thích các dự án liên quan đến giáo dục và xã hội.",
      lookingFor: "Full-stack Team",
      icon: Palette,
      color: "purple"
    },
    {
      id: "4",
      name: "Phạm Gia Bảo",
      role: "Kế toán (Accounting)",
      skills: ["Tax", "Audit", "Excel"],
      bio: "Chuyên gia về con số, sẵn sàng giúp Startup quản lý dòng tiền bài bản.",
      lookingFor: "Cơ hội thực chiến",
      icon: Zap,
      color: "yellow"
    }
  ];

  const filteredUsers = mockUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-ink pb-6">
        <div>
          <h3 className="text-4xl font-display uppercase">SÀN KẾT NỐI</h3>
          <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-2">Tìm kiếm mảnh ghép còn thiếu cho Startup của bạn.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
          <input
            type="text"
            placeholder="Kỹ năng, vai trò..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-2 border-ink pl-12 pr-4 py-3 text-xs font-bold uppercase focus:outline-none focus:border-accent transition-all"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredUsers.map((user) => (
            <motion.div
              key={user.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card-bold border-b-4 hover:border-accent flex flex-col group h-full"
            >
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-ink text-white flex items-center justify-center font-display text-2xl group-hover:bg-accent transition-colors">
                  <user.icon size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="font-display text-sm tracking-tight uppercase leading-none mb-2">{user.name}</h4>
                  <div className="text-[10px] font-bold text-accent uppercase tracking-widest">
                    {user.role}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-400 mt-2 font-bold uppercase tracking-widest">
                    <MapPin size={12} /> CAMPUS HUB
                  </div>
                </div>
              </div>

              <p className="text-xs font-medium text-zinc-500 mb-8 leading-relaxed flex-1 italic">
                "{user.bio}"
              </p>

              <div className="space-y-6 mt-auto">
                <div className="flex flex-wrap gap-2">
                  {user.skills.map(skill => (
                    <span key={skill} className="tag-ink bg-zinc-100 text-zinc-600 border border-border-subtle group-hover:border-accent/30 transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="p-4 bg-accent-muted/20 border-l-4 border-accent">
                  <p className="text-[10px] font-extrabold text-accent uppercase tracking-[0.15em] mb-2">Đang tìm kiếm:</p>
                  <p className="text-[11px] font-bold text-ink uppercase">{user.lookingFor}</p>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 py-3 bg-ink text-white text-[10px] font-display tracking-widest uppercase hover:bg-accent transition-all flex items-center justify-center gap-2">
                    <Handshake size={14} /> BẮT TAY NGAY
                  </button>
                  <button className="w-12 h-12 border-2 border-ink flex items-center justify-center text-ink hover:bg-ink hover:text-white transition-all">
                    <MessageSquare size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredUsers.length === 0 && (
        <div className="py-20 text-center border-t border-border-subtle">
          <Users size={48} className="mx-auto text-zinc-200 mb-4" />
          <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Không tìm thấy cộng sự phù hợp.</p>
        </div>
      )}
    </div>
  );
}
