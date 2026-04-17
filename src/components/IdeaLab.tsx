import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, Star, AlertTriangle, CheckCircle2, TrendingUp, History, Trash2, Plus, Lightbulb, ArrowRight, Target, Brain, ShieldAlert, Scale } from "lucide-react";
import { validateIdea } from "../services/gemini";
import { Idea, StudentYear } from "../types";

export default function IdeaLab() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [studentYear, setStudentYear] = useState<StudentYear>("year1");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Idea | null>(null);
  const [history, setHistory] = useState<Idea[]>(() => {
    const saved = localStorage.getItem("startup_ideas");
    return saved ? JSON.parse(saved) : [];
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;

    setLoading(true);
    try {
      const analysis = await validateIdea(title, description, studentYear);
      const newIdea: Idea = {
        id: Date.now().toString(),
        title,
        description,
        studentYear,
        ...analysis,
        timestamp: Date.now(),
      };
      
      const updatedHistory = [newIdea, ...history];
      setHistory(updatedHistory);
      localStorage.setItem("startup_ideas", JSON.stringify(updatedHistory));
      setResults(newIdea);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Đã có lỗi xảy ra khi phân tích ý tưởng.");
    } finally {
      setLoading(false);
    }
  };

  const deleteIdea = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter(i => i.id !== id);
    setHistory(updated);
    localStorage.setItem("startup_ideas", JSON.stringify(updated));
    if (results && results.id === id) setResults(null);
  };

  const years: { id: StudentYear; label: string }[] = [
    { id: 'year1', label: 'Năm 1' },
    { id: 'year2', label: 'Năm 2' },
    { id: 'year3', label: 'Năm 3' },
    { id: 'year4', label: 'Năm 4' },
  ];

  return (
    <div className="grid lg:grid-cols-[1fr_350px] gap-12">
      <div className="space-y-12">
        <section className="card-bold border-ink border-b-4">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-ink text-white flex items-center justify-center font-display text-2xl">
              <Brain size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-display uppercase">AUDIT Ý TƯỞNG STARUP</h3>
              <p className="text-xs font-bold text-zinc-400 tracking-widest uppercase mt-1">Phản biện thực chiến & Hoạch định lộ trình</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-4 gap-2">
              {years.map((y) => (
                <button
                  key={y.id}
                  type="button"
                  onClick={() => setStudentYear(y.id)}
                  className={`py-3 text-[10px] font-black uppercase tracking-widest border-2 transition-all
                    ${studentYear === y.id ? 'bg-ink text-white border-ink' : 'bg-white text-zinc-400 border-border-subtle hover:border-ink hover:text-ink'}`}
                >
                  {y.label}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-[10px] font-black text-ink uppercase tracking-widest mb-3">Tên dự án</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VÍ DỤ: ECO-CAMPUS REUSE"
                className="w-full bg-paper border-2 border-ink px-4 py-4 focus:outline-none focus:border-accent transition-colors font-black text-sm uppercase placeholder:opacity-30"
                required
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-ink uppercase tracking-widest mb-3">Mô tả chi tiết</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="GIẢI PHÁP CỦA BẠN LÀ GÌ? TẠI SAO NÓ KHÁC BIỆT?"
                rows={5}
                className="w-full bg-paper border-2 border-ink px-4 py-4 focus:outline-none focus:border-accent transition-colors resize-none text-sm font-bold placeholder:text-[10px]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-6 flex items-center justify-center gap-3 font-display text-sm tracking-[0.2em] transition-all
                ${loading ? 'bg-zinc-200 text-zinc-500' : 'bg-accent text-white hover:bg-ink'}`}
            >
              {loading ? "ĐANG AUDIT Ý TƯỞNG..." : "GỬI MENTOR PHẢN BIỆN"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>
        </section>

        <AnimatePresence mode="wait">
          {results && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="card-bold border-accent border-l-8"
            >
              <div className="flex items-start justify-between mb-12">
                <div className="flex items-center gap-8">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-4xl font-display text-accent leading-none mb-1">{results.score.urgency}</div>
                      <div className="text-[8px] font-black uppercase text-zinc-400">CẤP THIẾT</div>
                    </div>
                    <div className="text-center border-x border-border-subtle px-4">
                      <div className="text-4xl font-display text-accent leading-none mb-1">{results.score.feasibility}</div>
                      <div className="text-[8px] font-black uppercase text-zinc-400">KHẢ THI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-display text-accent leading-none mb-1">{results.score.profitability}</div>
                      <div className="text-[8px] font-black uppercase text-zinc-400">SINH LỜI</div>
                    </div>
                  </div>
                  <div className="h-12 w-px bg-border-subtle mx-4" />
                  <div>
                    <span className={`px-2 py-1 text-[11px] font-black uppercase tracking-widest ${
                      results.verdict === 'KHẢ THI' ? 'bg-accent text-white' : 
                      results.verdict === 'CẦN CHỈNH SỬA' ? 'bg-yellow-400 text-black' : 'bg-red-500 text-white'
                    }`}>
                      [{results.verdict}]
                    </span>
                    <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-2 ml-1">KẾT LUẬN CỦA MENTOR</p>
                  </div>
                </div>
                <button onClick={() => setResults(null)} className="text-[10px] font-black uppercase tracking-widest hover:text-red-500">
                  XÓA KẾT QUẢ [X]
                </button>
              </div>

              <div className="bg-red-50 border-2 border-red-500 p-6 mb-12 flex gap-6 items-start">
                <ShieldAlert className="text-red-500 shrink-0" size={32} />
                <div>
                  <h6 className="text-red-500 font-display text-xs tracking-widest mb-2 uppercase">ĐIỂM YẾU CHẾ NGƯỜI (FATAL FLAW)</h6>
                  <p className="text-xs font-bold text-ink leading-relaxed">{results.fatal_flaw}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-[1fr_250px] gap-12">
                <div className="space-y-12">
                   <div className="year-column-line border-accent">
                    <div className="label-bold tracking-[0.3em]">LỘ TRÌNH CHI TIẾT — {results.roadmap.year}</div>
                    <div className="p-6 bg-accent-muted/10 border border-accent/20">
                      <h4 className="font-display text-sm mb-4">MỤC TIÊU LỚN: {results.roadmap.goal}</h4>
                      <div className="space-y-6">
                        <div>
                          <h5 className="text-[10px] font-black uppercase tracking-widest mb-3 text-accent underline">CÔNG VIỆC CẦN LÀM</h5>
                          <ul className="space-y-2">
                            {results.roadmap.tasks.map((t, i) => (
                              <li key={i} className="text-xs font-bold leading-relaxed flex gap-2">
                                <span className="text-accent">→</span> {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-black uppercase tracking-widest mb-3 text-accent underline">KỸ NĂNG CẦN HỌC</h5>
                          <div className="flex flex-wrap gap-2">
                            {results.roadmap.skills.map((s, i) => (
                              <span key={i} className="tag-ink !bg-accent">{s}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ai-sidebar-shadow rounded-none !p-8">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <div className="text-[10px] font-display uppercase tracking-widest">PHÂN TÍCH SWOT CHUYÊN SÂU</div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 text-[11px] leading-relaxed">
                      <div>
                        <div className="text-accent font-black mb-3 text-[10px] tracking-widest uppercase">Strengths [+]</div>
                        <ul className="space-y-2 opacity-80">{results.swot.strengths.map((s, i) => <li key={i}>• {s}</li>)}</ul>
                      </div>
                      <div>
                        <div className="text-accent font-black mb-3 text-[10px] tracking-widest uppercase">Weaknesses [-]</div>
                        <ul className="space-y-2 opacity-80">{results.swot.weaknesses.map((s, i) => <li key={i}>• {s}</li>)}</ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="card-bold !p-5 border-2 border-ink bg-zinc-50">
                    <h6 className="text-[10px] font-black uppercase tracking-widest mb-6 border-b border-border-subtle pb-3 flex items-center gap-2">
                       <Scale size={14} className="text-accent" /> PHÁP LÝ: {results.legal_checklist.phase}
                    </h6>
                    <div className="space-y-6">
                      <div>
                        <span className="text-[9px] font-black text-accent uppercase tracking-widest block mb-1">Loại hình gợi ý</span>
                        <p className="text-[10px] font-bold leading-tight">{results.legal_checklist.suitable_type}</p>
                      </div>
                      
                      <div>
                        <span className="text-[9px] font-black text-accent uppercase tracking-widest block mb-1">Các bước thực hiện</span>
                        <ul className="space-y-3">
                          {results.legal_checklist.steps.map((s, i) => (
                            <li key={i} className="text-[9px] font-bold leading-tight flex gap-2">
                              <span className="text-accent">{i + 1}.</span>
                              <div>
                                <span className="block uppercase underline">{s.step}</span>
                                <span className="opacity-60">{s.details}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {results.legal_checklist.specialized_licenses.length > 0 && (
                        <div>
                          <span className="text-[9px] font-black text-accent uppercase tracking-widest block mb-1">Giấy phép chuyên ngành</span>
                          <ul className="space-y-1">
                            {results.legal_checklist.specialized_licenses.map((l, i) => (
                              <li key={i} className="text-[9px] font-bold">• {l}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <span className="text-[9px] font-black text-accent uppercase tracking-widest block mb-2">Mẫu văn bản nhanh</span>
                        <div className="bg-white border border-border-subtle p-3 space-y-3">
                          {results.legal_checklist.sample_clauses.map((c, i) => (
                            <div key={i} className="text-[8px] font-medium italic border-b border-zinc-100 pb-2 last:border-0">{c}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-bold bg-ink text-white">
                    <h6 className="text-[10px] font-black uppercase tracking-widest mb-4">Ghi chú Mentor</h6>
                    <p className="text-[11px] italic font-medium leading-relaxed opacity-70">
                      "{results.feedback}"
                    </p>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      <div className="space-y-8">
        <h4 className="font-display text-sm tracking-widest text-zinc-400 flex items-center gap-3">
          <History size={16} /> LỊCH SỬ DỰ ÁN
        </h4>

        <div className="space-y-4 max-h-[1000px] overflow-y-auto pr-2 custom-scrollbar">
          {history.length === 0 ? (
            <div className="py-20 text-center border-t border-border-subtle">
              <p className="text-zinc-400 text-[11px] font-extrabold uppercase tracking-widest">Chưa có bản phân tích nào</p>
            </div>
          ) : (
            history.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => setResults(item)}
                className={`group p-6 border-2 transition-all cursor-pointer relative
                  ${results?.id === item.id ? 'bg-white border-accent' : 'bg-white border-border-subtle hover:border-ink'}`}
              >
                <div className="flex items-start justify-between gap-2 mb-4">
                  <h5 className="font-display text-[11px] flex-1 uppercase tracking-tight leading-tight">{item.title}</h5>
                  <button 
                    onClick={(e) => deleteIdea(item.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em]">
                  <span className="text-zinc-300">{item.studentYear === 'year1' ? 'NĂM 1' : item.studentYear === 'year2' ? 'NĂM 2' : item.studentYear === 'year3' ? 'NĂM 3' : 'NĂM 4'}</span>
                  <div className="text-accent">
                    SCORE: {item.score.feasibility}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
