import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Megaphone, Calculator, Sparkles, Plus, DollarSign, Target, Calendar, CheckSquare } from "lucide-react";
import { generateWorkshopPlan } from "../services/gemini";
import { WorkshopAnalysis } from "../types";

export default function ProductionWorkshop() {
  const [businessInfo, setBusinessInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<WorkshopAnalysis | null>(null);

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessInfo) return;

    setLoading(true);
    try {
      const result = await generateWorkshopPlan(businessInfo);
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      alert("Đã có lỗi khi tạo kế hoạch Workshop.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_350px] gap-12">
        <div className="space-y-12">
          {!analysis ? (
             <section className="card-bold border-ink border-b-4">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 bg-accent text-white flex items-center justify-center font-display text-2xl">
                  <Sparkles size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-display">WORKSHOP AI</h3>
                  <p className="text-xs font-bold text-zinc-400 tracking-widest uppercase">Nhập thông tin, Mentor AI sẽ lập lộ trình thực thi</p>
                </div>
              </div>
  
              <form onSubmit={handleGeneratePlan} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-2">Chi tiết mô hình & ngân sách dự kiến</label>
                  <textarea
                    value={businessInfo}
                    onChange={(e) => setBusinessInfo(e.target.value)}
                    placeholder="Ví dụ: Cửa hàng bán móc khóa thủ công tại ký túc xá Đại học Kinh tế. Vốn 5 triệu, mục tiêu tiếp cận sinh viên năm 1..."
                    rows={6}
                    className="w-full bg-white border-2 border-ink px-4 py-4 focus:outline-none focus:border-accent transition-colors text-sm font-medium resize-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-5 flex items-center justify-center gap-3 font-display text-sm tracking-widest transition-all
                    ${loading ? 'bg-zinc-200 text-zinc-500' : 'bg-ink text-white hover:bg-accent'}`}
                >
                  {loading ? "ĐANG LẬP KẾ HOẠCH..." : "BẮT ĐẦU WORKSHOP"}
                </button>
              </form>
            </section>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="flex items-center justify-between border-b-4 border-ink pb-4">
                <h3 className="text-3xl font-display">CHIẾN DỊCH THỰC THI</h3>
                <button onClick={() => setAnalysis(null)} className="text-[10px] font-bold uppercase tracking-widest hover:text-accent">Làm lại [x]</button>
              </div>

              <div className="grid gap-8">
                {analysis.marketing.map((plan, idx) => (
                  <div key={idx} className="card-bold group hover:border-accent">
                    <div className="flex items-center justify-between mb-6">
                      <span className="tag-ink group-hover:bg-accent">
                        {plan.platform}
                      </span>
                      <Target size={14} className="text-zinc-300" />
                    </div>
                    <h5 className="font-display text-sm leading-tight mb-6 group-hover:text-accent transition-colors">{plan.contentIdea}</h5>
                    
                    {plan.action_items && (
                      <div className="space-y-2 mb-6">
                        {plan.action_items.map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-[10px] font-bold text-zinc-500 uppercase">
                            <CheckSquare size={10} className="mt-0.5 text-accent" />
                            {item}
                          </div>
                        ))}
                      </div>
                    )}

                    {plan.seven_day_schedule && (
                      <div className="mt-8 overflow-x-auto">
                         <h6 className="text-[10px] font-black text-accent uppercase tracking-widest mb-4">Lộ trình triển khai 7 ngày</h6>
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-ink">
                              <th className="py-2 text-[9px] font-black uppercase tracking-widest text-zinc-400 w-16">Ngày</th>
                              <th className="py-2 text-[9px] font-black uppercase tracking-widest text-zinc-400">Kênh</th>
                              <th className="py-2 text-[9px] font-black uppercase tracking-widest text-zinc-400">Nội dung</th>
                              <th className="py-2 text-[9px] font-black uppercase tracking-widest text-zinc-400 text-right">Ngân sách</th>
                            </tr>
                          </thead>
                          <tbody>
                            {plan.seven_day_schedule.map((day, i) => (
                              <tr key={i} className="border-b border-border-subtle group/row hover:bg-zinc-50 transition-colors">
                                <td className="py-3 text-[10px] font-display uppercase">{day.day}</td>
                                <td className="py-3 text-[10px] font-bold uppercase">{day.channel}</td>
                                <td className="py-3 text-[10px] font-medium leading-relaxed">{day.content}</td>
                                <td className="py-3 text-[10px] font-display text-right">{day.budget}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    <div className="pt-6 border-t border-border-subtle flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Tần suất</span>
                        <span className="text-[10px] font-bold uppercase">{plan.frequency}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Dự toán</span>
                        <span className="text-[10px] font-bold text-accent">{plan.estimatedCost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card-bold border-l-4 border-accent">
                  <h6 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Điểm hòa vốn</h6>
                  <p className="text-xl font-display">{analysis.financial.break_even_point}</p>
                </div>
                <div className="card-bold border-l-4 border-accent">
                  <h6 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Hoàn vốn dự kiến</h6>
                  <p className="text-xl font-display">{analysis.financial.payback_period}</p>
                </div>
                <div className="card-bold border-l-4 border-accent">
                  <h6 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Burn Rate (Tháng)</h6>
                  <p className="text-xl font-display">{analysis.financial.burn_rate}</p>
                </div>
                <div className="card-bold border-l-4 border-accent">
                  <h6 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-4">Biên lợi nhuận</h6>
                  <p className="text-[10px] font-bold leading-relaxed">{analysis.financial.margin_analysis}</p>
                </div>
              </div>

              <div className="ai-sidebar-shadow rounded-none">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <div className="text-[10px] font-display">LỜI KHUYÊN TÀI CHÍNH</div>
                </div>
                <p className="text-sm italic font-medium leading-relaxed">
                  {analysis.financial.advice}
                </p>
              </div>
            </motion.div>
          )}
        </div>

        <div className="space-y-8">
          <section className="card-bold bg-zinc-50">
            <h4 className="font-display text-xs tracking-widest flex items-center gap-2 mb-6 uppercase">
              <Calculator size={14} className="text-accent" /> CÔNG CỤ TÍNH
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-white border border-border-subtle">
                <h6 className="text-[9px] font-black text-zinc-400 uppercase mb-2">Giá vốn bình quân</h6>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">- VNĐ</span>
                  <Plus size={12} className="text-zinc-300" />
                </div>
              </div>
              <div className="p-4 bg-white border border-border-subtle">
                <h6 className="text-[9px] font-black text-zinc-400 uppercase mb-2">Giá bán dự kiến</h6>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">- VNĐ</span>
                  <Plus size={12} className="text-zinc-300" />
                </div>
              </div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase italic pt-4 leading-relaxed">
                Nhập chi tiết mô hình vào Mentor AI để nhận dự toán tài chính tự động.
              </p>
            </div>
          </section>

          <section className="card-bold border-dashed">
            <div className="flex items-center gap-3 mb-4">
              <Calculator className="text-zinc-300" size={16} />
              <h5 className="text-[10px] font-display uppercase tracking-widest">MARKETING "0 ĐỒNG"</h5>
            </div>
            <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
              Chiến lược tập trung vào nội dung viral và cộng đồng Campus để giảm tối đa chi phí quảng cáo.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
