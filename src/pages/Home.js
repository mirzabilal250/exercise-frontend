import { useEffect } from 'react'
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WorkoutDetails from '../components/WorkoutDetails'
import { Link, useNavigate } from 'react-router-dom'
// import WorkoutForm from '../components/WorkoutForm'

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  // const [workoutState, setworkoutState] = useState([])
  const { user } = useAuthContext()
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json })
        // setworkoutState(json);
      }
    }

    if (user) {
      fetchWorkouts()
    }
  }, [dispatch, user])

  const activityBtnHandler = () => {
    navigate("/activity")
  }

  const searchHandle = async (e) => {
    const key = e.target.value;
    if (key) {
      const response = await fetch(`/api/workouts/search/${key}`, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      })
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      }
    }
    else {

      const fetchWorkouts = async () => {
        const response = await fetch('/api/workouts', {
          headers: { 'Authorization': `Bearer ${user.token}` },
        })
        const json = await response.json()

        if (response.ok) {
          dispatch({ type: 'SET_WORKOUTS', payload: json })
          // setworkoutState(json);
        }
      }

      if (user) {
        fetchWorkouts()
      }

    }
  }

  return (
    <>
      <div className='container py-3'>
        <div className='d-flex justify-content-between'>
          <div>
            <input className='form-control-sm rounded-2' type="text" placeholder='Search' onChange={searchHandle} />
          </div>

          <div>
            <button onClick={activityBtnHandler} className='btn btn-outline-dark'>Add New Activity</button>
          </div>
        </div>
      </div>

      <div className="home">
        <div className="workouts">
          <div className='container'>
            <div className='row'>
              {workouts && workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home