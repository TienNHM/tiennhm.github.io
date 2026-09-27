/** Đáp án: 1 số (chọn một) hoặc mảng số (chọn nhiều). Index tính từ 0. */
export type QuizAnswer = number | number[];

export interface QuizQuestion {
  /** Ổn định theo thời gian — dùng làm khoá lưu bài làm. */
  id: string;
  question: string;
  /** Khối code/bảng số liệu kèm đề, hiển thị dạng <pre>. */
  code?: string;
  options: string[];
  answer: QuizAnswer;
  /** Hỗ trợ **đậm**, `code`, xuống dòng và gạch đầu dòng "- ". */
  explanation: string;
  topic?: string;
  /** Nguồn đề, ví dụ "Cuối kỳ HK1 2023-2024". */
  source?: string;
}

export interface QuizSet {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
}
