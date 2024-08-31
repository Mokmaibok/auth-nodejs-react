import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import config from '../config'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Register() {
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  const handleRegister = async () => {
    if (user.password !== user.confirmPassword) {
      Swal.fire({
        title: 'สมัครสมาชิกล้มเหลว',
        text: 'รหัสผ่านไม่ตรงกัน โปรดลองอีกครั้ง',
        icon: 'error',
      })
      return
    }

    try {
      const res = await axios.post(config.apiPath + '/api/auth/register', user)

      if (res.data.user) {
        Swal.fire({
          title: 'สมัครสมาชิกสำเร็จ',
          text: 'สมัครมาชิกเรียบร้อยแล้ว',
          icon: 'success'
        })

        navigate('/login') // Redirect to login page after successful registration
      }
    } catch (e) {
      Swal.fire({
        title: 'สมัครสมาชิกล้มเหลว',
        text: e.response?.data?.message || 'เกิดข้อผิดพลาด โปรดลองอีกครั้ง',
        icon: 'error',
      })
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">สมัครสมาชิก</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">ชื่อผู้ใช้</label>
              <input
                type='text'
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="โปรดใส่ชื่อผู้ใช้ของคุณ"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
              <input
                type='password'
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="โปรดใส่รหัสผ่านของคุณ"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">ยืนยันรหัสผ่าน</label>
              <input
                type='password'
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="โปรดยืนยันรหัสผ่านของคุณ"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">อีเมล</label>
              <input
                type='email'
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="โปรดใส่อีเมลของคุณ"
              />
            </div>
            <button
              type='button'
              onClick={handleRegister}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              สมัครสมาชิก
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Register
