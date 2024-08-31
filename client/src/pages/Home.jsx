import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-4">ยินดีต้อนรับสู่หน้าหลัก</h1>
      </div>
      <Footer />
    </>
  )
}

export default Home
