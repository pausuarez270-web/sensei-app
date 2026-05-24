// src/App.jsx
import { useState } from 'react'
import { INITIAL_SUBJECTS, getLevelFromScore } from './data/mockData'
import Subjects from './components/Subjects'
import Dashboard from './components/Dashboard'
import Training from './components/Training'
import DailyMission from './components/DailyMission'
import Timeout from './components/Timeout'

const SCREENS = {
  SUBJECTS: 'subjects',
  DASHBOARD: 'dashboard',
  TRAINING: 'training',
  MISSION: 'mission',
  TIMEOUT: 'timeout',
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.SUBJECTS)
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS)
  const [activeSubjectId, setActiveSubjectId] = useState(INITIAL_SUBJECTS[0].id)

  const activeSubject = subjects.find(s => s.id === activeSubjectId) || subjects[0]

  const updateSubject = (id, updater) => {
    setSubjects(prev => prev.map(s => s.id === id ? updater(s) : s))
  }

  const handleScoreChange = (delta) => {
    updateSubject(activeSubjectId, s => ({
      ...s,
      score: Math.max(0, Math.min(100, s.score + delta)),
    }))
  }

  const handleMissionComplete = (gain) => {
    updateSubject(activeSubjectId, s => ({
      ...s,
      score: Math.min(100, s.score + gain),
      secondChances: s.secondChances + 1,
    }))
  }

  const handleTimeoutResult = (passed, results) => {
    if (passed) {
      updateSubject(activeSubjectId, s => ({ ...s, score: 100 }))
    } else {
      // Penalize and consume a second chance if used
      updateSubject(activeSubjectId, s => ({
        ...s,
        score: Math.max(0, s.score - 8),
        secondChances: Math.max(0, s.secondChances - 0), // consumed during timeout flow
      }))
    }
  }

  const handleAddSubject = ({ name, icon }) => {
    const id = name.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now()
    setSubjects(prev => [...prev, {
      id,
      name,
      icon,
      score: 0,
      secondChances: 0,
    }])
    setActiveSubjectId(id)
  }

  const handleSelectSubject = (id) => {
    setActiveSubjectId(id)
  }

  return (
    <div className="max-w-2xl mx-auto min-h-screen border-x border-border bg-paper">
      {screen === SCREENS.SUBJECTS && (
        <Subjects
          subjects={subjects}
          activeSubjectId={activeSubjectId}
          onSelect={handleSelectSubject}
          onAdd={handleAddSubject}
          onBack={() => setScreen(SCREENS.DASHBOARD)}
        />
      )}

      {screen === SCREENS.DASHBOARD && (
        <Dashboard
          subject={activeSubject}
          onTrain={() => setScreen(SCREENS.TRAINING)}
          onMission={() => setScreen(SCREENS.MISSION)}
          onTimeout={() => setScreen(SCREENS.TIMEOUT)}
          onSubjects={() => setScreen(SCREENS.SUBJECTS)}
        />
      )}

      {screen === SCREENS.TRAINING && (
        <Training
          subject={activeSubject}
          onBack={() => setScreen(SCREENS.DASHBOARD)}
          onScoreChange={handleScoreChange}
        />
      )}

      {screen === SCREENS.MISSION && (
        <DailyMission
          subject={activeSubject}
          onBack={() => setScreen(SCREENS.DASHBOARD)}
          onComplete={handleMissionComplete}
        />
      )}

      {screen === SCREENS.TIMEOUT && (
        <Timeout
          subject={activeSubject}
          onBack={() => setScreen(SCREENS.DASHBOARD)}
          onResult={handleTimeoutResult}
        />
      )}
    </div>
  )
}
