import React from 'react'
import { useNavigate } from 'react-router-dom'
import AssistantPreview from '../Components/AssistantPreview'
import logo from "../assets/logo.png"
import { FiArrowUpRight, FiCode, FiMic, FiZap } from 'react-icons/fi'
const STEPS = [
  {
    step: "01",
    title: "Sign up free",
    desc: "Continue with Google and create your assistant instantly.",
  },

  {
    step: "02",
    title: "Customize assistant",
    desc: "Set your business name, tone, voice and theme.",
  },

  {
    step: "03",
    title: "Train your assistant",
    desc: "Add business details and personalize responses.",
  },

  {
    step: "04",
    title: "Embed anywhere",
    desc: "Copy one script tag and add it to your website.",
  },
];

function Home({ user }) {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen overflow-hidden bg-[#f2f3ed] text-[#17251f]'>
      <section className='relative isolate overflow-hidden px-5 pb-14 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-10 lg:pt-16'>
        <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_78%_18%,rgba(200,243,106,0.22),transparent_34%),radial-gradient(ellipse_at_12%_82%,rgba(123,155,105,0.12),transparent_38%)]' />
        <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(rgba(23,43,34,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(23,43,34,0.14)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]' />
        <div className='mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12'>
          <div className='py-4 text-center sm:py-8 lg:text-left'>
            <span className='inline-flex items-center gap-2 rounded-full border border-[#d8e4cd] bg-[#fbfcf8] px-3.5 py-2 text-[11px] font-bold tracking-[0.08em] text-[#526c46] shadow-[0_4px_16px_-12px_rgba(23,43,34,0.4)] sm:text-xs'>
              <span className='size-1.5 rounded-full bg-[#8eae70]' /> VOICE AI FOR MODERN WEBSITES
            </span>
            <h1 className='mx-auto mt-7 max-w-[650px] font-[Manrope,sans-serif] text-4xl font-semibold leading-[1.08] text-[#17251f] sm:mt-8 sm:text-5xl lg:mx-0 lg:text-6xl'>
              Give your website<br className='hidden sm:block' /> a voice of <span className='text-[#6b8d4c]'>its own.</span>
            </h1>
            <p className='mx-auto mt-6 max-w-[530px] text-sm leading-7 text-[#66736a] sm:text-base lg:mx-0'>Create a smart voice assistant that understands your business, answers visitor questions, and helps people find their way around your site.</p>
            <div className='mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start'>
              <button onClick={()=>navigate("/builder")} className='flex min-h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-[#172b22] px-6 text-sm font-semibold text-white shadow-[0_12px_28px_-15px_rgba(23,43,34,0.7)] transition hover:-translate-y-0.5 hover:bg-[#294537] sm:w-auto'>
                Build your assistant <FiArrowUpRight className='text-base text-lime-300' />
              </button>
              <span className='text-xs text-[#879087]'>Free plan includes 200 AI responses</span>
            </div>
            <div className='mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] font-medium text-[#657268] lg:justify-start'>
              <span className='inline-flex items-center gap-1.5'><FiMic className='text-[#6e8a56]' /> Natural voice</span>
              <span className='inline-flex items-center gap-1.5'><FiZap className='text-[#6e8a56]' /> Fast setup</span>
              <span className='inline-flex items-center gap-1.5'><FiCode className='text-[#6e8a56]' /> One-line embed</span>
            </div>
          </div>
          <div className='mx-auto w-full max-w-[420px] lg:max-w-none'>
            <AssistantPreview />
          </div>
        </div>
      </section>

      <section className='border-t border-[#e3e8df] bg-[#fbfbf7] px-5 py-14 sm:px-8 sm:py-20 lg:px-10'>
        <div className='mx-auto max-w-7xl'>
          <div className='mb-9 flex flex-col gap-3 sm:mb-11 sm:flex-row sm:items-end sm:justify-between'>
            <div>
              <p className='text-[10px] font-bold tracking-[0.18em] text-[#78905f]'>FROM FIRST CLICK TO LIVE AGENT</p>
              <h2 className='mt-3 font-[Manrope,sans-serif] text-3xl font-semibold text-[#17251f] sm:text-4xl'>Ready in four steps.</h2>
            </div>
            <p className='max-w-md text-sm leading-6 text-[#78837a]'>A helpful voice assistant for your website, configured around your business.</p>
          </div>
          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'>
            {STEPS.map((s,i)=>(
              <div key={i} className='group rounded-lg border border-[#e5e9e1] bg-[#f8f9f4] p-5 transition hover:border-[#cad8bf] hover:bg-white'>
                <span className='flex size-9 items-center justify-center rounded-lg bg-[#e9f0e2] text-xs font-bold text-[#506c42]'>{s.step}</span>
                <h3 className='mt-5 text-base font-bold text-[#24372b]'>{s.title}</h3>
                <p className='mt-2 text-sm leading-6 text-[#778179]'>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className='bg-[#14271f] px-5 py-8 text-white sm:px-8 lg:px-10'>
        <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left'>
          <div>
            <div onClick={()=>navigate("/")} className='flex cursor-pointer items-center gap-2.5'>
              <img src={logo} alt="logo" className='h-8 w-auto object-contain' />
              <h2 className='font-[Manrope,sans-serif] text-lg font-bold text-white'>Vox<span className='text-lime-300'>AI</span></h2>
            </div>
            <p className='mt-1 text-xs text-white/55'>Voice AI assistant for websites</p>
          </div>
          <p className='text-xs text-white/40'>© {new Date().getFullYear()} VoxAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home
