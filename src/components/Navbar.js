import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header className='background-dark-color text-white'>
      <div className="container d-flex justify-content-between align-items-center py-3">
        <div>
        <Link className='text-decoration-none text-dark' to="/">
          <h3 className='fw-bold text-white'>Exercise Tracking App</h3>
        </Link>
        </div>

        <div>
        <nav>
          {user && (
            <div>
              <span>{user.email}</span>
              <button className='btn btn-dark btn-sm ms-2 ' onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login" className='btn btn-outline-dark me-3'>Login</Link>
              <Link to="/signup" className='btn btn-outline-dark'>Signup</Link>
            </div>
          )}
        </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar