import axios from 'axios';
import React, { useState } from 'react'
import { FiCopy, FiPlus, FiTrash2 } from 'react-icons/fi';
import { CLIENT_URL, ServerUrl } from '../App';
import toast from 'react-hot-toast';

const THEMES = [
  { id: "light", name: "Daylight", description: "Warm and welcoming", swatch: "bg-[#f7f8f1]", accent: "bg-[#8eaa78]", detail: "bg-[#dce8cd]" },
  { id: "dark", name: "Grove", description: "Calm evergreen", swatch: "bg-[#14271f]", accent: "bg-lime-300", detail: "bg-[#6e9657]" },
  { id: "glass", name: "Glass", description: "Soft translucent", swatch: "bg-[#28443b]", accent: "bg-[#a8e1e5]", detail: "bg-[#9dbd9a]" },
  { id: "neon", name: "Signal", description: "Bright and bold", swatch: "bg-[#101b18]", accent: "bg-[#ff8068]", detail: "bg-lime-300" },
];

const TONES = [
  "friendly",
  "professional",
  "sales",
];

function Builder({user , setUser}) {

  const [editAssistant , setEditAssistant] = useState(!user?.isSetupComplete)

  const [assistantName , setAssistantName] = useState(user?.assistantName || "");

  const [businessName , setBusinessName] = useState(user?.businessName || "")
  
  const [businessType , setBusinessType] = useState(user?.businessType || "")

  const [businessDescription , setBusinessDescription] = useState(user?.businessDescription || "")

  const [theme,setTheme] = useState(user?.theme || "dark")
  const [tone,setTone] = useState(user?.tone || "friendly")

  const [geminiApiKey , setGeminiApiKey] = useState(user?.geminiApiKey || "")

  const [pages, setPages] = useState(user?.pages || []);

  const [pageName, setPageName] = useState("");

  const [pagePath, setPagePath] = useState("");

  const [pageKeywords, setPageKeywords] = useState("");

  const [loading,setLoading]= useState(false)

  const addPage = ()=>{
    if(!pageName || !pagePath) return;

    const newPage = {
      name:pageName,
      path:pagePath,
      keywords:pageKeywords.split(",").map((k) => k.trim()) 
      
    
    }

    setPages([...pages,newPage])

    setPageName("")
    setPagePath("")
    setPageKeywords("")
    
  }

  const removePage = (index) =>{
    const updatePages = pages.filter((_,i)=>i !== index)

    setPages(updatePages)
  }


  const saveAssistant = async () => {
    setLoading(true)
    try {
      const data={
        assistantName,
        businessName,
        businessType,
        businessDescription,
        tone,
        theme,
        geminiApiKey,
        pages,
      }

      const res = await axios.post(ServerUrl + "/api/user/save-assistant" , data , {withCredentials:true})
      console.log(res.data)
      setUser(res.data.user)
      setEditAssistant(false)
      toast.success("Assistant Saved Successfully")
      setLoading(false)
    } catch (error) {
      toast.error("Failed to save assistant")
      console.log(error)
      setLoading(false)
    }
    
  }

    const remainingMessages =
    Math.max(
      0,
      (user?.requestLimit || 0) -
      (user?.totalMessages || 0)
    );

    const remainingDays =
    user?.proExpiresAt
      ? Math.max(
        0,
        Math.ceil(
          (
            new Date(
              user.proExpiresAt
            ) - new Date()
          ) /
          (1000 * 60 * 60 * 24)
        )
      )
      : 0;



     const embedCode = `<script src="${CLIENT_URL}/assistant.js" data-user-id="${user?._id}"></script>`;

  return (
    <div className='min-h-screen bg-[#f2f3ed] px-4 py-8 text-[#17251f] sm:px-6 sm:py-10'>
      <div className='mx-auto max-w-5xl'>
        <div className='mb-8 sm:mb-10'>
          <p className='mb-2 text-[10px] font-bold tracking-[0.18em] text-[#78905f]'>YOUR VOICE, YOUR BRAND</p>
          <h2 className='font-[Manrope,sans-serif] text-3xl font-semibold text-[#17251f] sm:text-4xl'>
            Assistant Builder
          </h2>
          <p className='mt-2 text-sm text-[#778179]'> Customize your virtual
            assistant</p>
        </div>

        {user.isSetupComplete && !editAssistant &&(
          <div className='mb-6 rounded-lg border border-[#e3e8df] bg-[#fbfbf7] p-5 shadow-[0_16px_45px_-36px_rgba(20,39,31,0.5)] sm:p-7'>

           <p className="text-[10px] font-bold tracking-[0.16em] text-[#78905f]">
                Assistant
              </p>

              <h2 className="mt-2 font-[Manrope,sans-serif] text-3xl font-semibold text-[#17251f]">
                {user.assistantName}
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#778179]">
                Your assistant is ready
                to use on your website.
              </p>

              <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3'>


                <div className='rounded-lg border border-[#e5e9e1] bg-[#f5f7f1] p-4'>
                  
                  <p className='text-xs font-medium text-[#879188]'>Current plan</p>
                  <h2 className='mt-2 text-lg font-bold capitalize text-[#24372b]'>{user?.plan}</h2>
                </div>


                <div className='rounded-lg border border-[#e5e9e1] bg-[#f5f7f1] p-4'>
                  
                  <p className='text-xs font-medium text-[#879188]'>Gemini status</p>
                  <h2 className={`text-xl font-bold mt-1 capitalize ${user?.geminiStatus === "active"
                      ? "text-emerald-600"
                      : user?.geminiStatus === "invalid"
                        ? "text-red-500"
                        : "text-amber-500"
                    }`}>{user?.geminiStatus}</h2>
                </div>

                <div className='rounded-lg border border-[#e5e9e1] bg-[#f5f7f1] p-4'>
                  
                  <p className='text-xs font-medium text-[#879188]'>{user?.plan === "free"
                      ? "Messages Left"
                      : "Plan Expiry"}</p>
                  <h2 className='mt-2 text-lg font-bold capitalize text-[#24372b]'>{user?.plan === "free"
                      ? remainingMessages
                      : `${remainingDays} Days`}</h2>
                </div>
              </div>

              <div className='mt-7'>

                <div className='mt-4 rounded-lg border border-[#dce5d5] bg-[#f1f5eb] p-4'>
                  <p className='text-sm font-semibold text-[#40573d]'>
                    Where to paste this script?
                  </p>
                  <p className='mt-2 text-sm leading-6 text-[#657761]'>
                    Paste this script before the closing
                    {" "}
                    <span className="font-semibold">
                      {"</body>"}
                    </span>
                    {" "}
                    tag of your website HTML file.
                    <br />
                    <br />
                    Example:
                  </p>

                  <pre className='mt-3 overflow-x-auto rounded-lg bg-[#14271f] p-4 font-mono text-xs leading-6 text-lime-300'>
                     {`<body>

  Your Website Content

  <script src="${CLIENT_URL}/assistant.js" data-user-id="${user?._id}"></script>

</body>`}
                  </pre>
                </div>

                <p className='mb-3 mt-4 text-xs font-bold tracking-[0.08em] text-[#405144]'>EMBED CODE</p>
              </div>

              <div className='relative'>
               <textarea readOnly value={embedCode} className='h-20 w-full resize-none rounded-lg border border-[#263e31] bg-[#14271f] p-4 font-mono text-xs text-lime-300 outline-none'/>
                <button aria-label='Copy embed code' title='Copy embed code' onClick={()=>{
                  navigator.clipboard.writeText(embedCode);
                  toast.success("Copied")
                }} className='absolute right-3 top-3 grid size-9 place-items-center rounded-lg bg-white text-[#344b39] transition hover:bg-lime-100'><FiCopy/></button>
              </div>


              <button onClick={()=>setEditAssistant(true)} className='mt-6 h-11 rounded-lg bg-[#172b22] px-5 text-sm font-semibold text-white transition hover:bg-[#294537]'>Edit assistant</button>


          </div>

          
        )}

        {editAssistant && <div className='space-y-4 sm:space-y-5'>

          <div className='rounded-lg border border-[#e3e8df] bg-[#fbfbf7] p-5 shadow-[0_12px_40px_-36px_rgba(20,39,31,0.5)] sm:p-6'>
            <h2 className='mb-5 font-[Manrope,sans-serif] text-lg font-semibold text-[#24372b]'>Basic information</h2>

            <div className='space-y-4'>
              <input type="text" 
              onChange={(e)=>setAssistantName(e.target.value)}
              value={assistantName}
              placeholder="Assistant Name"
              className="w-full rounded-lg border border-[#dce3d9] bg-[#fdfdfa] px-4 py-3 text-sm text-[#24372b] outline-none transition placeholder:text-[#9aa39a] focus:border-[#91a982] focus:ring-4 focus:ring-[#eaf0e3]" />

              <input type="text" 
              onChange={(e)=>setBusinessName(e.target.value)}
              value={businessName}
              placeholder="Business Name"
              className="w-full rounded-lg border border-[#dce3d9] bg-[#fdfdfa] px-4 py-3 text-sm text-[#24372b] outline-none transition placeholder:text-[#9aa39a] focus:border-[#91a982] focus:ring-4 focus:ring-[#eaf0e3]" />

              <input type="text" 
              onChange={(e)=>setBusinessType(e.target.value)}
              value={businessType}
              placeholder="Business Type"
              className="w-full rounded-lg border border-[#dce3d9] bg-[#fdfdfa] px-4 py-3 text-sm text-[#24372b] outline-none transition placeholder:text-[#9aa39a] focus:border-[#91a982] focus:ring-4 focus:ring-[#eaf0e3]" />

              <textarea type="text" 
              rows={4}
              onChange={(e)=>setBusinessDescription(e.target.value)}
              value={businessDescription}
              placeholder="Business Description"
              className="w-full resize-none rounded-lg border border-[#dce3d9] bg-[#fdfdfa] px-4 py-3 text-sm text-[#24372b] outline-none transition placeholder:text-[#9aa39a] focus:border-[#91a982] focus:ring-4 focus:ring-[#eaf0e3]" />


            </div>
          </div>

          <div className='rounded-lg border border-[#e3e8df] bg-[#fbfbf7] p-5 shadow-[0_12px_40px_-36px_rgba(20,39,31,0.5)] sm:p-6'>
            <h2 className='mb-2 font-[Manrope,sans-serif] text-lg font-semibold text-[#24372b]'>
              Appearance
            </h2>
            <p className='mb-5 text-xs text-[#879188]'>Choose the look and personality of your voice agent.</p>

            <div>
              <label  className='mb-3 block text-xs font-semibold text-[#657268]'>Theme</label>

              <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4'>
                {THEMES.map((item)=>(
                  <button key={item.id}
                  onClick={()=>setTheme(item.id)}
                  aria-pressed={theme === item.id}
                   className={`flex min-h-[88px] items-center gap-3 rounded-lg border p-3 text-left transition ${theme === item.id
                        ? "border-[#8ba477] bg-[#f1f5eb] ring-2 ring-[#e5eddd]"
                        : "border-[#e3e8df] bg-[#fdfdfa] hover:border-[#bdcdb2]"
                        }`}>
                    <span className={`relative grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg border border-black/10 ${item.swatch}`}>
                      <i className={`absolute left-2 top-2 size-3 rounded-full ${item.accent}`} />
                      <i className={`absolute bottom-2 right-2 size-3 rounded-full ${item.detail}`} />
                    </span>
                    <span className='min-w-0'><span className='block text-sm font-semibold text-[#304337]'>{item.name}</span><span className='mt-1 block text-[11px] text-[#879188]'>{item.description}</span></span>
                  </button>
                ))}
              </div>
            </div>


            <div className='mt-6'>
              <label  className='mb-3 block text-xs font-semibold text-[#657268]'>Assistant tone</label>

              <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
                {TONES.map((item)=>(
                  <button key={item}
                  onClick={()=>setTone(item)}
                      className={`rounded-lg border px-4 py-3 text-sm font-medium capitalize transition ${tone === item
                        ? "border-[#8ba477] bg-[#f1f5eb] text-[#40573d]"
                        : "border-[#e3e8df] bg-[#fdfdfa] text-[#657268] hover:border-[#bdcdb2]"
                        }`}>{item}
                  </button>
                ))}
              </div>
            </div>

          </div>


          <div className='rounded-lg border border-[#e3e8df] bg-[#fbfbf7] p-5 shadow-[0_12px_40px_-36px_rgba(20,39,31,0.5)] sm:p-6'>
            <div className='flex items-center justify-between mb-5 gap-4 flex-wrap'>
              <div>
                <h2 className='font-[Manrope,sans-serif] text-lg font-semibold text-[#24372b]'>
                  Gemini API KEY
                </h2>
                <p className='mt-1 text-xs text-[#879188]'>
                  Add your Gemini API key to power your assistant
                </p>
              </div>

              <a href="https://aistudio.google.com/app/apikey"
              target='_blank'
              rel='noopener noreferrer'
              className='cursor-pointer rounded-lg bg-[#172b22] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#294537]'>
                Get API KEY
              </a>
            </div>

            <input type="password" 
            placeholder="AIza..."
            onChange={(e)=>setGeminiApiKey(e.target.value)}
            value={geminiApiKey}
            className="w-full rounded-lg border border-[#dce3d9] bg-[#fdfdfa] px-4 py-3 text-sm text-[#24372b] outline-none transition placeholder:text-[#9aa39a] focus:border-[#91a982] focus:ring-4 focus:ring-[#eaf0e3]" />

            <p className='mt-3 text-xs leading-6 text-[#879188]'>
               Your API key is securely stored and only used for generating AI responses.
            </p>
          </div>

          <div className='rounded-lg border border-[#e3e8df] bg-[#fbfbf7] p-5 shadow-[0_12px_40px_-36px_rgba(20,39,31,0.5)] sm:p-6'>
            <div className='flex items-center justify-between mb-5 flex-wrap'>
              <div>
                <h2 className='font-[Manrope,sans-serif] text-lg font-semibold text-[#24372b]'>Navigation pages</h2>
                <p className='mt-1 text-xs text-[#879188]'>
                  Assistant can redirect users
                </p>
              </div>

              <button onClick={addPage} className='flex items-center gap-2 rounded-lg bg-[#172b22] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#294537]'>
                <FiPlus/>Add
              </button>
            </div>

            <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
              <input type="text" placeholder='Page Name' className='rounded-lg border border-[#dce3d9] bg-[#fdfdfa] px-4 py-3 text-sm text-[#24372b] outline-none transition placeholder:text-[#9aa39a] focus:border-[#91a982] focus:ring-4 focus:ring-[#eaf0e3]'
              onChange={(e)=>setPageName(e.target.value)}
              value={[pageName]}/>

              <input type="text" placeholder='/pricing' className='rounded-lg border border-[#dce3d9] bg-[#fdfdfa] px-4 py-3 text-sm text-[#24372b] outline-none transition placeholder:text-[#9aa39a] focus:border-[#91a982] focus:ring-4 focus:ring-[#eaf0e3]'
              onChange={(e)=>setPagePath(e.target.value)}
              value={[pagePath]}/>

              <input type="text" placeholder='Pricing  Plan' className='rounded-lg border border-[#dce3d9] bg-[#fdfdfa] px-4 py-3 text-sm text-[#24372b] outline-none transition placeholder:text-[#9aa39a] focus:border-[#91a982] focus:ring-4 focus:ring-[#eaf0e3]'
              onChange={(e)=>setPageKeywords(e.target.value)}
              value={[pageKeywords]}/>
            </div>

            <div className='mt-5 space-y-3'>
              {
                pages.map((page,index)=>(
                  <div key={index}
                  className='flex items-center justify-between rounded-lg border border-[#e3e8df] bg-[#fdfdfa] p-4'>

                    <div>
                      <p className='text-sm font-semibold text-[#304337]'>{page.name}</p>
                      <p className='mt-1 text-xs text-[#879188]'>{page.path}</p>
                  
                    </div>
                    <button onClick={()=>removePage(index)} aria-label={`Remove ${page.name}`} title='Remove page' className='grid size-9 place-items-center rounded-lg text-[#a65347] transition hover:bg-[#fff0ec]'>
                      <FiTrash2/>

                    </button>
                  </div>
                ))
              }
            </div>
          </div>

          <button onClick={saveAssistant} 
           disabled={loading ||
             !assistantName ||
        !businessName  ||
        !businessType ||
        !businessDescription ||
        !geminiApiKey} className='h-12 w-full rounded-lg bg-[#172b22] text-sm font-semibold text-white shadow-[0_10px_24px_-16px_rgba(23,43,34,0.7)] transition hover:bg-[#294537] disabled:cursor-not-allowed disabled:opacity-50'>
            {
              loading ? "Saving..." : user.isSetupComplete ? "Update Assistant" : "Save Assistant"
            }
          </button>

        </div>}

      </div>
      
    </div>
  )
}

export default Builder
