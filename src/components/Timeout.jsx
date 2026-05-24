// src/components/Timeout.jsx
import { useState, useEffect, useRef } from 'react'
import { TIMEOUT_QUESTIONS, getRandomMessage, checkAnswer } from '../data/mockData'

const EXAM_DURATION = 10 * 60 // 10 minutes for demo (configurable)

export default function Timeout({ subject, onBack, onResult }) {
  const questions = (TIMEOUT_QUESTIONS[subject.id] || TIMEOUT_QUESTIONS['math']).slice(0, 4)
  
  const [phase, setPhase] = useState('intro') // intro | exam | result
  const [answers, setAnswers] = useState(Array(questions.length).fill(''))
  const [qIndex, setQIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION)
  const [results, setResults] = useState(null)
  const [useChance, setUseChance] = useState(false)
  const [retryAnswer, setRetryAnswer] = useState('')
  const [retryResult, setRetryResult] = useState(null)
  const intervalRef = useRef(null)

  // Timer
  useEffect(() => {
    if (phase !== 'exam') return
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current)
          submitExam()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [phase])

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  }

  const isLowTime = timeLeft < 120

  const handleAnswerChange = (val) => {
    const updated = [...answers]
    updated[qIndex] = val
    setAnswers(updated)
  }

  const handleNext = () => {
    if (qIndex < questions.length - 1) {
      setQIndex(i => i + 1)
    } else {
      submitExam()
    }
  }

  const handlePrev = () => {
    if (qIndex > 0) setQIndex(i => i - 1)
  }

  const submitExam = () => {
    clearInterval(intervalRef.current)
    const res = questions.map((q, i) => ({
      question: q.question,
      answer: answers[i],
      correct: checkAnswer(answers[i] || '', q),
      expected: q.correct,
    }))
    setResults(res)
    const passed = res.every(r => r.correct)
    setPhase('result')
    onResult(passed, res)
  }

  const handleRetry = () => {
    if (!retryAnswer.trim()) return
    const failedQ = results.find(r => !r.correct)
    const q = questions.find(q => q.question === failedQ?.question)
    if (!q) return
    const ok = checkAnswer(retryAnswer, q)
    setRetryResult(ok)
  }

  // ---- INTRO ----
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-ink text-paper flex flex-col">
        <div className="border-b border-dim/30 px-6 py-4 flex items-center justify-between">
          <button onClick={onBack} className="font-body text-xs tracking-widest uppercase text-dim hover:text-paper transition-colors">
            ← Cancelar
          </button>
          <div className="label" style={{ color: '#7a7267' }}>Modo Timeout</div>
          <div className="w-20" />
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 max-w-lg mx-auto w-full">
          <div className="font-body text-accent text-xs tracking-widest uppercase mb-6">Examen final</div>
          <div className="font-display text-8xl tracking-wider mb-2 text-paper">TIMEOUT</div>
          <div className="font-body text-dim text-sm mb-12 text-center">
            {subject.icon} {subject.name}
          </div>

          <div className="w-full border border-dim/40 p-6 mb-8 space-y-4">
            <div className="label" style={{ color: '#7a7267' }}>Condiciones del examen</div>
            {[
              `${questions.length} preguntas`,
              `${Math.floor(EXAM_DURATION / 60)} minutos`,
              'Sin ayudas. Sin pistas.',
              'Todas deben ser correctas para aprobar.',
              subject.secondChances > 0
                ? `Tenés ${subject.secondChances} reintento${subject.secondChances > 1 ? 's' : ''} disponible${subject.secondChances > 1 ? 's' : ''}.`
                : 'Sin reintentos disponibles.',
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-accent font-body mt-0.5">—</span>
                <span className="font-body text-sm text-dim">{rule}</span>
              </div>
            ))}
          </div>

          <div className="sensei-message mb-8 w-full" style={{ color: '#7a7267', borderColor: '#c84b2f' }}>
            Si aprobás, tu dominio llega al 100%.
            Si fallás, volvés a entrenar en los puntos débiles.
          </div>

          <button
            onClick={() => setPhase('exam')}
            className="w-full bg-accent text-paper py-5 font-ui font-medium tracking-widest text-base hover:bg-warn transition-colors active:scale-95"
          >
            COMENZAR TIMEOUT
          </button>
        </div>
      </div>
    )
  }

  // ---- EXAM ----
  if (phase === 'exam') {
    const answered = answers.filter(a => a.trim()).length
    return (
      <div className="min-h-screen bg-ink text-paper flex flex-col">
        {/* Exam header */}
        <div className={`border-b px-6 py-3 flex items-center justify-between transition-colors ${
          isLowTime ? 'border-accent/60 bg-warn/10' : 'border-dim/30'
        }`}>
          <div className="flex items-center gap-6">
            <span className="label" style={{ color: '#7a7267' }}>Timeout</span>
            <span className="font-body text-xs text-dim">{subject.icon} {subject.name}</span>
          </div>
          
          {/* Timer */}
          <div className={`flex items-center gap-2 font-display text-3xl tracking-wider transition-colors ${
            isLowTime ? 'text-accent' : 'text-paper'
          }`}>
            {isLowTime && <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />}
            {formatTime(timeLeft)}
          </div>

          <div className="font-body text-xs text-dim">
            {answered}/{questions.length} respondidas
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex border-b border-dim/20">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setQIndex(i)}
              className={`flex-1 py-2 font-body text-xs transition-all border-r last:border-r-0 border-dim/20 ${
                i === qIndex
                  ? 'bg-accent text-paper'
                  : answers[i]?.trim()
                  ? 'bg-dim/20 text-dim'
                  : 'text-dim/40'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Question */}
        <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 py-8">
          <div className="label mb-4" style={{ color: '#7a7267' }}>
            Pregunta {qIndex + 1} de {questions.length}
          </div>
          
          <div className="font-ui text-lg leading-relaxed text-paper font-medium mb-8 animate-fade-in" key={qIndex}>
            {questions[qIndex].question}
          </div>

          <div className="mb-6">
            <textarea
              value={answers[qIndex]}
              onChange={e => handleAnswerChange(e.target.value)}
              placeholder=""
              rows={5}
              className="w-full bg-transparent border border-dim/40 p-4 font-body text-sm resize-none outline-none focus:border-paper/60 transition-all text-paper placeholder:text-dim/40"
              autoFocus
            />
          </div>

          {/* Nav */}
          <div className="flex gap-3 mt-auto">
            {qIndex > 0 && (
              <button onClick={handlePrev} className="btn-ghost flex-1 py-3 text-sm" style={{ color: '#7a7267', borderColor: '#7a7267' }}>
                ← Anterior
              </button>
            )}
            {qIndex < questions.length - 1 ? (
              <button onClick={handleNext} className="flex-1 py-3 bg-paper/10 text-paper font-ui font-medium text-sm border border-dim/40 hover:bg-paper/20 transition-all active:scale-95">
                Siguiente →
              </button>
            ) : (
              <button
                onClick={submitExam}
                className="flex-1 py-3 bg-accent text-paper font-ui font-medium text-sm hover:bg-warn transition-all active:scale-95"
              >
                Entregar examen
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ---- RESULT ----
  const passed = results?.every(r => r.correct)
  const firstFailed = results?.find(r => !r.correct)
  const failedQ = questions.find(q => q.question === firstFailed?.question)

  return (
    <div className={`min-h-screen flex flex-col ${passed ? 'bg-paper' : 'bg-ink text-paper'}`}>
      <div className={`border-b px-6 py-4 ${passed ? 'border-border' : 'border-dim/30'}`}>
        <div className="label" style={passed ? {} : { color: '#7a7267' }}>Resultado</div>
      </div>

      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 py-10 animate-fade-in">
        {passed ? (
          <>
            <div className="font-body text-success text-xs tracking-widest uppercase mb-4">Aprobado</div>
            <div className="font-display text-8xl tracking-wider text-ink mb-4">100%</div>
            <div className="sensei-message mb-8">{getRandomMessage('timeout_pass')}</div>
            <div className="border border-success p-4 mb-8">
              <div className="label text-success mb-3">Dominio confirmado</div>
              {results.map((r, i) => (
                <div key={i} className="flex items-start gap-2 py-1.5 border-b last:border-b-0 border-border">
                  <span className="text-success font-body text-sm mt-0.5">✓</span>
                  <span className="font-body text-xs text-dim">{r.question.slice(0, 60)}...</span>
                </div>
              ))}
            </div>
            <button onClick={onBack} className="w-full btn-primary py-4">
              Volver al Dashboard
            </button>
          </>
        ) : (
          <>
            <div className="font-body text-accent text-xs tracking-widest uppercase mb-4">Reprobado</div>
            <div className="font-display text-8xl tracking-wider text-paper mb-4">FAIL</div>
            <div className="sensei-message mb-8" style={{ color: '#7a7267', borderColor: '#c84b2f' }}>
              {getRandomMessage('timeout_fail')}
            </div>

            {/* Results breakdown */}
            <div className="border border-dim/30 p-4 mb-6">
              <div className="label mb-3" style={{ color: '#7a7267' }}>Desglose</div>
              {results.map((r, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b last:border-b-0 border-dim/20">
                  <span className={`font-body text-sm mt-0.5 ${r.correct ? 'text-success' : 'text-accent'}`}>
                    {r.correct ? '✓' : '✗'}
                  </span>
                  <div className="flex-1">
                    <div className="font-body text-xs text-dim">{r.question.slice(0, 60)}...</div>
                    {!r.correct && (
                      <div className="font-body text-xs text-dim/60 mt-0.5 italic">
                        Esperado: {r.expected.slice(0, 60)}...
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Second chance */}
            {subject.secondChances > 0 && failedQ && !useChance && (
              <div className="border border-accent p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-body text-xs text-accent tracking-widest uppercase">Reintento disponible</div>
                    <div className="font-body text-xs text-dim mt-0.5">{subject.secondChances} restante{subject.secondChances > 1 ? 's' : ''}</div>
                  </div>
                  <button
                    onClick={() => setUseChance(true)}
                    className="font-body text-xs text-accent border border-accent px-3 py-1.5 hover:bg-accent hover:text-paper transition-all"
                  >
                    Usar reintento
                  </button>
                </div>
                <div className="font-body text-xs text-dim italic">
                  Se reformulará la pregunta que fallaste. Mismo concepto, distinto ángulo.
                </div>
              </div>
            )}

            {useChance && failedQ && retryResult === null && (
              <div className="border border-accent p-4 mb-6 animate-slide-up">
                <div className="label mb-2" style={{ color: '#7a7267' }}>Segunda oportunidad</div>
                <div className="font-ui text-sm text-paper mb-4 leading-relaxed">
                  {/* Reformulated version of the question */}
                  Explicá con tus propias palabras qué concepto evalúa esta pregunta y cuál sería la respuesta correcta: "{failedQ.question.slice(0, 80)}..."
                </div>
                <textarea
                  value={retryAnswer}
                  onChange={e => setRetryAnswer(e.target.value)}
                  rows={3}
                  placeholder="Tu respuesta..."
                  className="w-full bg-transparent border border-dim/40 p-3 font-body text-sm resize-none outline-none focus:border-paper/60 text-paper placeholder:text-dim/40 mb-3"
                  autoFocus
                />
                <button
                  onClick={handleRetry}
                  disabled={!retryAnswer.trim()}
                  className="w-full py-2.5 bg-accent text-paper font-ui font-medium text-sm hover:bg-warn transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Enviar reintento
                </button>
              </div>
            )}

            {retryResult !== null && (
              <div className={`border p-4 mb-6 animate-slide-up ${retryResult ? 'border-success' : 'border-dim/30'}`}>
                <div className={`font-body text-sm font-medium mb-1 ${retryResult ? 'text-success' : 'text-accent'}`}>
                  {retryResult ? 'Correcto. Reintento aprobado.' : 'Incorrecto. El concepto no está dominado.'}
                </div>
                <div className="font-body text-xs text-dim">
                  {retryResult
                    ? 'Se registró la mejora. Seguí entrenando para consolidar.'
                    : 'Volvé al entrenamiento. El timeout requiere dominio real.'}
                </div>
              </div>
            )}

            <button onClick={onBack} className="w-full py-4 bg-paper/10 text-paper font-ui font-medium border border-dim/40 hover:bg-paper/20 transition-all active:scale-95">
              Volver a entrenar
            </button>
          </>
        )}
      </div>
    </div>
  )
}
