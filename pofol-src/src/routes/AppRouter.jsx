import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Intro from '../components/Intro'
import Work from '../components/Work'
import Edu from '../components/Edu'
import Home from '../components/Home'
import Project from '../components/Project'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="/work" element={<Work />} />
      <Route path="/edu" element={<Edu />} />
      <Route path="/project" element={<Project />} />
    </Routes>
  )
}

export default AppRouter
