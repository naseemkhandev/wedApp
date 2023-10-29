import React from 'react'
import {FiMenu} from 'react-icons/fi'

import Logo  from '../../icons/logo.png'

const Navbar = () => {
  return (
    <div className='z-20 absolute sm:flex sm:w-full sm:bg-[#a4634426] top-0 w-full p-6 px-30 sm:p-[8px] flex items-center justify-between' >
        <div className=' flex items-center  gap-3'>
            <img className=' w-[150px] h-[80px] sm:w-[100px] sm:h-[50px]' src={Logo} alt="" />
            
        </div>
        
    </div>
  )
}

export default Navbar