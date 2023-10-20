import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const logo = "/assets/images/logo.png"
  return (
    <>
    <div className= ' flex justify-between items-center mw-[100%] px-[10px] py-[20px] md:px-[80px] bg-[#E3A008] '>
      <a href='/'><img src={logo} alt="Imagefound" className='w-[70px]'/></a>
      <div className='flex md:gap-[40px] gap-[10px] md:text-[25px] text-[#ffff] '>
        <Link to="/favourite" class="text-[18px] hover:text-underline border border-[2px] px-4 rounded-[8px]">Favourite</Link>
        <Link to='/compare' class="text-[18px] border border-[2px] px-4 rounded-[8px]">Compare</Link>
      </div>
    </div>
    </>
  )
}

export default Header