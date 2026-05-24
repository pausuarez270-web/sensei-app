// src/components/DailyMission.jsx
import { useState } from 'react'
import { DAILY_MISSIONS, getRandomMessage } from '../data/mockData'

export default function DailyMission({ subject, onBack, onComplete }) {
  const mission = DAILY_MISSIONS[Math.floor(Math.random() * DAILY_MISSIONS.length)]
  // Stabilize: pick mission based on subject id for consistency per session
  const stableMission = DAILY_MISSIONS[subject.id.length % DAILY_MISSIONS.length]
  
  const [phase, setPhase] = useState('show') // show | confirm | done
  const [answer, setAnswer] = useState('')

  const handleConfirm = () => {
    if (answer.trim().length < 10) return
    setPhase('done')
    onComplete(stableMission.scoreGain)
  }

  if (phase === 'done') {
    return (
      <div className="min-h-screen bg-ink text-paper flex flex-col items-center justify-center px-6 animate-fade-in">
        <div className="max-w-md w-full text-center">
          <div className="font-body text-accent text-sm tracking-widest uppercase mb-6">Misión completada</div>
          <div className="font-display text-7xl tracking-wider mb-6">+{stableMission.scoreGain}%</div>
          <div className="sensei-message text-left mb-4" style={{ color: '#7a7267', borderColor: '#c84b2f' }}>
            {getRandomMessage('progress')}
          </div>
          <div className="font-body text-sm text-dim mb-2">
            Reintento desbloqueado para Timeout.
          </div>
          <button onClick={onBack} className="btn-danger w-full mt-8 py-4">
            Volver al Dashboard
          </button>
        </div>
      </div>
    )
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
        <div className="label">Misión diaria</div>
        <div className="w-20" />
      </div>

      {/* Subject */}
      <div className="px-6 py-2 bg-ink">
        <span className="font-body text-xs text-dim">{subject.icon} {subject.name}</span>
      </div>

      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 py-8">
        
        {/* Mission type badge */}
        <div className="mb-6">
          <span className="font-body text-xs tracking-widest uppercase border border-accent text-accent px-3 py-1">
            {stableMission.type === 'correction' && 'Corrección'}
            {stableMission.type === 'teach' && 'Enseñar'}
            {stableMission.type === 'speed' && 'Sin ayuda'}
            {stableMission.type === 'review' && 'Revisión'}
          </span>
        </div>

        {/* Mission card */}
        <div className="border-l-2 border-accent pl-6 mb-8">
          <h2 className="font-display text-4xl tracking-wider text-ink mb-3">
            {stableMission.title.toUpperCase()}
          </h2>
          <p className="font-ui text-base text-ink leading-relaxed">
            {stableMission.description}
          </p>
        </div>

        {/* Rules */}
        <div className="mb-6 p-4 bg-ink text-paper">
          <div className="label mb-3" style={{ color: '#7a7267' }}>Reglas</div>
          <ul className="space-y-2">
            <li className="font-body text-sm text-dim flex items-start gap-2">
              <span className="text-accent mt-0.5">—</span>
              <span>No podés copiar textualmente lo que ya respondiste.</span>
            </li>
            <li className="font-body text-sm text-dim flex items-start gap-2">
              <span className="text-accent mt-0.5">—</span>
              <span>Mínimo 10 palabras de desarrollo real.</span>
            </li>
            <li className="font-body text-sm text-dim flex items-start gap-2">
              <span className="text-accent mt-0.5">—</span>
              <span>Sin notas. Sin material de apoyo.</span>
            </li>
          </ul>
        </div>

        {/* Answer area */}
        <div className="mb-4">
          <div className="label mb-2">Tu respuesta</div>
          <textarea
            value={answer}
            onChange={e => setAnswer(e.target.value)}
            placeholder="Desarrollá tu respuesta aquí..."
            rows={5}
            className="w-full border border-border p-4 font-body text-sm resize-none outline-none focus:border-ink transition-all bg-paper text-ink placeholder:text-dim"
            autoFocus
          />
          <div className="flex justify-between mt-1">
            <span className="font-body text-xs text-dim">
              {answer.trim().split(/\s+/).filter(Boolean).length} palabras
            </span>
            <span className="font-body text-xs text-dim">mínimo 10</span>
          </div>
        </div>

        {/* Reward indicator */}
        <div className="flex items-center gap-3 mb-8 p-3 border border-border">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
          <span className="font-body text-xs text-dim">{stableMission.reward}</span>
        </div>

        {/* Submit */}
        <button
          onClick={handleConfirm}
          disabled={answer.trim().split(/\s+/).filter(Boolean).length < 10}
          className={`w-full py-4 font-ui font-medium tracking-wide transition-all duration-150 ${
            answer.trim().split(/\s+/).filter(Boolean).length >= 10
              ? 'btn-primary active:scale-95'
              : 'bg-border text-dim cursor-not-allowed border border-border'
          }`}
        >
          Completar misión
        </button>
      </div>
    </div>
  )
}
