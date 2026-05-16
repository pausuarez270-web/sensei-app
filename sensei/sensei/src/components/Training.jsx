// src/components/Training.jsx
import { useState, useEffect } from 'react'
import { TRAINING_QUESTIONS, getRandomMessage, checkAnswer } from '../data/mockData'

export default function Training({ subject, onBack, onScoreChange }) {
  const questions = TRAINING_QUESTIONS[subject.id] || TRAINING_QUESTIONS['math']
  
  const [qIndex, setQIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [sessionStats, setSessionStats] = useState({ correct: 0, wrong: 0, total: 0 })
  const [streak, setStreak] = useState(0)
  const [showCorrect, setShowCorrect] = useState(false)

  const currentQ = questions[qIndex % questions.length]

  const handleSubmit = () => {
    if (!answer.trim() || submitted) return
    
    const correct = checkAnswer(answer, currentQ)
    setIsCorrect(correct)
    setSubmitted(true)
    setShowCorrect(!correct)
    
    const msg = correct ? getRandomMessage('correct') : getRandomMessage('incorrect')
    setFeedback(msg)
    
    setSessionStats(prev => ({
      correct: prev.correct + (correct ? 1 : 0),
      wrong: prev.wrong + (correct ? 0 : 1),
      total: prev.total + 1,
    }))
    
    if (correct) {
      setStreak(s => s + 1)
      onScoreChange(correct ? 4 : -3)
    } else {
      setStreak(0)
      onScoreChange(-3)
    }
  }

  const handleNext = () => {
    setAnswer('')
    setSubmitted(false)
    setIsCorrect(null)
    setFeedback('')
    setShowCorrect(false)
    setQIndex(i => i + 1)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!submitted) handleSubmit()
      else handleNext()
    }
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* Header */}
      <div className="border-b border-border px-6 py-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="font-body text-xs tracking-widest uppercase text-dim hover:text-ink transition-colors"
        >
          ← Dashboard
        </button>
        <div className="label">Entrenamiento</div>
        <div className="flex items-center gap-4">
          {streak >= 3 && (
            <span className="font-body text-xs text-accent border border-accent px-2 py-0.5">
              {streak} seguidas
            </span>
          )}
          <div className="font-body text-xs text-dim">
            <span className="text-success">{sessionStats.correct}✓</span>
            {' '}
            <span className="text-warn">{sessionStats.wrong}✗</span>
          </div>
        </div>
      </div>

      {/* Subject indicator */}
      <div className="px-6 py-2 bg-ink">
        <span className="font-body text-xs text-dim">{subject.icon} {subject.name}</span>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 py-8">

        {/* Question counter */}
        <div className="flex items-center gap-3 mb-6">
          <span className="label">Pregunta {(qIndex % questions.length) + 1} / {questions.length}</span>
          <div className="flex-1 h-px bg-border" />
          <span className="font-body text-xs text-dim">{subject.score}%</span>
        </div>

        {/* Question */}
        <div className="mb-8 animate-fade-in" key={qIndex}>
          <div className="font-ui text-lg leading-relaxed text-ink font-medium">
            {currentQ.question}
          </div>
        </div>

        {/* Answer input */}
        <div className="mb-6">
          <div className="label mb-2">Tu respuesta</div>
          <textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={submitted}
            placeholder="Escribí tu respuesta aquí..."
            rows={4}
            className={`w-full border p-4 font-body text-sm resize-none outline-none transition-all ${
              submitted
                ? isCorrect
                  ? 'bg-paper border-success text-ink'
                  : 'bg-paper border-warn text-ink'
                : 'bg-paper border-border focus:border-ink text-ink placeholder:text-dim'
            }`}
            autoFocus
          />
          <div className="text-right mt-1">
            <span className="font-body text-xs text-dim">Enter para enviar</span>
          </div>
        </div>

        {/* Feedback */}
        {submitted && (
          <div className={`mb-6 animate-slide-up border p-4 ${
            isCorrect ? 'border-success bg-paper' : 'border-warn bg-paper'
          }`}>
            <div className={`font-body text-sm font-medium mb-2 ${isCorrect ? 'text-success' : 'text-warn'}`}>
              {feedback}
            </div>
            
            {showCorrect && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="label mb-1.5">Respuesta esperada</div>
                <div className="font-body text-sm text-ink italic">{currentQ.correct}</div>
                <div className="mt-2">
                  <span className="label">Palabras clave: </span>
                  <span className="font-body text-xs text-dim">{currentQ.hint}</span>
                </div>
              </div>
            )}

            {isCorrect && (
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="font-body text-xs text-success">+4% de dominio</span>
              </div>
            )}
            {!isCorrect && (
              <div className="mt-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warn" />
                <span className="font-body text-xs text-warn">-3% de dominio</span>
              </div>
            )}
          </div>
        )}

        {/* Action button */}
        <div className="mt-auto">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!answer.trim()}
              className={`w-full py-4 font-ui font-medium tracking-wide transition-all duration-150 ${
                answer.trim()
                  ? 'btn-primary active:scale-95'
                  : 'bg-border text-dim cursor-not-allowed border border-border'
              }`}
            >
              Enviar respuesta
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full btn-primary py-4 text-base tracking-wide"
            >
              Siguiente pregunta →
            </button>
          )}
        </div>

        {/* Session summary shown after every 3 questions */}
        {sessionStats.total > 0 && sessionStats.total % 3 === 0 && !submitted && (
          <div className="mt-6 p-4 border border-border animate-fade-in">
            <div className="label mb-2">Resumen de sesión</div>
            <div className="flex gap-6">
              <div>
                <div className="font-display text-3xl text-success">{sessionStats.correct}</div>
                <div className="font-body text-xs text-dim">correctas</div>
              </div>
              <div>
                <div className="font-display text-3xl text-warn">{sessionStats.wrong}</div>
                <div className="font-body text-xs text-dim">incorrectas</div>
              </div>
              <div>
                <div className="font-display text-3xl">{Math.round((sessionStats.correct / sessionStats.total) * 100)}%</div>
                <div className="font-body text-xs text-dim">precisión</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
