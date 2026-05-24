// src/data/mockData.js

export const LEVELS = [
  { id: 1, name: 'Reconocimiento', min: 0,  max: 20  },
  { id: 2, name: 'Comprensión',    min: 20, max: 40  },
  { id: 3, name: 'Aplicación',     min: 40, max: 65  },
  { id: 4, name: 'Dominio',        min: 65, max: 85  },
  { id: 5, name: 'Fluidez',        min: 85, max: 100 },
]

export const getLevelFromScore = (score) => {
  return LEVELS.find(l => score >= l.min && score < l.max) || LEVELS[4]
}

export const INITIAL_SUBJECTS = [
  {
    id: 'math',
    name: 'Análisis Matemático',
    icon: '∑',
    score: 34,
    secondChances: 1,
  },
  {
    id: 'history',
    name: 'Historia Contemporánea',
    icon: '◈',
    score: 12,
    secondChances: 0,
  },
  {
    id: 'physics',
    name: 'Física II',
    icon: '⟡',
    score: 58,
    secondChances: 2,
  },
]

export const TRAINING_QUESTIONS = {
  math: [
    {
      id: 1,
      question: 'Calculá el límite de f(x) = (x² - 4) / (x - 2) cuando x → 2.',
      correct: 'El límite es 4. Se factoriza el numerador y se simplifica.',
      hint: '(x+2)(x-2)',
      keywords: ['4', 'cuatro'],
    },
    {
      id: 2,
      question: 'Definí con tus palabras qué es una derivada.',
      correct: 'La derivada mide la tasa de cambio instantánea de una función en un punto.',
      hint: 'tasa de cambio / pendiente',
      keywords: ['cambio', 'pendiente', 'instante', 'tasa', 'variación'],
    },
    {
      id: 3,
      question: '¿Cuál es la derivada de f(x) = x³ + 2x?',
      correct: 'f\'(x) = 3x² + 2',
      hint: 'regla de la potencia',
      keywords: ['3x', '3x²', '2'],
    },
    {
      id: 4,
      question: 'Explicá el Teorema de Bolzano y cuándo se aplica.',
      correct: 'Si f es continua en [a,b] y f(a)·f(b) < 0, existe c en (a,b) tal que f(c) = 0.',
      hint: 'función continua / cambio de signo',
      keywords: ['continua', 'cero', 'raíz', 'signo'],
    },
    {
      id: 5,
      question: '¿Qué condiciones debe cumplir una función para ser integrable en [a,b]?',
      correct: 'Debe ser acotada y continua salvo en un número finito de puntos (o ser monótona).',
      hint: 'acotada / discontinuidades',
      keywords: ['acotada', 'continua', 'monótona', 'finito'],
    },
  ],
  history: [
    {
      id: 1,
      question: '¿En qué año comenzó la Primera Guerra Mundial y cuál fue el detonante inmediato?',
      correct: '1914. El asesinato del Archiduque Francisco Fernando en Sarajevo.',
      hint: 'Sarajevo / Francisco Fernando',
      keywords: ['1914', 'francisco', 'fernando', 'sarajevo', 'asesinato'],
    },
    {
      id: 2,
      question: 'Explicá las causas estructurales de la Revolución Rusa de 1917.',
      correct: 'El agotamiento de la guerra, la crisis económica, el autoritarismo zarista y el surgimiento del movimiento obrero organizado.',
      hint: 'guerra / economía / zar / obreros',
      keywords: ['guerra', 'zar', 'economía', 'obrero', 'hambre', 'crisis'],
    },
    {
      id: 3,
      question: '¿Qué fue el "New Deal" y en qué contexto surgió?',
      correct: 'Conjunto de reformas de Roosevelt en 1933 para sacar a EE.UU. de la Gran Depresión post-1929.',
      hint: 'Roosevelt / 1929 / depresión',
      keywords: ['roosevelt', 'depresión', '1929', '1933', 'reforma'],
    },
  ],
  physics: [
    {
      id: 1,
      question: 'Enunciá la Segunda Ley de Newton y escribí su expresión matemática.',
      correct: 'La fuerza neta sobre un cuerpo es igual a su masa por su aceleración: F = m·a',
      hint: 'F = m·a',
      keywords: ['fuerza', 'masa', 'aceleración', 'f=ma', 'newton'],
    },
    {
      id: 2,
      question: '¿Qué establece la Ley de Conservación de la Energía?',
      correct: 'La energía total de un sistema aislado permanece constante; solo se transforma.',
      hint: 'no se crea / no se destruye',
      keywords: ['conserva', 'transforma', 'constante', 'aislado'],
    },
    {
      id: 3,
      question: 'Calculá la energía cinética de un cuerpo de 2 kg que se mueve a 10 m/s.',
      correct: 'Ec = ½·m·v² = ½·2·100 = 100 J',
      hint: 'Ec = ½mv²',
      keywords: ['100', 'cien', 'joule', '100j'],
    },
    {
      id: 4,
      question: 'Explicá qué es el movimiento armónico simple (MAS) y dá un ejemplo.',
      correct: 'Movimiento oscilatorio donde la fuerza restauradora es proporcional al desplazamiento. Ejemplos: péndulo simple, masa-resorte.',
      hint: 'oscilatorio / proporcional / resorte',
      keywords: ['oscilatorio', 'péndulo', 'resorte', 'proporcional', 'restauradora'],
    },
  ],
}

export const TIMEOUT_QUESTIONS = {
  math: [
    { id: 'tq1', question: 'Calculá la integral de f(x) = 2x desde 0 hasta 3.', correct: '9', keywords: ['9', 'nueve'] },
    { id: 'tq2', question: '¿Para qué valores de x es creciente f(x) = x² - 4x + 1?', correct: 'x > 2', keywords: ['x>2', 'mayor que 2', 'x mayor'] },
    { id: 'tq3', question: 'Enunciá el Teorema Fundamental del Cálculo.', correct: 'Si F es antiderivada de f, entonces ∫[a→b] f(x)dx = F(b) - F(a)', keywords: ['antiderivada', 'f(b)', 'f(a)', 'fundamental'] },
    { id: 'tq4', question: 'Calculá la derivada de f(x) = sin(x)·cos(x).', correct: 'cos(2x) o equivalente por regla del producto', keywords: ['cos(2x)', 'cos²', 'sin²', 'producto'] },
    { id: 'tq5', question: '¿Cuándo decimos que una función es continua en un punto x₀?', correct: 'Cuando existe f(x₀), existe el límite en x₀ y el límite coincide con f(x₀).', keywords: ['límite', 'coincide', 'existe', 'igual'] },
  ],
  history: [
    { id: 'tq1', question: '¿Qué fue la Conferencia de Yalta y quiénes participaron?', correct: 'Reunión de 1945 de Roosevelt, Churchill y Stalin para planificar la posguerra.', keywords: ['1945', 'roosevelt', 'churchill', 'stalin', 'posguerra'] },
    { id: 'tq2', question: '¿Cuándo y dónde cayó el Muro de Berlín?', correct: '9 de noviembre de 1989 en Berlín, marcando el fin de la Guerra Fría.', keywords: ['1989', 'noviembre', 'berlín', 'fría'] },
    { id: 'tq3', question: 'Explicá qué fue la descolonización del siglo XX.', correct: 'Proceso de independencia de los países de África y Asia del dominio europeo, principalmente entre 1945 y 1970.', keywords: ['independencia', 'áfrica', 'asia', 'europa', '1945'] },
  ],
  physics: [
    { id: 'tq1', question: '¿Qué establece el principio de superposición en ondas?', correct: 'El desplazamiento resultante es la suma algebraica de los desplazamientos individuales.', keywords: ['suma', 'algebraica', 'desplazamiento', 'superposición'] },
    { id: 'tq2', question: 'Un cuerpo cae libremente desde 80 m de altura. ¿Cuánto tarda en llegar al suelo? (g = 10 m/s²)', correct: '4 segundos. h = ½gt² → t = √(2h/g) = √16 = 4 s', keywords: ['4', 'cuatro', '4s', '4 s'] },
    { id: 'tq3', question: '¿Qué diferencia hay entre calor y temperatura?', correct: 'El calor es energía en tránsito entre sistemas; la temperatura mide el estado térmico de un cuerpo.', keywords: ['energía', 'tránsito', 'estado', 'térmica', 'diferencia'] },
    { id: 'tq4', question: 'Enunciá la Ley de Gravitación Universal de Newton.', correct: 'F = G·m₁·m₂/r². Dos cuerpos se atraen con fuerza proporcional al producto de sus masas e inversamente proporcional al cuadrado de la distancia.', keywords: ['G', 'masas', 'distancia', 'cuadrado', 'proporcional'] },
  ],
}

export const DAILY_MISSIONS = [
  {
    id: 'dm1',
    type: 'correction',
    title: 'Corregí tu error.',
    description: 'Explicá con tus palabras el concepto en el que fallaste ayer. Sin leer notas.',
    reward: '+8% de progreso · +1 reintento',
    scoreGain: 8,
  },
  {
    id: 'dm2',
    type: 'teach',
    title: 'Enseñá el concepto.',
    description: 'Explicá el tema más difícil como si lo explicaras a alguien que no sabe nada. Distinto a lo que dijiste antes.',
    reward: '+6% de progreso · +1 reintento',
    scoreGain: 6,
  },
  {
    id: 'dm3',
    type: 'speed',
    title: 'Sin pistas. Sin ayuda.',
    description: 'Respondé las siguientes preguntas sobre tus puntos débiles. No tenés ayuda disponible.',
    reward: '+10% de progreso · +1 reintento',
    scoreGain: 10,
  },
  {
    id: 'dm4',
    type: 'review',
    title: 'Revisión sin red.',
    description: 'Tres preguntas de conceptos que ya aprobaste. Confirmá que el dominio es real.',
    reward: '+5% de progreso · +1 reintento',
    scoreGain: 5,
  },
]

export const SENSEI_MESSAGES = {
  correct: [
    'Correcto.',
    'Bien. Seguí.',
    'Exacto.',
    'Sí. Eso es.',
    'Correcto. Continuamos.',
  ],
  incorrect: [
    'Incorrecto. Repasá el concepto.',
    'No. Confundiste los términos.',
    'Mal. Pensalo de nuevo.',
    'Incorrecto. Falta precisión.',
    'No alcanzó. Falta.',
  ],
  progress: [
    'Mejoró.',
    'Progresás.',
    'Vas bien. No te relajes.',
    'Avanzás.',
  ],
  timeout_unlock: [
    'Podrías rendir.',
    'Nivel suficiente para el examen.',
    'El timeout está disponible.',
  ],
  timeout_fail: [
    'No alcanzó. Volvemos a entrenar.',
    'Insuficiente. Más trabajo.',
    'Reprobado. Los errores tienen costo.',
  ],
  timeout_pass: [
    'Aprobado. Dominio confirmado.',
    'Pasaste. Trabajo completo.',
    '100%. Eso es dominio real.',
  ],
  reminder: [
    'No estudiaste hoy.',
    'El progreso baja sin práctica.',
    'Misión diaria pendiente.',
    'Hay trabajo por hacer.',
  ],
  dashboard: [
    'El dominio no es opcional.',
    'Constancia o retroceso. Elegís.',
    'Cada error es información.',
    'Sin excusas.',
  ],
}

export const getRandomMessage = (category) => {
  const msgs = SENSEI_MESSAGES[category] || SENSEI_MESSAGES.dashboard
  return msgs[Math.floor(Math.random() * msgs.length)]
}

export const checkAnswer = (userAnswer, question) => {
  const lower = userAnswer.toLowerCase().trim()
  if (!lower || lower.length < 2) return false
  return question.keywords.some(kw => lower.includes(kw.toLowerCase()))
}
