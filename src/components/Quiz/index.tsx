import React, {useCallback, useEffect, useMemo, useState} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import {renderRich} from './renderRich';
import type {QuizAnswer, QuizQuestion} from './types';

export type {QuizAnswer, QuizQuestion, QuizSet} from './types';

/** practice: chấm ngay từng câu. exam: nộp bài rồi mới lộ đáp án. */
export type QuizMode = 'practice' | 'exam';

interface QuizProps {
  questions: QuizQuestion[];
  title?: string;
  /** Khoá lưu bài làm vào localStorage. Bỏ trống thì không lưu. */
  storageKey?: string;
  defaultMode?: QuizMode;
  shuffle?: boolean;
  shuffleOptions?: boolean;
  /** Có giá trị thì chế độ thi đếm ngược và tự nộp khi hết giờ. */
  durationMinutes?: number;
  /** % tối thiểu để tính Đạt. */
  passScore?: number;
  /** Chỉ lấy N câu (kết hợp shuffle để ra đề ngẫu nhiên). */
  limit?: number;
}

interface DeckItem {
  question: QuizQuestion;
  /** Thứ tự hiển thị các lựa chọn, phần tử là index gốc. */
  optionOrder: number[];
}

const LETTERS = 'ABCDEFGHIJ';

function normalizeAnswer(answer: QuizAnswer): number[] {
  return (Array.isArray(answer) ? [...answer] : [answer]).sort((a, b) => a - b);
}

function sameSelection(a: number[], b: number[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function shuffled<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function buildDeck(
  questions: QuizQuestion[],
  shuffleQuestions: boolean,
  shuffleOptions: boolean,
  limit?: number,
): DeckItem[] {
  const ordered = shuffleQuestions ? shuffled(questions) : questions;
  const picked = limit ? ordered.slice(0, limit) : ordered;
  return picked.map((question) => {
    const indexes = question.options.map((_, index) => index);
    return {
      question,
      optionOrder: shuffleOptions ? shuffled(indexes) : indexes,
    };
  });
}

function formatClock(totalSeconds: number): string {
  const safe = Math.max(0, totalSeconds);
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function Quiz({
  questions,
  title,
  storageKey,
  defaultMode = 'practice',
  shuffle = false,
  shuffleOptions = false,
  durationMinutes,
  passScore = 50,
  limit,
}: QuizProps): JSX.Element {
  // SSR dựng thứ tự gốc; xáo trộn để useEffect làm sau khi hydrate.
  const [deck, setDeck] = useState<DeckItem[]>(() =>
    buildDeck(questions, false, false, limit),
  );
  const [mode, setMode] = useState<QuizMode>(defaultMode);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [onlyWrong, setOnlyWrong] = useState(false);
  const [restored, setRestored] = useState(false);

  const fullKey = storageKey ? `quiz:${storageKey}` : null;

  // Khoá theo danh sách id, không theo identity mảng: prop truyền inline mới không lặp effect.
  const signature = useMemo(() => questions.map((question) => question.id).join('|'), [questions]);

  useEffect(() => {
    setDeck(buildDeck(questions, shuffle, shuffleOptions, limit));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature, shuffle, shuffleOptions, limit]);

  useEffect(() => {
    if (!fullKey) {
      setRestored(true);
      return;
    }
    try {
      const raw = window.localStorage.getItem(fullKey);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.answers) setAnswers(saved.answers);
        if (saved.checked) setChecked(saved.checked);
        if (saved.mode) setMode(saved.mode);
        if (saved.submitted) setSubmitted(true);
        if (typeof saved.elapsed === 'number') setElapsed(saved.elapsed);
      }
    } catch {
      // localStorage bị chặn (private mode) — bỏ qua, bài làm chỉ không được lưu.
    }
    setRestored(true);
  }, [fullKey]);

  useEffect(() => {
    if (!fullKey || !restored) return;
    try {
      window.localStorage.setItem(
        fullKey,
        JSON.stringify({answers, checked, mode, submitted, elapsed}),
      );
    } catch {
      // như trên
    }
  }, [fullKey, restored, answers, checked, mode, submitted, elapsed]);

  const limitSeconds = durationMinutes ? durationMinutes * 60 : null;

  // Chỉ đếm giờ ở chế độ thi — ôn tập khỏi re-render mỗi giây.
  useEffect(() => {
    if (mode !== 'exam' || submitted) return undefined;
    const timer = window.setInterval(() => setElapsed((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [mode, submitted]);

  useEffect(() => {
    if (mode === 'exam' && limitSeconds !== null && !submitted && elapsed >= limitSeconds) {
      setSubmitted(true);
    }
  }, [mode, limitSeconds, submitted, elapsed]);

  // Thống kê bám theo deck: có limit thì chỉ tính những câu được ra đề.
  const activeQuestions = useMemo(() => deck.map((item) => item.question), [deck]);
  const total = activeQuestions.length;

  const correctMap = useMemo(() => {
    const map: Record<string, number[]> = {};
    activeQuestions.forEach((question) => {
      map[question.id] = normalizeAnswer(question.answer);
    });
    return map;
  }, [activeQuestions]);

  const isCorrect = useCallback(
    (question: QuizQuestion) => {
      const selected = answers[question.id];
      const correct = correctMap[question.id];
      if (!correct || !selected || selected.length === 0) return false;
      return sameSelection([...selected].sort((a, b) => a - b), correct);
    },
    [answers, correctMap],
  );

  const answeredCount = useMemo(
    () => activeQuestions.filter((question) => (answers[question.id] ?? []).length > 0).length,
    [activeQuestions, answers],
  );

  const correctCount = useMemo(
    () => activeQuestions.filter((question) => isCorrect(question)).length,
    [activeQuestions, isCorrect],
  );

  const percent = total === 0 ? 0 : Math.round((correctCount / total) * 100);

  /** Câu đã "chốt": chế độ thi thì sau khi nộp, ôn tập thì sau khi kiểm tra. */
  const isGraded = useCallback(
    (question: QuizQuestion) =>
      mode === 'exam' ? submitted : Boolean(checked[question.id]),
    [mode, submitted, checked],
  );

  const handleSelect = useCallback(
    (question: QuizQuestion, optionIndex: number, multiple: boolean) => {
      if (mode === 'exam' ? submitted : checked[question.id]) return;

      setAnswers((previous) => {
        const current = previous[question.id] ?? [];
        if (!multiple) {
          return {...previous, [question.id]: [optionIndex]};
        }
        const next = current.includes(optionIndex)
          ? current.filter((value) => value !== optionIndex)
          : [...current, optionIndex];
        return {...previous, [question.id]: next};
      });

      // Chọn một: ôn tập chấm luôn, khỏi bắt bấm thêm nút.
      if (!multiple && mode === 'practice') {
        setChecked((previous) => ({...previous, [question.id]: true}));
      }
    },
    [mode, submitted, checked],
  );

  const handleReset = useCallback(() => {
    setAnswers({});
    setChecked({});
    setRevealed({});
    setSubmitted(false);
    setElapsed(0);
    setOnlyWrong(false);
    setDeck(buildDeck(questions, shuffle, shuffleOptions, limit));
    if (fullKey) {
      try {
        window.localStorage.removeItem(fullKey);
      } catch {
        // như trên
      }
    }
  }, [questions, shuffle, shuffleOptions, limit, fullKey]);

  const handleModeChange = useCallback(
    (next: QuizMode) => {
      if (next === mode) return;
      setMode(next);
      setChecked(
        next === 'practice'
          ? Object.fromEntries(
              Object.entries(answers)
                .filter(([, selected]) => selected.length > 0)
                .map(([id]) => [id, true]),
            )
          : {},
      );
      setRevealed({});
      setSubmitted(false);
      setOnlyWrong(false);
    },
    [mode, answers],
  );

  const visibleDeck = useMemo(
    () => (onlyWrong ? deck.filter((item) => !isCorrect(item.question)) : deck),
    [deck, onlyWrong, isCorrect],
  );

  const showScore = mode === 'exam' ? submitted : answeredCount > 0;
  const remaining = limitSeconds === null ? null : limitSeconds - elapsed;

  return (
    <section className={styles.quiz}>
      <header className={styles.toolbar}>
        <div className={styles.toolbarMain}>
          {title && <h3 className={styles.title}>{title}</h3>}
          <p className={styles.meta}>
            {total} câu · đã làm {answeredCount}
            {mode === 'exam' && limitSeconds !== null && !submitted && (
              <>
                {' · '}
                <span className={clsx(styles.clock, remaining! <= 60 && styles.clockLow)}>
                  còn {formatClock(remaining!)}
                </span>
              </>
            )}
          </p>
        </div>

        <div className={styles.modeSwitch} role="group" aria-label="Chế độ làm bài">
          <button
            type="button"
            className={clsx(styles.modeButton, mode === 'practice' && styles.modeButtonActive)}
            onClick={() => handleModeChange('practice')}
            aria-pressed={mode === 'practice'}>
            Ôn tập
          </button>
          <button
            type="button"
            className={clsx(styles.modeButton, mode === 'exam' && styles.modeButtonActive)}
            onClick={() => handleModeChange('exam')}
            aria-pressed={mode === 'exam'}>
            Thi thử
          </button>
        </div>
      </header>

      <p className={styles.hint}>
        {mode === 'practice'
          ? 'Chọn đáp án là biết đúng/sai ngay, bấm “Chi tiết” để xem giải thích.'
          : 'Làm hết rồi bấm “Nộp bài”. Đáp án và giải thích chỉ hiện sau khi nộp.'}
      </p>

      <div className={styles.progress} aria-hidden="true">
        <div
          className={styles.progressBar}
          style={{width: `${total === 0 ? 0 : (answeredCount / total) * 100}%`}}
        />
      </div>

      {showScore && (
        <div
          className={clsx(styles.score, percent >= passScore ? styles.scorePass : styles.scoreFail)}
          role="status">
          <div className={styles.scoreValue}>
            {correctCount}/{total}
            <span className={styles.scorePercent}>{percent}%</span>
          </div>
          <div className={styles.scoreNote}>
            {mode === 'exam'
              ? `${percent >= passScore ? 'Đạt' : 'Chưa đạt'} · thời gian ${formatClock(elapsed)}`
              : `Đang ôn tập · ${answeredCount}/${total} câu`}
          </div>
        </div>
      )}

      <ol className={styles.list}>
        {visibleDeck.map((item) => {
          const {question, optionOrder} = item;
          const correct = correctMap[question.id] ?? [];
          const multiple = correct.length > 1;
          const selected = answers[question.id] ?? [];
          const graded = isGraded(question);
          const questionCorrect = isCorrect(question);
          const number = deck.findIndex((entry) => entry.question.id === question.id) + 1;

          return (
            <li key={question.id} className={styles.card}>
              <div className={styles.cardHead}>
                <span className={styles.number}>Câu {number}</span>
                {multiple && <span className={styles.tag}>Chọn nhiều</span>}
                {question.topic && <span className={styles.tag}>{question.topic}</span>}
                {question.source && <span className={styles.tagMuted}>{question.source}</span>}
                {graded && (
                  <span className={clsx(styles.badge, questionCorrect ? styles.badgeOk : styles.badgeBad)}>
                    {questionCorrect ? 'Đúng' : 'Sai'}
                  </span>
                )}
              </div>

              <div className={styles.question}>{renderRich(question.question, question.id)}</div>
              {question.code && <pre className={styles.code}>{question.code}</pre>}

              <div className={styles.options}>
                {optionOrder.map((originalIndex, displayIndex) => {
                  const isSelected = selected.includes(originalIndex);
                  const isAnswer = correct.includes(originalIndex);
                  const inputId = `${question.id}-${originalIndex}`;

                  return (
                    <label
                      key={inputId}
                      htmlFor={inputId}
                      className={clsx(
                        styles.option,
                        isSelected && styles.optionSelected,
                        graded && isAnswer && styles.optionCorrect,
                        graded && isSelected && !isAnswer && styles.optionWrong,
                        graded && styles.optionLocked,
                      )}>
                      <input
                        id={inputId}
                        className={styles.input}
                        type={multiple ? 'checkbox' : 'radio'}
                        name={question.id}
                        checked={isSelected}
                        disabled={graded}
                        onChange={() => handleSelect(question, originalIndex, multiple)}
                      />
                      <span className={styles.letter}>{LETTERS[displayIndex]}</span>
                      <div className={styles.optionText}>
                        {renderRich(question.options[originalIndex], inputId)}
                      </div>
                    </label>
                  );
                })}
              </div>

              <div className={styles.cardActions}>
                {mode === 'practice' && multiple && !graded && (
                  <button
                    type="button"
                    className={styles.checkButton}
                    disabled={selected.length === 0}
                    onClick={() => setChecked((previous) => ({...previous, [question.id]: true}))}>
                    Kiểm tra
                  </button>
                )}
                {graded && (
                  <button
                    type="button"
                    className={styles.detailButton}
                    aria-expanded={Boolean(revealed[question.id])}
                    onClick={() =>
                      setRevealed((previous) => ({
                        ...previous,
                        [question.id]: !previous[question.id],
                      }))
                    }>
                    {revealed[question.id] ? 'Ẩn chi tiết' : 'Chi tiết'}
                  </button>
                )}
              </div>

              {graded && revealed[question.id] && (
                <div className={styles.explanation}>
                  <p className={styles.explanationHead}>
                    Đáp án đúng:{' '}
                    <strong>
                      {correct
                        .map((answerIndex) => LETTERS[optionOrder.indexOf(answerIndex)])
                        .join(', ')}
                    </strong>
                    {selected.length > 0 && !questionCorrect && (
                      <>
                        {' · bạn chọn '}
                        <strong>
                          {[...selected]
                            .sort((a, b) => a - b)
                            .map((selectedIndex) => LETTERS[optionOrder.indexOf(selectedIndex)])
                            .join(', ')}
                        </strong>
                      </>
                    )}
                    {selected.length === 0 && ' · bạn chưa chọn'}
                  </p>
                  {renderRich(question.explanation, `${question.id}-ex`)}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <footer className={styles.footer}>
        {mode === 'exam' && !submitted && (
          <button type="button" className={styles.primaryButton} onClick={() => setSubmitted(true)}>
            Nộp bài ({answeredCount}/{total})
          </button>
        )}
        {(submitted || answeredCount > 0) && correctCount < total && (
          <button
            type="button"
            className={styles.secondaryButton}
            aria-pressed={onlyWrong}
            onClick={() => setOnlyWrong((value) => !value)}>
            {onlyWrong ? 'Xem tất cả' : 'Chỉ xem câu sai'}
          </button>
        )}
        <button type="button" className={styles.secondaryButton} onClick={handleReset}>
          Làm lại
        </button>
      </footer>
    </section>
  );
}
