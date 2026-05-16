// src/components/Subjects.jsx
import { useState } from 'react'
import { getLevelFromScore } from '../data/mockData'

export default function Subjects({ subjects, activeSubjectId, onSelect, onAdd, onBack }) {
  const [showNewForm, setShowNewForm] = useState(false)
  const [newName, setNewName] = useState('')
  const [newIcon, setNewIcon] = useState('◆')

  const icons = ['◆', '∑', '◈', '⟡', '△', '○', '◉', '⬡', '⬢', '⌘']

  const handleAdd = () => {
    if (!newName.trim()) return
    onAdd({ name: newName.trim(), icon: newIcon })
    setNewName('')
    setNewIcon('◆')
    setShowNewForm(false)
  }

  return (
    <div className="min-h-screen bg-paper flex flex-col">
      {/* Header */}
      <div className="border-b border-border px-6 py-5 flex items-center justify-between">
        <div>
          <div className="label mb-1">Sistema de estudio</div>
          <h1 className="font-display text-4xl tracking-wider text-ink">MATERIAS</h1>
        </div>
        <button
          onClick={() => setShowNewForm(!showNewForm)}
          className="btn-primary text-sm"
        >
          {showNewForm ? 'Cancelar' : '+ Nueva materia'}
        </button>
      </div>

      {/* New subject form */}
      {showNewForm && (
        <div className="border-b border-border bg-ink text-paper px-6 py-5 animate-slide-up">
          <div className="label mb-3" style={{ color: '#7a7267' }}>Nueva materia</div>
          <div className="flex gap-3 items-start flex-wrap">
            <div className="flex gap-2 flex-wrap">
              {icons.map(ic => (
                <button
                  key={ic}
                  onClick={() => setNewIcon(ic)}
                  className={`w-9 h-9 font-body text-lg transition-all border ${
                    newIcon === ic
                      ? 'bg-accent border-accent text-paper'
                      : 'border-dim text-dim hover:border-paper hover:text-paper'
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Nombre de la materia..."
              value={newName}
              onChange={e => setNewName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdd()}
              className="flex-1 min-w-48 bg-transparent border-b border-dim text-paper font-body text-sm py-2 outline-none placeholder:text-dim focus:border-paper transition-colors"
              autoFocus
            />
            <button onClick={handleAdd} className="btn-danger text-sm whitespace-nowrap">
              Agregar
            </button>
          </div>
        </div>
      )}

      {/* Subjects list */}
      <div className="flex-1 p-6">
        <div className="grid gap-3 max-w-2xl">
          {subjects.map(sub => {
            const level = getLevelFromScore(sub.score)
            const isActive = sub.id === activeSubjectId
            return (
              <div
                key={sub.id}
                onClick={() => onSelect(sub.id)}
                className={`border p-5 cursor-pointer transition-all duration-150 group ${
                  isActive
                    ? 'bg-ink text-paper border-ink'
                    : 'bg-paper text-ink border-border hover:border-ink'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className={`font-body text-2xl ${isActive ? 'text-accent' : 'text-dim'}`}>
                      {sub.icon}
                    </span>
                    <div>
                      <div className={`font-ui font-medium text-base ${isActive ? 'text-paper' : 'text-ink'}`}>
                        {sub.name}
                      </div>
                      <div className={`font-body text-xs mt-0.5 ${isActive ? 'text-dim' : 'text-dim'}`}>
                        {level.name} · {sub.score}%
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {isActive && (
                      <span className="font-body text-xs tracking-widest uppercase text-accent border border-accent px-2 py-0.5">
                        activa
                      </span>
                    )}
                    {/* Mini progress bar */}
                    <div className={`w-24 h-1 ${isActive ? 'bg-dim' : 'bg-border'}`}>
                      <div
                        className={`h-full transition-all duration-700 ${isActive ? 'bg-accent' : 'bg-ink'}`}
                        style={{ width: `${sub.score}%` }}
                      />
                    </div>
                    <span className={`font-body text-sm font-medium ${isActive ? 'text-accent' : 'text-dim'}`}>
                      {sub.score}%
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {subjects.length === 0 && (
          <div className="text-center py-20">
            <div className="font-body text-dim text-sm">No hay materias.</div>
            <div className="font-body text-dim text-sm mt-1">Creá una para empezar.</div>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      {activeSubjectId && (
        <div className="border-t border-border px-6 py-4">
          <button onClick={onBack} className="btn-primary w-full">
            Ir al Dashboard →
          </button>
        </div>
      )}
    </div>
  )
}
