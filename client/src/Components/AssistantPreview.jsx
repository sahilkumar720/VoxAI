import React, { useState } from 'react'
import { FaMicrophone } from "react-icons/fa";
const themes = {
  dark: {
    name: "Grove",
    swatch: "bg-lime-300",
    bg: "bg-[#14271f]",
    overlay: "bg-[radial-gradient(circle_at_50%_22%,rgba(200,243,106,0.15),transparent_48%)]",
    orb: "from-lime-200 via-lime-400 to-[#6e9657]",
    ring: "border-lime-200/45",
    cardBorder: "border border-white/15",
    text: "text-[#f5f6ee]",
    sub: "text-white/65",
    listening: "text-lime-300",
    wave: "bg-lime-300",
    button: "from-lime-300 to-[#8faf69]",
    micGlow: "shadow-[0_0_60px_rgba(200,243,106,0.24)]",
    selector: "text-white",
    inactive: "border-white/10 text-white/50 hover:bg-white/10 hover:text-white",
    active: "border-lime-300/70 bg-lime-300/10 text-lime-200",
  },

  light: {
    name: "Daylight",
    swatch: "bg-[#dce8cd]",
    bg: "bg-[#f7f8f1]",
    overlay: "bg-[radial-gradient(circle_at_50%_22%,rgba(119,151,91,0.16),transparent_48%)]",
    orb: "from-[#dce9cb] via-[#a9c392] to-[#718f62]",
    ring: "border-[#718f62]/40",
    cardBorder: "border border-[#dce5d5]",
    text: "text-[#1b2b21]",
    sub: "text-[#66756a]",
    listening: "text-[#607c4d]",
    wave: "bg-[#789565]",
    button: "from-[#c8f36a] to-[#8eae70]",
    micGlow: "shadow-[0_0_60px_rgba(118,153,88,0.25)]",
    selector: "text-[#33463a]",
    inactive: "border-[#dce5d5] text-[#718075] hover:bg-white",
    active: "border-[#718e5d] bg-[#e9f0e1] text-[#354b36]",
  },

  glass: {
    name: "Glass",
    swatch: "bg-[#9ed7df]",
    bg: "bg-[#28443b]/90 backdrop-blur-[45px]",
    overlay: "bg-[radial-gradient(circle_at_50%_22%,rgba(141,216,239,0.19),transparent_48%)]",
    orb: "from-[#d7f0e9] via-[#9ed7df] to-[#9eb89c]",
    ring: "border-[#a8e1e5]/45",
    cardBorder: "border border-white/25",
    text: "text-white",
    sub: "text-white/70",
    listening: "text-[#a8e1e5]",
    wave: "bg-[#a8e1e5]",
    button: "from-[#a8e1e5] to-[#9dbd9a]",
    micGlow: "shadow-[0_0_60px_rgba(141,216,239,0.3)]",
    selector: "text-white",
    inactive: "border-white/15 text-white/55 hover:bg-white/10 hover:text-white",
    active: "border-[#a8e1e5]/70 bg-white/10 text-[#c7f1ec]",
  },

  neon: {
    name: "Signal",
    swatch: "bg-[#ff8068]",
    bg: "bg-[#101b18]",
    overlay: "bg-[radial-gradient(circle_at_50%_22%,rgba(255,128,104,0.17),transparent_48%)]",
    orb: "from-[#c8f36a] via-[#9ad36c] to-[#ff8068]",
    ring: "border-[#ff8068]/50",
    cardBorder: "border border-lime-300/20",
    text: "text-[#f4f7e9]",
    sub: "text-[#d7e3d4]/70",
    listening: "text-lime-300",
    wave: "bg-lime-300",
    button: "from-lime-300 to-[#ff8068]",
    micGlow: "shadow-[0_0_60px_rgba(200,243,106,0.28)]",
    selector: "text-white",
    inactive: "border-white/10 text-white/50 hover:bg-white/10 hover:text-white",
    active: "border-[#ff8068]/70 bg-[#ff8068]/10 text-[#ffad9c]",
  },
}

function AssistantPreview() {

    const [theme,setTheme]= useState("dark")
    const current = themes[theme]
  return (
    <div className='flex items-center justify-center px-2 py-4 sm:px-4 sm:py-6'>
      <div className={`relative isolate flex flex-col overflow-hidden rounded-[1.75rem] border p-6 shadow-[0_28px_70px_-35px_rgba(15,35,26,0.65)] transition-colors duration-500  sm:p-7 ${current.bg} ${current.cardBorder}`}>
        
        <div className={`pointer-events-none absolute inset-0 -z-10 ${current.overlay}`} />
        <div className='flex items-center justify-between gap-3'>
          <div>
            <p className={`text-[10px] font-bold tracking-[0.18em] ${current.sub}`}>VOICE AGENT</p>
            <p className={`mt-1.5 text-sm font-semibold ${current.text}`}>Live preview</p>
          </div>
          <span className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] font-semibold tracking-[0.1em] ${current.cardBorder} ${current.sub}`}><i className='size-1.5 rounded-full bg-lime-400' /> ONLINE</span>
        </div>

        <div className='mt-3 flex flex-wrap  gap-2' role='group' aria-label='Preview assistant themes'>
          {Object.entries(themes).map(([id, item]) => (
            <button
              key={id}
              type='button'
              onClick={() => setTheme(id)}
              aria-label={`Use ${item.name} theme`}
              aria-pressed={theme === id}
              className={`flex min-h-7 items-center gap-2 rounded-full border px-2.5 text-[8px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 ${current.selector} ${theme === id ? current.active : current.inactive}`}
            >
              <span className={`size-2 rounded-full ${item.swatch}`} />{item.name}
            </button>
          ))}
        </div>

        <div className='relative mx-auto shrink-0 grid size-30  place-items-center sm:mt-6 '> 
          <div className={`absolute inset-0 scale-125 rounded-full  border-4 bg-gradient-to-br opacity-35 blur-3xl transition-colors duration-500 motion-reduce:animate-none animate-pulse [animation-duration:4s] ${current.orb}`} />
          <span aria-hidden='true' className={`absolute  inset-0 rounded-full border motion-reduce:animate-none animate-ping [animation-duration:3.2s] ${current.ring}`} />
          <span aria-hidden='true' style={{ animationDelay: '1.6s' }} className={`absolute inset-0 rounded-full border motion-reduce:animate-none animate-ping [animation-duration:3.2s] ${current.ring}`} />
          <div style={{ animationDuration: '4s' }} className={`relative size-24 rounded-full bg-gradient-to-br shadow-[inset_-10px_-12px_24px_rgba(20,39,31,0.22),inset_8px_8px_24px_rgba(255,255,255,0.48),0_16px_45px_rgba(20,39,31,0.2)] transition-colors duration-500 before:absolute before:inset-3 before:rounded-full before:border before:border-white/35 before:bg-white/15 before:content-[''] motion-reduce:animate-none animate-pulse sm:size-28 ${current.orb}`} />
        </div>

        <div className='mt-3 text-center'>
          <h2 className={`font-[Manrope,sans-serif] text-2xl font-semibold sm:text-[1.7rem] ${current.text}`}>Hello! I'm Vox AI</h2>
          <p className={`mx-auto mt-1 max-w-[280px] text-sm leading-6 ${current.sub}`}>Your smart voice assistant. Ask anything about your website.</p>
          <div className={`mt-3 flex items-center justify-center gap-2 text-xs font-semibold ${current.listening}`}><span className={`size-1.5 rounded-full motion-reduce:animate-none animate-pulse ${current.wave}`} />Listening</div>
          <div className='mt-3 flex h-7 items-center justify-center gap-1.5' aria-hidden='true'>
            {[12, 22, 16, 28, 18, 24, 11, 20, 14].map((height, index) => <span key={index} className={`w-1 rounded-full opacity-80 motion-reduce:animate-none animate-pulse ${current.wave}`} style={{ height, animationDelay: `${index * 110}ms`, animationDuration: '1.1s' }} />)}
          </div>
        </div>

        <div className='relative z-10 mx-auto mt-5 flex shrink-0 flex-col items-center gap-2'>
          <div aria-hidden='true' className={`pointer-events-none absolute inset-x-1 top-0 mx-auto size-16 rounded-full opacity-35 blur-xl motion-reduce:animate-none animate-pulse ${current.wave}`} />

          <button type='button' aria-label='Start voice conversation' className={`relative z-10 grid size-16 place-items-center rounded-full border-4 border-white/25 bg-gradient-to-br shadow-xl transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime-300 ${current.button} ${current.micGlow}`}>
            <FaMicrophone className='text-[#14271f]' size={28} aria-hidden='true' />
          </button>
          <span className={`text-[9px] font-bold tracking-[0.18em] ${current.sub}`}>TAP TO TALK</span>
        </div>
      </div>
    </div>
  )
}

export default AssistantPreview
