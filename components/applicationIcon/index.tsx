import { Program } from '@/contexts/process'
import styles from './icon.module.css'
import { useProcess } from '@/contexts/process'

export function AplicationIcon ({program}:{program:Program}) {
  const {minimizeProcess} = useProcess()

  const reopen = () => {
  }
  
  return (
    <div className={styles.app} onClick={reopen}>
      <div className={styles.icon}>
      </div>
    </div>
  )
}