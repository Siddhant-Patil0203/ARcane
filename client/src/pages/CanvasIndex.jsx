// import React from 'react'
import Details from "../components/Details"
import CanvasModel from "../canvas/CanvasModel"
import Configurator from "../components/Configurator"
import { Layout } from "../components/Layout"
import Reviews from "../components/Reviews"
const CanvasIndex = () => {
  return (
    <main className="transition-all ease-in app">
      <Layout>
        <Details />
        <CanvasModel />
        
        <Configurator />
        <Reviews />
        </Layout>
    </main>
  )
}

export default CanvasIndex