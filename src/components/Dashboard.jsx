// src/components/Dashboard.jsx
import { useEffect, useState } from 'react'
import { getLevelFromScore, LEVELS, getRandomMessage, SENSEI_MESSAGES } from '../data/mockData'

const TIMEOUT_UNLOCK_SCORE = 65

export default function Dashboard({ subject, onTrain, onMission, onTimeout, onSubjects }) {
  const [notification, setNotification] = useState('')
  const [notifType, setNotifType] = useState('info')

  const level = getLevelFromScore(subject.score)
  const nextLevel = LEVELS.find(l => l.id === level.id + 1)
  const canTimeout = subject.score >= TIMEOUT_UNLOCK_SCORE
  const progressToNext = nextLevel
    ? Math.round(((subject.score - level.min) / (nextLevel.min - level.min)) * 100)
    : 100

  useEffect(() => {
    const msgs = [
      { text: canTimeout ? getRandomMessage('timeout_unlock') : getRandomMessage('dashboard'), type: 'info' },
      { text: getRandomMessage('reminder'), type: 'warn' },
      { text: getRandomMessage('progress'), type: 'info' },
    ]
    let idx = 0
    const { text, type } = msgs[idx]
    setNotification(text)
    setNotifType(type)
    const interval = setInterval(() => {
      idx = (idx + 1) % msgs.length
      setNotification(msgs[idx].text)
      setNotifType(msgs[idx].type)
    }, 5000)
    return () => clearInterval(interval)
  }, [canTimeout])

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* Top bar */}
      <div className="border-b border-border px-6 py-4 flex items-center justify-between">
        <button
          onClick={onSubjects}
          className="flex items-center gap-2 text-dim hover:text-ink transition-colors font-body text-xs tracking-widest uppercase"
        >
          ← Materias
        </button>
        <div className="flex items-center gap-3">
          <span className="font-body text-sm text-ink">{subject.icon}</span>
          <span className="font-ui font-medium text-sm text-ink">{subject.name}</span>
        </div>
        {subject.secondChances > 0 && (
          <div className="flex items-center gap-1.5">
            {Array.from({ length: subject.secondChances }).map((_, i) => (
              <div key={i} className="w-2 h-2 rounded-full bg-accent" title="Reintento disponible" />
            ))}
            <span className="font-body text-xs text-dim ml-1">reintentos</span>
          </div>
        )}
        {subject.secondChances === 0 && <div className="w-20" />}
      </div>

      {/* Notification bar */}
      <div className={`px-6 py-2.5 border-b border-border flex items-center gap-3 transition-all ${
        notifType === 'warn' ? 'bg-ink' : 'bg-paper'
      }`}>
        <div className={`w-1.5 h-1.5 rounded-full animate-pulse-slow ${
          notifType === 'warn' ? 'bg-accent' : 'bg-success'
        }`} />
        <span className={`font-body text-xs italic ${notifType === 'warn' ? 'text-paper' : 'text-dim'}`}>
          {notification}
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 px-6 py-8 max-w-lg mx-auto w-full">

        {/* Level badge */}
        <div className="mb-2">
          <span className="label">Nivel actual</span>
        </div>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="font-display text-6xl tracking-wider text-ink">{level.name.toUpperCase()}</span>
          <span className="font-body text-dim text-sm">/ {level.id} de 5</span>
        </div>

        {/* Progress section */}
        <div className="mb-8">
          <div className="flex items-end justify-between mb-2">
            <span className="label">Dominio</span>
            <span className="font-display text-3xl text-ink tracking-wide">{subject.score}%</span>
          </div>
          
          {/* Main progress bar */}
          <div className="w-full h-3 bg-border relative overflow-hidden">
            <div
              className="h-full bg-ink transition-all duration-700 ease-out"
              style={{ width: `${subject.score}%` }}
            />
            {/* Timeout threshold marker */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-accent"
              style={{ left: `${TIMEOUT_UNLOCK_SCORE}%` }}
            />
          </div>
          
          <div className="flex justify-between mt-1.5">
            <span className="font-body text-xs text-dim">0%</span>
            <span className="font-body text-xs text-accent" style={{ marginLeft: `${TIMEOUT_UNLOCK_SCORE - 3}%` }}>
              ↑ examen
            </span>
            <span className="font-body text-xs text-dim">100%</span>
          </div>

          {/* Level progression */}
          {nextLevel && (
            <div className="mt-4 p-3 border border-border">
              <div className="flex justify-between items-center mb-1.5">
                <span className="font-body text-xs text-dim">Hacia {nextLevel.name}</span>
                <span className="font-body text-xs text-ink">{progressToNext}%</span>
              </div>
              <div className="w-full h-1 bg-border">
                <div
                  className="h-full bg-accent transition-all duration-700"
                  style={{ width: `${progressToNext}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Level map */}
        <div className="mb-8">
          <div className="label mb-3">Escala de dominio</div>
          <div className="flex gap-0">
            {LEVELS.map((l, i) => (
              <div
                key={l.id}
                className={`flex-1 py-2 px-1 border-r last:border-r-0 border-border text-center transition-all ${
                  l.id === level.id
                    ? 'bg-ink'
                    : l.id < level.id
                    ? 'bg-border'
                    : 'bg-paper'
                }`}
              >
                <div className={`font-body text-xs ${
                  l.id === level.id ? 'text-accent' : l.id < level.id ? 'text-dim' : 'text-border'
                }`}>
                  {l.id}
                </div>
                <div className={`font-body text-xs mt-0.5 leading-tight hidden sm:block ${
                  l.id === level.id ? 'text-paper' : l.id < level.id ? 'text-dim' : 'text-border'
                }`}>
                  {l.name.split(' ')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <button
            onClick={onTrain}
            className="w-full btn-primary py-4 text-base tracking-wide flex items-center justify-between group"
          >
            <span>Entrenar</span>
            <span className="font-body text-dim group-hover:text-paper transition-colors text-sm">→</span>
          </button>

          <button
            onClick={onMission}
            className="w-full btn-ghost py-4 text-base tracking-wide flex items-center justify-between group"
          >
            <span>Misión diaria</span>
            <span className="font-body text-xs text-dim">{subject.secondChances} reintentos</span>
          </button>

          <div className="relative">
            <button
              onClick={canTimeout ? onTimeout : undefined}
              className={`w-full py-4 text-base tracking-wide flex items-center justify-between transition-all duration-150 border font-ui font-medium ${
                canTimeout
                  ? 'bg-accent text-paper border-accent hover:bg-warn active:scale-95 cursor-pointer'
                  : 'bg-paper text-border border-border cursor-not-allowed'
              }`}
            >
              <span>Timeout</span>
              {canTimeout ? (
                <span className="font-body text-xs text-paper/70">disponible →</span>
              ) : (
                <span className="font-body text-xs text-border">
                  requiere {TIMEOUT_UNLOCK_SCORE}% · actual {subject.score}%
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Stats footer */}
        <div className="mt-8 pt-5 border-t border-border flex gap-6">
          <div>
            <div className="label mb-0.5">Reintentos</div>
            <div className="font-display text-2xl">{subject.secondChances}</div>
          </div>
          <div>
            <div className="label mb-0.5">Siguiente nivel</div>
            <div className="font-display text-2xl">{nextLevel ? nextLevel.min + '%' : '—'}</div>
          </div>
          <div>
            <div className="label mb-0.5">Estado</div>
            <div className="font-display text-2xl">{canTimeout ? 'LISTO' : 'TRAIN'}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
