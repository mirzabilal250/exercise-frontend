import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(email, password)
  }

  return (
    <div className="d-flex justify-content-center">
      <form className="w-30 mt-5 background-light-color p-5 rounded-3" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
      <label className="form-label mt-3">Email address:</label>
      <input 
        className="form-control"
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label className="form-label mt-2">Password:</label>
      <input 
        className="form-control"
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <div className="d-flex justify-content-center mt-5">
      <button disabled={isLoading} className="btn btn-dark">Sign up</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default Signup