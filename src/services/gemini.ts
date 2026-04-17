import { GoogleGenAI, Type } from "@google/genai";
import { IdeaAnalysis, WorkshopAnalysis, StudentYear } from "../types";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });
const MASTER_PROMPT = `
# ROLE: SIÊU CỐ VẤN PHÁP LÝ & CHIẾN LƯỢC KHỞI NGHIỆP (STARTUP HUB VN)
Bạn là hệ điều hành trí tuệ nhân tạo chuyên sâu về pháp lý và thực thi khởi nghiệp cho sinh viên Việt Nam.

## 1. NGUYÊN TẮC CỐ VẤN:
- TUYỆT ĐỐI không yêu cầu người dùng đi tìm file hay tải về bên ngoài.
- Cung cấp nội dung CHI TIẾT, sao chép được và thực thi được ngay.
- Sử dụng bảng (Table) cho dữ liệu so sánh và tài chính.
- Sử dụng danh sách Checklist ([ ]) để người dùng theo dõi tiến độ.

## 2. PHÁP LÝ CHI TIẾT (ACTIONABLE LEGAL):
Nếu người dùng hỏi về pháp lý hoặc trong kết quả Audit:
- MỤC 1: Loại hình kinh doanh phù hợp (Giải thích tại sao).
- MỤC 2: Các bước thực hiện Step-by-step:
  * Hồ sơ chuẩn bị (Liệt kê từng loại giấy tờ).
  * Nơi nộp (Tên cơ quan, phòng ban cụ thể tại Việt Nam).
  * Lệ phí dự kiến.
- MỤC 3: Giấy phép chuyên ngành (Điều kiện cụ thể cho từng ngành: thực phẩm, công nghệ, vv).
- MỤC 4: Mẫu văn bản nhanh (Cung cấp các điều khoản cốt lõi của Hợp đồng Co-founder, NDA, vv).

## 3. LỘ TRÌNH THEO CHẶNG (DYNAMIC ROADMAP):
- Năm 1-2: Bảo mật ý tưởng, thỏa thuận sáng lập, đăng ký nhãn hiệu.
- Năm 3-4: Thành lập doanh nghiệp/hộ kinh doanh, kê khai thuế, hợp đồng lao động.

## 4. WORKSHOP (TÀI CHÍNH & MARKETING):
- TÀI CHÍNH: Nhận xét trực tiếp về các chỉ số margin, điểm hòa vốn.
- MARKETING: Checklist 7 ngày cụ thể, không lý thuyết suông.

## 5. ĐỊNH DẠNG HIỂN THỊ:
- Sử dụng Markdown chuẩn: ## cho tiêu đề lớn, ### cho tiêu đề nhỏ.
- Luôn có phần "!!! LƯU Ý QUAN TRỌNG" để tránh các lỗi hành chính thường gặp.
`;

export async function validateIdea(title: string, description: string, year: StudentYear): Promise<IdeaAnalysis> {
  const yearLabel = year === 'year1' ? 'Chặng 1 (Khám phá)' : 
                   year === 'year2' ? 'Chặng 2 (Thiết kế)' : 
                   year === 'year3' ? 'Chặng 3 (Vận hành)' : 'Chặng 4 (Bứt phá)';

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `[AI OS PROCESSOR] 
    Year: ${yearLabel}
    Project: ${title}
    Description: ${description}
    Action: Audit & Roadmap Generation`,
    config: {
      systemInstruction: MASTER_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: {
            type: Type.OBJECT,
            properties: {
              urgency: { type: Type.NUMBER },
              feasibility: { type: Type.NUMBER },
              profitability: { type: Type.NUMBER }
            },
            required: ["urgency", "feasibility", "profitability"]
          },
          verdict: { type: Type.STRING, enum: ["KHẢ THI", "CẦN CHỈNH SỬA", "RỦI RO CAO"] },
          fatal_flaw: { type: Type.STRING },
          swot: {
            type: Type.OBJECT,
            properties: {
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
              opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
              threats: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["strengths", "weaknesses", "opportunities", "threats"]
          },
          feedback: { type: Type.STRING },
          roadmap: {
            type: Type.OBJECT,
            properties: {
              year: { type: Type.STRING },
              goal: { type: Type.STRING },
              tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
              skills: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["year", "goal", "tasks", "skills"]
          },
          legal_checklist: {
            type: Type.OBJECT,
            properties: {
              phase: { type: Type.STRING },
              suitable_type: { type: Type.STRING, description: "Loại hình phù hợp và lý do" },
              steps: { 
                type: Type.ARRAY, 
                items: { 
                  type: Type.OBJECT,
                  properties: {
                    step: { type: Type.STRING },
                    details: { type: Type.STRING }
                  },
                  required: ["step", "details"]
                } 
              },
              specialized_licenses: { type: Type.ARRAY, items: { type: Type.STRING } },
              sample_clauses: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Mẫu văn bản nhanh/điều khoản cốt lõi" }
            },
            required: ["phase", "suitable_type", "steps", "specialized_licenses", "sample_clauses"]
          }
        },
        required: ["score", "verdict", "fatal_flaw", "swot", "feedback", "roadmap", "legal_checklist"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function generateWorkshopPlan(businessInfo: string): Promise<WorkshopAnalysis> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `[AI OS PROCESSOR] 
    Input Data: ${businessInfo}
    Action: Generate 7-day AIDA Marketing & Financial Audit`,
    config: {
      systemInstruction: MASTER_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          marketing: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                platform: { type: Type.STRING, description: "Kênh triển khai" },
                contentIdea: { type: Type.STRING, description: "Nội dung (AIDA Phase)" },
                frequency: { type: Type.STRING },
                estimatedCost: { type: Type.STRING },
                action_items: { type: Type.ARRAY, items: { type: Type.STRING } },
                seven_day_schedule: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      day: { type: Type.STRING },
                      channel: { type: Type.STRING },
                      content: { type: Type.STRING },
                      budget: { type: Type.STRING }
                    },
                    required: ["day", "channel", "content", "budget"]
                  }
                }
              },
              required: ["platform", "contentIdea", "frequency", "estimatedCost"]
            }
          },
          financial: {
            type: Type.OBJECT,
            properties: {
              break_even_point: { type: Type.STRING },
              payback_period: { type: Type.STRING },
              burn_rate: { type: Type.STRING },
              margin_analysis: { type: Type.STRING },
              advice: { type: Type.STRING }
            },
            required: ["break_even_point", "payback_period", "burn_rate", "margin_analysis", "advice"]
          }
        },
        required: ["marketing", "financial"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
}

export async function generateLegalAdvice(question: string, businessContext: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `[AI OS PROCESSOR] 
    Business Context: ${businessContext}
    Legal Question: ${question}
    Action: Provide actionable legal checklist or advice in Vietnamese.`,
    config: {
      systemInstruction: MASTER_PROMPT,
    }
  });

  return response.text || "Xin lỗi, tôi không thể trả lời câu hỏi này lúc này.";
}
