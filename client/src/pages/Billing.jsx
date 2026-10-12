import axios from 'axios';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ServerUrl } from '../App';

function Billing({ user ,setUser}) {
  const navigate = useNavigate()

  useEffect(()=>{
    if(user && !user.isSetupComplete){
      toast.error(
        "Setup your assistant first"
      );


      navigate("/builder");


    }
  },[])


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


      const handlePay = async () => {
        try {
          const res = await axios.post(ServerUrl + "/api/billing/order" , {plan: "pro"} , {withCredentials:true})

          const order = res.data.order

          const options ={
            key:import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount:
          order.amount,

        currency:
          order.currency,

        name:
          "VoxAI",

        description:
          "Pro Plan",

        order_id:
          order.id,

          handler:async(response)=>{
            const verifyRes = await axios.post(ServerUrl + "/api/billing/verify" , response , {withCredentials:true})

            if(verifyRes.data.success){
              toast.success("Payment successfully")

              setUser(verifyRes.data.user)


            }
          },
          theme: {
          color: "#172b22",
        },
          }



          const razorpay = new window.Razorpay(options)

          razorpay.open()
        } catch (error) {
            toast.error("Payment Failed")

      console.log(error);
        }
      }

  return (
    <div className='min-h-screen bg-[#f2f3ed] px-4 py-8 text-[#17251f] sm:px-6 sm:py-10'>

      <div className='mx-auto max-w-5xl'>

        <div className='mb-8'>
          <p className='mb-2 text-[10px] font-bold tracking-[0.18em] text-[#78905f]'>ACCOUNT OVERVIEW</p>
          <h2 className='font-[Manrope,sans-serif] text-3xl font-semibold text-[#17251f] sm:text-4xl'>
            Billing & Subscription
          </h2>
          <p className='mt-2 text-sm text-[#778179]'>Manage your AI assistant plan and usage.</p>
        </div>

        <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3'>


          <div className='rounded-lg border border-[#e3e8df] bg-[#fbfbf7] p-5'>

            <p className='text-xs font-medium text-[#879188]'>Current plan</p>
            <h2 className='mt-2 text-lg font-bold capitalize text-[#24372b]'>{user?.plan}</h2>
          </div>


          <div className='rounded-lg border border-[#e3e8df] bg-[#fbfbf7] p-5'>

            <p className='text-xs font-medium text-[#879188]'>Gemini status</p>
            <h2 className={`text-xl font-bold mt-1 capitalize ${user?.geminiStatus === "active"
              ? "text-emerald-600"
              : user?.geminiStatus === "invalid"
                ? "text-red-500"
                : "text-amber-500"
              }`}>{user?.geminiStatus}</h2>
          </div>

          <div className='rounded-lg border border-[#e3e8df] bg-[#fbfbf7] p-5'>

            <p className='text-xs font-medium text-[#879188]'>{user?.plan === "free"
              ? "Messages Left"
              : "Plan Expiry"}</p>
            <h2 className='mt-2 text-lg font-bold capitalize text-[#24372b]'>{user?.plan === "free"
              ? remainingMessages
              : `${remainingDays} Days`}</h2>
          </div>
        </div>


        <div className='mt-8 grid grid-cols-1 gap-4 md:grid-cols-2'>

          {/* free */}

          <div className='rounded-lg border border-[#e3e8df] bg-[#fbfbf7] p-6 sm:p-7'>
            <p className='text-[10px] font-bold tracking-[0.16em] text-[#78905f]'>START HERE</p>
            <h2 className="mt-3 font-[Manrope,sans-serif] text-2xl font-semibold text-[#24372b]">
              Free Plan
            </h2>

            <h3 className="mt-4 font-[Manrope,sans-serif] text-4xl font-semibold text-[#17251f]">
              ₹0
            </h3>
            <p className='mt-1 text-xs text-[#879188]'>Forever free</p>

            <ul className="mt-6 space-y-3 border-t border-[#e7ebe4] pt-5 text-sm text-[#5f6d63]">

              <li>200 AI messages</li>
              <li>Voice assistant</li>
              <li>Navigation support</li>
              <li>Basic customization</li>

            </ul>

          </div>
{/* 
         Pro */}
          <div className='relative isolate overflow-hidden rounded-lg bg-[#14271f] p-6 text-white shadow-[0_22px_55px_-35px_rgba(20,39,31,0.75)] sm:p-7'>
            <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_92%_0%,rgba(200,243,106,0.2),transparent_40%)]' />
            <span className='inline-flex rounded-full border border-lime-300/25 bg-lime-300/10 px-3 py-1 text-[9px] font-bold tracking-[0.14em] text-lime-200'>MORE ROOM TO GROW</span>

            <h2 className="mt-3 font-[Manrope,sans-serif] text-2xl font-semibold text-white">
              Pro Plan
            </h2>

            <h3 className="mt-4 font-[Manrope,sans-serif] text-4xl font-semibold text-white">
              ₹699
            </h3>

            <p className='mt-1 text-xs text-white/55'>3 months access</p>

            <ul className='mt-6 space-y-3 border-t border-white/10 pt-5 text-sm text-white/75'>

              <li>Unlimited AI messages</li>
              <li>Advanced AI assistant</li>
              <li>Priority performance</li>
              <li>Unlimited navigation</li>
              <li>Premium support</li>
            </ul>


            <button
            onClick={handlePay}

               disabled={user?.plan === "pro"} className={`mt-7 h-12 w-full rounded-lg font-semibold transition ${user?.plan === "pro"
                 ? "cursor-default bg-[#d8e9c7] text-[#334c35]"
                 : "cursor-pointer bg-lime-300 text-[#17251f] hover:bg-lime-200"
                }`}>
                  {user?.plan === "pro" ? "Active Plan" : "Upgrade Now"}

                </button>




          </div>
        </div>


      </div>

    </div>
  )
}

export default Billing
