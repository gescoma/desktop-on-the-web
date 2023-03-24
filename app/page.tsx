'use client';

import { Dock } from '@/components/dock';
import { Program } from '@/contexts/process'
import { Window } from '@/components/window';
import styles from "./page.module.css"
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
      <div className={styles.desktop}>
        {process.map((program:Program) => (
            <Window program={program} key={program.id} {...functions}>
              hello world
            </Window>
        ))}
      </div>
      <Dock></Dock>
    </>
  )
}
