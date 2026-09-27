import type {QuizQuestion, QuizSet} from '@site/src/components/Quiz/types';
import {tongQuan} from './01-tong-quan';
import {tienTrinhLapLich} from './02-tien-trinh-lap-lich';
import {dongBo} from './03-dong-bo';
import {deadlock} from './04-deadlock';
import {boNho} from './05-bo-nho';
import {phanTrang} from './06-phan-trang';
import {boNhoAo} from './07-bo-nho-ao';
import {diaIO} from './08-dia-io';
import {heThongFile} from './09-he-thong-file';

/** Thêm bộ câu hỏi mới: tạo file trong thư mục này rồi khai báo vào mảng. */
export const osQuizSets: QuizSet[] = [tongQuan, tienTrinhLapLich, dongBo, deadlock, boNho, phanTrang, boNhoAo, diaIO, heThongFile];

/** Nguồn cho trang đề tổng hợp — Quiz tự trộn và cắt theo prop `limit`. */
export const allOsQuestions: QuizQuestion[] = osQuizSets.flatMap((set) => set.questions);
