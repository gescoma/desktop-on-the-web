'use client';

import { ReactComponentElement, createContext, useContext, useEffect, useState } from 'react'

export type Program = {
  name: string
  id: string
  icon: string
  maximized: boolean
  minimized: boolean
  active: boolean
  window: {
    width: number
    height: number
    x: number
    y: number
    zIndex: number
  }
}

const getInicialProcess = () => {
  const processRaw = localStorage.getItem('process')
  const process = processRaw ? JSON.parse(processRaw) : []
  return process
}

export const useProcessContext = () => {
  return useContext(ProcessContext)
}

const ProcessContext = createContext({})

export const ProcessProvider = ({ children }:{ children:React.ReactNode }) => {
  const process = useProcess()  

  return (
    <ProcessContext.Provider value={{ process }}>
      {children}
    </ProcessContext.Provider>
  )

}

export const useProcess = () => {
  const [process, setProcess] = useState<Program[]>([])

  useEffect(() => {
    const processOnServer = getInicialProcess()
    setProcess(processOnServer)
  }, [])

  const saveChangesLocalStorage = (newProcess:any) => {
    const newProcessString = JSON.stringify(newProcess)
    localStorage.setItem('process', newProcessString)
  }

  const rawSetProcess = (newProcess:any) => {
    saveChangesLocalStorage(newProcess)
    setProcess(newProcess)
  }

  const addProcess = (program:Program) => {
    const newProcess = [...process, program]
    rawSetProcess(newProcess)
  }

  const removeProcess = (id:string) => {
    const newProcess = process.filter((program) => program.id !== id)
    rawSetProcess(newProcess)
  }

  const updateWindow = (id:string, window:{width:number, height:number, x:number, y:number}) => {
    const newProcess = process.map((program) => {
      if (program.id !== id) return program
      return {
        ...program,
        window: {
          ...program.window,
          width: window.width + program.window.width,
          height: window.height + program.window.height,
          x: window.x,
          y: window.y
        }
      }
    })
    rawSetProcess(newProcess)
  }

  // clear process

  // maximize process

  // minimize process

  const windowOnTop = (id:string) => {
    const zIndex = process.find((program) => program.id === id)?.window.zIndex
    if (zIndex === process.length || zIndex===undefined) return;
    const newOrderProcess = process.map((program:Program) => {
      if (program.window.zIndex < zIndex) return program;
      if (program.window.zIndex === zIndex) {
        program.window.zIndex = process.length;
        return program;
      }
      return {
        ...program,
        window: {
          ...program.window,
          zIndex: program.window.zIndex - 1
        }
      };
    });
    rawSetProcess(newOrderProcess)
  }  

  return {
    process,
    addProcess,
    removeProcess,
    windowOnTop,
    updateWindow
  }
}