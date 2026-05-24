# Sensei — Prototipo funcional

Sistema de entrenamiento hasta el dominio real. Prototipo visual completo con lógica simulada.

## Correr localmente

```bash
npm install
npm run dev
```

Abre en `http://localhost:5173`

## Deploy en Netlify

### Opción 1: Drag & drop
```bash
npm run build
```
Luego arrastrá la carpeta `dist/` a [netlify.com/drop](https://app.netlify.com/drop)

### Opción 2: GitHub + Netlify CI
1. Subí el proyecto a GitHub
2. En Netlify → "Add new site" → "Import an existing project"
3. Conectá el repo
4. Build command: `npm run build`
5. Publish directory: `dist`
6. Deploy

El archivo `netlify.toml` ya configura todo automáticamente.

## Estructura

```
src/
├── App.jsx                 ← router de pantallas + estado global
├── components/
│   ├── Subjects.jsx        ← lista y gestión de materias
│   ├── Dashboard.jsx       ← pantalla principal
│   ├── Training.jsx        ← modo entrenamiento
│   ├── DailyMission.jsx    ← misión diaria
│   └── Timeout.jsx         ← examen final con timer
└── data/
    └── mockData.js         ← preguntas, niveles, mensajes de Sensei
```

## Materias con preguntas mock

- **Análisis Matemático** — límites, derivadas, integrales, teoremas
- **Historia Contemporánea** — WWI, Revolución Rusa, New Deal
- **Física II** — Newton, energía, MAS, cinemática

Las nuevas materias que crees funcionan con las preguntas de Matemática como fallback.

## Personalizar

Para agregar preguntas a una materia nueva:
1. Abrí `src/data/mockData.js`
2. Agregá una key en `TRAINING_QUESTIONS` con el id de la materia
3. Agregá preguntas con el formato `{ id, question, correct, hint, keywords }`

Los `keywords` son las palabras que Sensei busca en la respuesta para evaluar si es correcta.
