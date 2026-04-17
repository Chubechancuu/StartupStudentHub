import React, { useState } from "react";
import { Filter, BookOpen, Shield, HelpCircle, FileText, Scale, Sparkles, Gavel, CheckSquare, AlertCircle, Copy, Check } from "lucide-react";
import { generateLegalAdvice } from "../services/gemini";
import Markdown from "react-markdown";

export default function LegalCenter() {
  const [question, setQuestion] = useState("");
  const [businessContext, setBusinessContext] = useState("");
  const [studentYear, setStudentYear] = useState("year1");
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateReport = async () => {
    if (!businessContext) return;
    setLoading(true);
    setReport(null);
    try {
      const prompt = `Lập báo cáo pháp lý chi tiết cho dự án: ${businessContext}. Giai đoạn: ${studentYear === 'year1' ? 'Năm 1' : studentYear === 'year2' ? 'Năm 2' : studentYear === 'year3' ? 'Năm 3' : 'Năm 4'}.`;
      const response = await generateLegalAdvice(prompt, businessContext);
      setReport(response);
    } catch (error) {
      console.error(error);
      setReport("Có lỗi xảy ra khi kết nối với Mentor AI.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (report) {
      navigator.clipboard.writeText(report);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-12">
      <div className="max-w-3xl border-b-4 border-ink pb-8">
        <h3 className="text-5xl font-display leading-none uppercase">PHÁP LÝ & TÀI NGUYÊN</h3>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-zinc-400 mt-4">AI-POWERED LEGAL AUDIT & ACTIONABLE CONTENT</p>
      </div>

      <div className="grid lg:grid-cols-[450px_1fr] gap-12">
        {/* Left Column: Form */}
        <div className="space-y-8">
          <section className="card-bold border-accent bg-accent/5">
            <div className="flex items-center gap-3 mb-6">
              <Scale className="text-accent" size={24} />
              <h4 className="text-xl font-display uppercase tracking-tight">CỐ VẤN PHÁP LÝ AI</h4>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Chặng đường hiện tại</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: "year1", label: "Năm 1-2 (Idea)" },
                    { id: "year3", label: "Năm 3-4 (Execution)" }
                  ].map(y => (
                    <button
                      key={y.id}
                      onClick={() => setStudentYear(y.id)}
                      className={`py-3 text-[10px] font-bold uppercase tracking-widest border-2 transition-all
                        ${studentYear === y.id ? 'bg-ink text-white border-ink' : 'bg-white border-border-subtle hover:border-ink'}`}
                    >
                      {y.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-2">Mô tả dự án của bạn</label>
                <textarea 
                  rows={4}
                  value={businessContext}
                  onChange={(e) => setBusinessContext(e.target.value)}
                  placeholder="Ví dụ: App ship đồ ăn vặt, nền tảng học tập nhóm, dịch vụ in ấn 3D..."
                  className="w-full bg-white border-2 border-ink px-4 py-3 text-xs focus:outline-none focus:border-accent transition-all resize-none font-bold placeholder:opacity-50"
                />
              </div>

              <button 
                onClick={handleGenerateReport}
                disabled={loading || !businessContext}
                className="w-full py-5 bg-accent text-white font-display text-sm tracking-widest uppercase hover:bg-ink transition-all disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? "ĐANG PHÂN TÍCH..." : (
                  <>
                    <Sparkles size={18} />
                    XUẤT BÁO CÁO PHÁP LÝ
                  </>
                )}
              </button>
            </div>
          </section>

          <section className="card-bold bg-zinc-50 border-dashed">
            <h5 className="text-[10px] font-black uppercase tracking-widest mb-4 flex items-center gap-2">
              <Shield size={14} className="text-accent" /> NỘI DUNG CAM KẾT
            </h5>
            <ul className="space-y-3 text-[10px] font-bold text-zinc-500 uppercase leading-relaxed">
              <li className="flex gap-2"><CheckSquare size={12} className="text-accent shrink-0" /> Không dùng file/link ảo</li>
              <li className="flex gap-2"><CheckSquare size={12} className="text-accent shrink-0" /> Hướng dẫn Step-by-step</li>
              <li className="flex gap-2"><CheckSquare size={12} className="text-accent shrink-0" /> Mẫu văn bản copy được</li>
              <li className="flex gap-2"><CheckSquare size={12} className="text-accent shrink-0" /> Cập nhật quy định 2024</li>
            </ul>
          </section>
        </div>

        {/* Right Column: AI Output */}
        <div className="space-y-12">
          {report ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between border-b-2 border-ink pb-4">
                <div className="flex items-center gap-2 text-accent">
                  <Gavel size={20} />
                  <span className="font-display text-lg uppercase">BÁO CÁO CHI TIẾT TỪ MENTOR AI</span>
                </div>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-accent transition-colors"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "ĐÃ SAO CHÉP" : "SAO CHÉP NỘI DUNG"}
                </button>
              </div>

              <div className="markdown-body p-8 bg-white border-2 border-ink shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] prose prose-sm max-w-none">
                <Markdown>{report}</Markdown>
              </div>

              <div className="p-6 bg-red-50 border-2 border-red-500 flex gap-4 items-start">
                <AlertCircle className="text-red-500 shrink-0" size={24} />
                <div>
                  <h6 className="text-red-500 font-display text-[10px] tracking-widest mb-1 uppercase">LƯU Ý QUAN TRỌNG</h6>
                  <p className="text-[11px] font-bold text-ink leading-relaxed uppercase">
                    Thông tin trên mang tính chất cố vấn bước đầu. Bạn nên tham chiếu thêm từ các văn phòng luật sư nếu dự án có quy mô lớn hoặc cần gọi vốn tập trung.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-20 text-center border-4 border-dashed border-zinc-200 opacity-50">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mb-6">
                <FileText size={32} className="text-zinc-300" />
              </div>
              <h4 className="font-display text-xl uppercase text-zinc-400">Chưa có báo cáo</h4>
              <p className="text-xs font-bold text-zinc-300 uppercase mt-2 tracking-widest">Hãy nhập mô tả dự án bên trái để Mentor AI xuất lộ trình pháp lý</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Access Tools */}
      <div className="border-t-4 border-ink pt-12">
        <h4 className="font-display text-2xl uppercase mb-8">CÔNG CỤ TRA CỨU NHANH</h4>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Hợp đồng Co-founder", desc: "Mẫu thỏa thuận phân chia cổ phần và quyền lợi nhóm.", type: "Tạo mẫu ngay" },
            { title: "Bảo mật ý tưởng (NDA)", desc: "Mẫu bảo mật thông tin khi đi pitching hoặc tìm cộng đối tác.", type: "Tạo mẫu ngay" },
            { title: "Mã ngành dịch vụ", desc: "Tra cứu mã ngành phù hợp cho các mô hình Startup phổ biến.", type: "Tra cứu AI" }
          ].map((tool, i) => (
            <button 
              key={i}
              onClick={() => {
                setQuestion(`Hãy cung cấp ${tool.title}: ${tool.desc}`);
                setBusinessContext(businessContext || "Dự án khởi nghiệp sinh viên");
                handleGenerateReport();
              }}
              className="card-bold hover:bg-accent hover:text-white group text-left transition-all"
            >
              <h5 className="font-display text-sm uppercase mb-2">{tool.title}</h5>
              <p className="text-[10px] font-bold opacity-60 uppercase leading-relaxed mb-6">{tool.desc}</p>
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent group-hover:text-white">
                <Sparkles size={12} />
                {tool.type}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
