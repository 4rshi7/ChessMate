import googleLogo from '../assets/google.png'
import { useAuthStore } from '../store/authStore';
export default function SignInWithGoogle(){
const login = useAuthStore((state)=>state.login);
  function handleClick(){
    login();
  }
  
  return(
    <button onClick={handleClick} className="bg-white text-gray-700 font-semibold py-1 px-18 border border-gray-300 rounded-xl  flex items-center hover:border-gray-400  hover:shadow-lg transition mt-4">
      <div className='flex items-center content-around'>
      <img src={googleLogo} alt="Google Logo" className="w-12 h-12 "/>
      <div>Sign in with Google</div>
      </div>
    </button>
  )
}