import React from 'react'
import AppRouter from '../routes/AppRouter'
import Header from '../components/Header'
const MainComp = () => {
  return (
    <div className="MainComp container">
      <div className="MainCompChild">
        <Header />
      </div>

      <div className="MainCompChild">
        <div className="MainCompItem content">
          <AppRouter />
        </div>
      </div>
    </div>
  )
}

export default MainComp
