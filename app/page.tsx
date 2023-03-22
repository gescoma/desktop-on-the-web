'use client';

import type { Program } from '@/contexts/process'
import { Window } from '@/components/window';
import { useProcess } from '@/contexts/process'

export default function Home() {
  const {process, addProcess, ...functions} = useProcess()

  const teste = () => {
    addProcess({
      name: `teste-${Date.now()}`,
      id: `teste-${Date.now()}`,
      icon: 'teste',
      maximized: false,
      minimized: false,
      active: true,
      window: {
        width: 800,
        height: 600,
        x: process.length * 10,
        y: process.length * 10,
        zIndex: process.length + 1
      }
    })
  }

  return (
    <>
      {process.map((program:Program) => (
          <Window program={program} key={program.id} {...functions}>
            hello world
          </Window>
      ))}
      <button onClick={() => teste()}>Add programm to process</button>
    </>
  )
}
