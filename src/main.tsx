import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Task from './tasks/task.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Task/>
  </StrictMode>,
)
