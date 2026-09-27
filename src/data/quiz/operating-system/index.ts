import type {QuizQuestion, QuizSet} from '@site/src/components/Quiz/types';
import {tongQuan} from './01-tong-quan';
import {tienTrinhLapLich} from './02-tien-trinh-lap-lich';
import {dongBo} from './03-dong-bo';
import {deadlock} from './04-deadlock';
import {boNho} from './05-bo-nho';

/** Thêm bộ câu hỏi mới: tạo file trong thư mục này rồi khai báo vào mảng. */
export const osQuizSets: QuizSet[] = [tongQuan, tienTrinhLapLich, dongBo, deadlock, boNho];

/** Nguồn cho trang đề tổng hợp — Quiz tự trộn và cắt theo prop `limit`. */
export const allOsQuestions: QuizQuestion[] = osQuizSets.flatMap((set) => set.questions);
