
import { useState } from "react";
import { HiOutlineSparkles, HiOutlineMicrophone } from "react-icons/hi";
import { HiArrowUpRight, HiOutlineBolt, HiOutlineCodeBracket } from "react-icons/hi2";
import { FcGoogle } from "react-icons/fc";
import logo from "../assets/logo.png";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from "axios"
import { ServerUrl } from '../App.jsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


function Login({setUser}) {
    const navigate = useNavigate()
    const [selectedTheme, setSelectedTheme] = useState("grove");

    const themes = [
        {
            id: "grove",
            name: "Grove",
            swatch: "bg-lime-300",
            accent: "text-lime-300",
            mic: "bg-lime-300 text-[#17251f]",
            wave: "bg-lime-300",
        },
        {
            id: "signal",
            name: "Signal",
            swatch: "bg-[#ff8068]",
            accent: "text-[#ff8068]",
            mic: "bg-[#ff8068] text-[#17251f]",
            wave: "bg-[#ff8068]",
        },
        {
            id: "glacier",
            name: "Glacier",
            swatch: "bg-[#8dd8ef]",
            accent: "text-[#8dd8ef]",
            mic: "bg-[#8dd8ef] text-[#17251f]",
            wave: "bg-[#8dd8ef]",
        },
    ];
    const activeTheme = themes.find((theme) => theme.id === selectedTheme);


    const handleLogin = async () => {
        try {
            const result = await signInWithPopup(auth,provider)
           const {displayName , email} = result.user
           const res = await axios.post(ServerUrl + "/api/auth/google" , { name:displayName , email} , {withCredentials:true})
           setUser(res.data)
        
           toast.success("Login Successfully")
           navigate("/")
        } catch (error) {
            toast.error("Login Failed...")
            console.log(error)
        }
    }

    return (
        <main className="min-h-screen bg-[#f2f3ed] p-3 font-['DM_Sans',sans-serif] text-[#17251f] sm:p-5 lg:p-7">
            <div className="mx-auto grid min-h-[calc(100vh-1.5rem)] max-w-[1440px] overflow-hidden rounded-[1.75rem] bg-[#fbfbf7] shadow-[0_28px_90px_-45px_rgba(17,37,29,0.35)] sm:min-h-[calc(100vh-2.5rem)] lg:grid-cols-[1.12fr_0.88fr] lg:rounded-[2rem]">
            <section className="relative isolate flex min-h-[680px] flex-col overflow-hidden bg-[#14271f] px-6 py-7 text-white sm:px-10 sm:py-9 lg:min-h-[760px] lg:px-14 lg:py-11">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_76%_12%,rgba(160,199,126,0.19),transparent_38%),radial-gradient(ellipse_at_15%_88%,rgba(104,143,118,0.15),transparent_42%)]" />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />
                <header className="flex items-center justify-between gap-4">
                    <a className="flex items-center gap-2.5 text-[21px] font-extrabold tracking-[-0.06em] text-white" href="/" aria-label="VoxAI home">
                        <span className="grid size-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/10"><img className="size-6 object-contain" src={logo} alt="" /></span>
                        <span>vox<span className="text-lime-300">ai</span></span>
                    </a>
                    <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[9px] font-bold tracking-[0.19em] text-white/60 sm:flex"><span className="size-1.5 rounded-full bg-lime-300 shadow-[0_0_12px_rgba(190,242,100,0.8)]" /> VOICE, IN YOUR ELEMENT</span>
                </header>

                <div className="mt-12 max-w-[550px] sm:mt-16 lg:mt-[4.25rem]">
                    <p className="mb-5 flex items-center gap-2 text-[10px] font-bold tracking-[0.22em] text-lime-300"><HiOutlineSparkles className="text-base" /> YOUR WEBSITE, IN CONVERSATION</p>
                    <h1 className="font-['Manrope',sans-serif] text-[clamp(2.8rem,7vw,5.25rem)] font-semibold leading-[0.99] tracking-[-0.065em] text-[#f5f6ee]">Make every<br />visit feel like<br /><span className="text-lime-300">a conversation.</span></h1>
                    <p className="mt-6 max-w-[410px] text-[15px] leading-7 text-white/60 sm:text-base">Give your website a voice that knows your business, feels like your brand, and is always there to help.</p>
                </div>

                <div className="mt-auto pt-12 sm:pt-14 lg:pt-16">
                    <div className="mb-3 flex items-center justify-between gap-3 text-[9px] font-bold tracking-[0.16em] text-white/45 sm:text-[10px]">
                        <span className="flex items-center gap-2"><i className="size-1.5 rounded-full bg-lime-300" /> LIVE AGENT PREVIEW</span>
                        <span>YOUR BRAND, YOUR VOICE</span>
                    </div>
                    <div className="rounded-2xl border border-white/15 bg-[#f7f8f2] p-4 text-[#17251f] shadow-[0_24px_60px_-32px_rgba(0,0,0,0.75)] sm:rounded-[1.35rem] sm:p-5">
                        <div className="flex items-center gap-3">
                            <div className="grid size-10 place-items-center rounded-xl bg-[#e8eee2] text-[#355143]"><HiOutlineMicrophone className="text-xl" /></div>
                            <div className="min-w-0 flex-1"><strong className="block text-sm font-bold">Meet your assistant</strong><span className="mt-1 flex items-center gap-1.5 text-[11px] text-[#718077]"><i className="size-1.5 rounded-full bg-[#72b78a]" /> Online now</span></div>
                            <button className="grid size-9 place-items-center rounded-full text-xl leading-none text-[#78847c] transition hover:bg-black/5" type="button" aria-label="More options">···</button>
                        </div>
                        <div className="mt-4 max-w-[290px] rounded-2xl rounded-tl-sm bg-[#edf0e9] px-4 py-3 text-[13px] leading-5 text-[#405047]">Hey there! What can I help you find today?</div>
                        <div className="mt-4 flex items-center gap-3 rounded-xl bg-[#17251f] px-3 py-3 text-white sm:px-4">
                            <span className={`grid size-10 shrink-0 place-items-center rounded-full transition-colors ${activeTheme.mic}`}><HiOutlineMicrophone className="text-lg" /></span>
                            <div className="min-w-0 flex-1">
                                <div className="flex h-7 items-center justify-center gap-[3px]" aria-hidden="true">{Array.from({ length: 25 }, (_, index) => <i key={index} className={`w-[3px] rounded-full opacity-90 transition-colors ${activeTheme.wave}`} style={{ height: `${7 + ((index * 13 + 5) % 17)}px` }} />)}</div>
                                <span className="mt-1 block text-center text-[8px] font-bold tracking-[0.2em] text-white/45">TAP TO TALK</span>
                            </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between text-[10px] text-[#879188]"><span>Powered by <b className="font-bold text-[#45564b]">voxai</b></span><HiArrowUpRight /></div>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                        <div><p className="text-[9px] font-bold tracking-[0.16em] text-white/75">AGENT THEMES</p><p className="mt-1 text-[11px] text-white/40">A voice that looks like you</p></div>
                        <div className="flex items-center gap-1.5" role="group" aria-label="Preview agent themes">
                            {themes.map((theme) => (
                                <button
                                    key={theme.id}
                                    type="button"
                                    className={`flex items-center gap-2 rounded-full border px-2.5 py-1.5 text-[10px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-300 ${selectedTheme === theme.id ? "border-white/30 bg-white/10 text-white" : "border-transparent text-white/45 hover:bg-white/5 hover:text-white/80"}`}
                                    onClick={() => setSelectedTheme(theme.id)}
                                    aria-pressed={selectedTheme === theme.id}
                                >
                                    <span className={`size-2.5 rounded-full ${theme.swatch}`} />
                                    {theme.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <footer className="mt-8 flex items-center justify-between text-[9px] font-semibold tracking-[0.15em] text-white/35"><span>BUILT FOR THE WAY PEOPLE TALK.</span><span>01 — 03</span></footer>
            </section>

            <section className="flex min-h-[620px] flex-col px-6 py-7 sm:px-10 sm:py-9 lg:min-h-[760px] lg:px-14 lg:py-11">
                <div className="flex items-center justify-end gap-2 text-[12px] text-[#7a837c]"><span>Already have an account?</span><a className="inline-flex items-center gap-1 font-bold text-[#243a2e] transition hover:text-[#638941]" href="#login">Sign in <HiArrowUpRight /></a></div>
                <div className="mx-auto my-auto w-full max-w-[390px] py-12" id="login">
                    <div className="mb-8 grid size-12 place-items-center rounded-2xl bg-[#eaf0e3] text-[#49613c] ring-1 ring-[#dfe8d6]"><HiOutlineBolt className="text-xl" /></div>
                    <p className="mb-3 text-[10px] font-extrabold tracking-[0.2em] text-[#718264]">GET STARTED WITH VOXAI</p>
                    <h2 className="font-['Manrope',sans-serif] text-[clamp(2.2rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.06em] text-[#17251f]">Your next<br />conversation starts here.</h2>
                    <p className="mt-4 max-w-[340px] text-[14px] leading-6 text-[#747e76]">Create an account to build an AI voice agent for your business.</p>

                    <button onClick={handleLogin} className="mt-9 flex h-14 w-full items-center justify-center gap-3 rounded-xl border border-[#dce1da] bg-white px-4 text-[14px] font-bold text-[#27362d] shadow-[0_3px_12px_-8px_rgba(22,42,31,0.35)] transition hover:-translate-y-0.5 hover:border-[#bfcbbf] hover:shadow-[0_10px_24px_-15px_rgba(22,42,31,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#708b5d]" type="button">
                        <FcGoogle className="text-lg" />
                        <span>Continue with Google</span>
                        <HiArrowUpRight className="ml-auto text-[#8c978f]" />
                    </button>
                    <div className="my-7 flex items-center gap-4 text-[9px] font-bold tracking-[0.18em] text-[#a0a8a0]"><span className="h-px flex-1 bg-[#e4e7e0]" />OR<span className="h-px flex-1 bg-[#e4e7e0]" /></div>
                    <p className="flex items-start gap-2.5 text-[12px] leading-5 text-[#778179]"><HiOutlineCodeBracket className="mt-0.5 shrink-0 text-base text-[#758c63]" /> One tiny script. A much better website experience.</p>
                    <p className="mt-8 text-[11px] leading-5 text-[#929a93]">By continuing, you agree to our <a className="font-semibold text-[#586b5b] underline decoration-[#c8d1c5] underline-offset-2 hover:text-[#263c2d]" href="#terms">Terms of Service</a> and <a className="font-semibold text-[#586b5b] underline decoration-[#c8d1c5] underline-offset-2 hover:text-[#263c2d]" href="#privacy">Privacy Policy</a>.</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#e8ebe4] pt-5 text-[9px] font-bold tracking-[0.14em] text-[#969f96]"><span className="flex items-center gap-1.5"><HiOutlineBolt className="text-sm text-[#82976d]" /> FAST SETUP, NO CODE REQUIRED</span><span>© 2025 VOXAI</span></div>
            </section>
            </div>
        </main>
    )
}

export default Login
