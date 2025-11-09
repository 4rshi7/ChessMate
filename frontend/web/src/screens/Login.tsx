
import kngihtLogo from "../assets/knight.png"
import SignInWithGoogle from "../components/SignInWithGoogle";
import Card from "../components/Card"


export default function Login(){

  return(
    <div className=" flex justify-center items-center min-h-screen bg-gray-100">
    <Card>
        <div className="flex items-center justify-center"><img src={kngihtLogo} alt=" knight logo " className="w-16 h-16 "></img></div>
        <div className="flex justify-center flex-col items-center ">
          <h1 className="text-3xl font-bold mt-4">ChessMate</h1>
          <h2 className="text-xl mt-2 text-gray-600">Welcome to ChessMate</h2>
          <p className="text-base mt-2 text-gray-500">Play, learn, and grow as a chess player.</p>

        </div>
        <div className="flex justify-center items-center my-4 ">
          <SignInWithGoogle />
          </div>
        <div className="max-w-96 text-center mt-4">
  <p className="text-sm text-gray-400 whitespace-normal">
    By signing in, you agree to our Terms of Service and Privacy Policy
  </p>
</div>
    </Card>
    </div>
  )
}