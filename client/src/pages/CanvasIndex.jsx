// import React from 'react'
import Details from "../components/Details"
import CanvasModel from "../canvas/CanvasModel"
import Configurator from "../components/Configurator"

const CanvasIndex = () => {
  return (
    <main className="transition-all ease-in app">
        <Details />
        <CanvasModel />
        <Configurator />
    </main>
  )
}

export default CanvasIndex