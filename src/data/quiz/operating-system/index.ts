import type {QuizQuestion, QuizSet} from '@site/src/components/Quiz/types';
import {overview} from './01-overview';
import {processScheduling} from './02-process-scheduling';
import {synchronization} from './03-synchronization';
import {deadlock} from './04-deadlock';
import {memoryManagement} from './05-memory-management';
import {paging} from './06-paging';
import {virtualMemory} from './07-virtual-memory';
import {diskIO} from './08-disk-io';
import {fileSystem} from './09-file-system';

/** Thêm bộ câu hỏi mới: tạo file trong thư mục này rồi khai báo vào mảng. */
export const osQuizSets: QuizSet[] = [
  overview,
  processScheduling,
  synchronization,
  deadlock,
  memoryManagement,
  paging,
  virtualMemory,
  diskIO,
  fileSystem,
];

/** Nguồn cho trang đề tổng hợp — Quiz tự trộn và cắt theo prop `limit`. */
export const allOsQuestions: QuizQuestion[] = osQuizSets.flatMap((set) => set.questions);
