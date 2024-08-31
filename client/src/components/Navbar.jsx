import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">LOGO</div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link to='/' className="text-white hover:text-gray-300">หน้าหลัก</Link>
          <Link to='/login' className="text-white hover:text-gray-300">ล็อกอิน</Link>
          <Link to='/register' className="text-white hover:text-gray-300">สมัครสมาชิก</Link>
        </div>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-500">
          <div className="space-y-2 p-4">
            <Link to='/' className="block text-white hover:text-gray-300">หน้าหลัก</Link>
            <Link to='/login' className="block text-white hover:text-gray-300">ล็อกอิน</Link>
            <Link to='/register' className="block text-white hover:text-gray-300">สมัครสมาชิก</Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
