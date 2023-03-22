import { Program, useProcess } from "@/contexts/process";

import { Rnd } from "react-rnd";
import styles from "./window.module.css";

export function Window({ 
  program, 
  children,
  removeProcess, 
  windowOnTop, 
  updateWindow 
}: {
  program:Program, 
  children:React.ReactNode, 
  removeProcess:(id:string)=>void, 
  windowOnTop:(id:string)=>void,
  updateWindow:(id:string, window:{
    width:number, 
    height:number, 
    x:number, 
    y:number
  })=>void}) {
  return (
    <Rnd
      className={styles.window}
      style={{zIndex: program.window.zIndex}}
      default={{
        x: program.window.x,
        y: program.window.y,
        width: program.window.width,
        height: program.window.height,
      }}
      onMouseDown={() => {
        console.log(program.id)
        windowOnTop(program.id)
      }}
      onResizeStop={(e, d, r, delta, position) => {
        const window = {
          width: delta.width,
          height: delta.height,
          x: position.x,
          y: position.y
        }
        updateWindow(program.id, window)
      }}
      onDragStop={(e, d) => {
        const window = {
          width: 0,
          height: 0,
          x: d.x,
          y: d.y
        }
        updateWindow(program.id, window)
      }}
      
    >
      <div className={styles.navbar}>
        <div className={styles.buttons}>
          <button className={[styles.btn, styles.closeBtn].join(' ')} onClick={() => removeProcess(program.id)}></button>
          <button className={[styles.btn, styles.minBtn].join(' ')} onClick={() => {console.log("minimize")}}></button>
          <button className={[styles.btn, styles.maxBtn].join(' ')} onClick={() => {console.log("maximize")}}></button>
        </div>
        <div>{program.name}</div>
        <div>{program.icon}</div>
      </div>
      <div>
        {children}
      </div>
    </Rnd>
  );
}
