import { AplicationIcon as Icon } from "@/components/applicationIcon"
import styles from './dock.module.css'
import { useProcess } from "@/contexts/process"
import { useState } from "react"

export function Dock() {
  const {process, addProcess} = useProcess()
  const [dockOpened, setDockOpened] = useState<Boolean>(false)

  return(
    <div className={styles.dock}>
      <span className={styles.bar}></span>
      <div className={styles.applications}>
        {process ? process.map((program) => (
          <Icon program={program} key={program.id}></Icon>
        )) : null}
      </div>
    </div>
  )
}