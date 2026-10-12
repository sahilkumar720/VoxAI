import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import { FiChevronDown, FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi";
import axios from 'axios';
import { ServerUrl } from '../App.jsx';
import toast from 'react-hot-toast';
function Navbar({user , setUser}) {
  const navigate = useNavigate()
  const [menuOpen,setMenuOpen] = useState(false)
  const [profileOpen,setProfileOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout" , {withCredentials:true})
      setUser(null)
      toast.success("Logout Successfully")
      navigate("/login")
    } catch (error) {
      toast.error("logout failed")
      console.log(error)
    } 
  }
  return (
    <div className='sticky top-0 z-50 border-b border-[#e3e8df] bg-[#fbfbf7]/90 shadow-[0_8px_28px_-22px_rgba(20,39,31,0.45)] backdrop-blur-xl'>
      <div className='relative mx-auto grid max-w-7xl grid-cols-[1fr_auto] items-center px-4 py-3.5 sm:px-6 md:grid-cols-[1fr_auto_1fr]'>
        <div onClick={()=>navigate("/")} className='flex cursor-pointer items-center gap-1'>
          <img src={logo} alt="logo" className='h-11 w-auto object-contain' />
          <h1 className='font-[Manrope,sans-serif] text-xl font-extrabold leading-none text-[#17251f]'>Vox<span className='text-[#6c8d4f]'>AI</span></h1>
        </div>

        {user && (
          <nav aria-label='Main navigation' className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-xl border border-[#e3e8df] bg-white/80 p-1 md:flex'>
            <button onClick={()=>navigate("/builder")} className='cursor-pointer rounded-lg bg-[#172b22] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#294537]'>Builder</button>
            <button onClick={()=>navigate("/billing")} className='cursor-pointer rounded-lg px-5 py-2.5 text-sm font-semibold text-[#536158] transition hover:bg-[#f1f5ec] hover:text-[#243a2e]'>Billing</button>
          </nav>
        )}

        <div className='flex items-center justify-end gap-2 md:col-start-3'>
          {user && (
            <div className='relative hidden items-center gap-2 md:flex'>
              <button
                type='button'
                onClick={()=>setProfileOpen(!profileOpen)}
                aria-label='Open profile details'
                aria-expanded={profileOpen}
                className='grid size-11 cursor-pointer place-items-center rounded-xl border border-[#dce5d5] bg-[#f4f7ef] text-[#405b3d] transition hover:border-[#a8bb9d] hover:bg-[#eaf0e3] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#78905f]'
              >
                <FiUser size={19} aria-hidden='true' />
              </button>
              {profileOpen && (
                <div role='dialog' aria-label='Profile details' className='absolute right-0 top-[calc(100%+0.75rem)] z-50 w-[min(20rem,calc(100vw-2rem))] rounded-xl border border-[#e3e8df] bg-[#fbfbf7] p-4 shadow-[0_22px_55px_-28px_rgba(20,39,31,0.45)]'>
                  <div className='flex items-center gap-3 border-b border-[#e8ece5] pb-4'>
                    <div className='grid size-11 shrink-0 place-items-center rounded-full bg-[#eaf0e3] text-[#405b3d] ring-1 ring-[#dce7d1]'><FiUser size={19} aria-hidden='true' /></div>
                    <div className='min-w-0'>
                      <p className='truncate text-sm font-bold text-[#26382d]'>{user.name}</p>
                      <p className='mt-1 break-all text-xs leading-5 text-[#78837a]'>{user.email}</p>
                    </div>
                  </div>
                  <div className='flex items-center justify-between pt-3'>
                    <span className='text-xs font-medium text-[#78837a]'>Current plan</span>
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${user?.plan === "pro" ? "bg-[#e8f0d9] text-[#49683b]" : "bg-[#edf0e9] text-[#68766b]"}`}>{user?.plan || "free"}</span>
                  </div>
                </div>
              )}
              <button onClick={handleLogout} title='Log out' aria-label='Log out' className='grid size-11 cursor-pointer place-items-center rounded-xl border border-[#f0ded8] bg-[#fff8f5] text-[#a95749] transition hover:border-[#e9c6bc] hover:bg-[#fff0ec] hover:text-[#98493d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c45d4a]'><FiLogOut size={18}/></button>
            </div>
          )}
          {user && (
            <button onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} className='grid size-10 place-items-center rounded-lg border border-[#e3e8df] text-[#536158] transition hover:bg-[#f1f5ec] md:hidden'>
              {menuOpen ? <FiX size={22}/> : <FiMenu size={22}/>}
            </button>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className='px-4 pb-4 md:hidden'>
          <div className='rounded-xl border border-[#e3e8df] bg-white p-4 shadow-[0_18px_45px_-32px_rgba(20,39,31,0.55)]'>
            <div className='flex items-center gap-4 border-b border-[#e8ece5] pb-4'>
              <div className='flex size-12 shrink-0 items-center justify-center rounded-full bg-[#eaf0e3] text-[#405b3d] ring-1 ring-[#dce7d1]'>
                <FiUser size={21} aria-hidden='true' />
              </div>
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-bold text-[#26382d]'>{user.name}</p>
                <p className='mt-1 truncate text-xs text-[#78837a]'>{user.email}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${user?.plan === "pro" ? "bg-[#e8f0d9] text-[#49683b]" : "bg-[#edf0e9] text-[#68766b]"}`}>{user?.plan || "free"}</span>
            </div>
            <div className='mt-4 flex flex-col gap-2'>
              <button className='w-full rounded-lg bg-[#172b22] py-2.5 text-sm font-semibold text-white transition hover:bg-[#294537]' onClick={()=>{navigate("/builder");setMenuOpen(false)}}>Builder</button>
              <button className='w-full rounded-lg border border-[#dce3d9] bg-[#fbfbf7] py-2.5 text-sm font-semibold text-[#536158] transition hover:bg-[#f3f6ee]' onClick={()=>{navigate("/billing");setMenuOpen(false)}}>Billing</button>
            </div>
            <button onClick={()=>{setMenuOpen(false);handleLogout()}} className='mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#f0ded8] bg-[#fff8f5] py-2.5 text-sm font-semibold text-[#a95749] transition hover:border-[#e9c6bc] hover:bg-[#fff0ec]'><FiLogOut size={16}/> Log out</button>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default Navbar
