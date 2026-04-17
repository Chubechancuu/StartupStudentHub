import { motion } from "motion/react";
import { ArrowRight, TrendingUp, ShieldCheck, Zap, Lightbulb, LayoutDashboard, GraduationCap, Users } from "lucide-react";

interface HomeProps {
  onStartIdea: () => void;
}

export default function Home({ onStartIdea }: HomeProps) {
  const levels = [
    {
      num: "01",
      title: "Idea Stage",
      desc: "Khơi gợi & Hình thành ý tưởng",
      tools: [
        { name: "AI Idea Validator", desc: "Phân tích SWOT và tiềm năng thị trường cho ý tưởng của bạn.", tag: "PHÒNG LAB" },
        { name: "Case Study Lab", desc: "Bài học từ 500+ dự án khởi nghiệp sinh viên thành công." }
      ]
    },
    {
      num: "02",
      title: "Foundation",
      desc: "Kỹ năng & Xây dựng mô hình",
      highlight: true,
      tools: [
        { name: "Lean Canvas Builder", desc: "Xây dựng mô hình kinh doanh tinh gọn 9 bước cùng AI.", tag: "XƯỞNG SẢN XUẤT" },
        { name: "Team Matching", desc: "Tìm kiếm Co-founder: IT, Design hoặc Marketing.", tag: "SÀN KẾT NỐI" }
      ]
    },
    {
      num: "03",
      title: "Execution",
      desc: "Triển khai & Pháp lý",
      tools: [
        { name: "Legal Assistant", desc: "Thủ tục đăng ký kinh doanh và tối ưu mã số thuế.", tag: "TRUNG TÂM PHÁP LÝ" },
        { name: "Growth Planner", desc: "Chiến dịch Marketing 0 đồng trên TikTok & Shopee." }
      ]
    },
    {
      num: "04",
      title: "Funding",
      desc: "Gọi vốn & Scale-up",
      tools: [
        { name: "Pitch Deck Gen", desc: "Tạo file thuyết trình gọi vốn chuyên nghiệp trong 5 phút." },
        { name: "Mentor Network", desc: "Kết nối trực tiếp với các Shark và Cựu sinh viên." }
      ]
    }
  ];

  return (
    <div className="space-y-16">
      <section className="flex flex-col md:flex-row justify-between items-start gap-12 py-10">
        <div className="max-w-xl">
          <h2 className="text-6xl font-display leading-[0.9] mb-6">
            BIẾN <span className="text-accent">Ý TƯỞNG</span><br />THÀNH HIỆN THỰC.
          </h2>
          <p className="text-zinc-500 font-medium leading-relaxed">
            Hành trình 4 năm Đại học không chỉ là lên lớp. Hãy bắt đầu xây dựng sự nghiệp kinh doanh của riêng bạn ngay hôm nay với sự hỗ trợ của AI Mentor.
          </p>
        </div>
        
        <div className="ai-sidebar-shadow max-w-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <div className="text-[10px] font-display">AI STARTUP MENTOR</div>
          </div>
          <p className="text-sm italic font-medium leading-relaxed">
            "Chào bạn, hành trình startup vạn dặm bắt đầu từ một bước chân. Bạn đã sẵn sàng kiểm chứng ý tưởng 'điên rồ' nhất của mình chưa?"
          </p>
          <button 
            onClick={onStartIdea}
            className="mt-6 flex items-center gap-2 text-accent font-bold text-xs group"
          >
            BẮT ĐẦU NGAY <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {levels.map((level) => (
          <div 
            key={level.num} 
            className={`year-column-line ${level.highlight ? 'border-accent bg-accent-muted/30 px-4 -mx-4' : 'border-ink'}`}
          >
            <div className={`year-num-xl ${level.highlight ? 'text-accent opacity-80' : ''}`}>
              {level.num}
            </div>
            <div className="label-bold">{level.title}</div>
            
            <div className="space-y-4">
              {level.tools.map((tool) => (
                <div key={tool.name} className="card-bold hover:border-accent group cursor-pointer">
                  <h3 className="text-sm font-extrabold mb-2 group-hover:text-accent transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">
                    {tool.desc}
                  </p>
                  {tool.tag && (
                    <div className="mt-4">
                      <span className="tag-ink">{tool.tag}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      <div className="flex items-center gap-10 py-6 border-t border-border-subtle text-[10px] font-bold tracking-[0.2em] text-zinc-400">
        <div>CHẾ ĐỘ: <span className="active-mode-pill">LEARNING MODE</span></div>
        <div>TRẠNG THÁI: SẴN SÀNG KHỞI NGHIỆP</div>
        <div className="ml-auto">© 2026 STARTUP STUDENT HUB — VIETNAM</div>
      </div>
    </div>
  );
}
