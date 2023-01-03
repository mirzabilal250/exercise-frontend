import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { format } from 'date-fns'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Link, useNavigate } from 'react-router-dom'
import "../index.css"

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const navigate = useNavigate();
  const dateFormatted = format(new Date(workout.date), 'eee, dd MMM yyy');

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json })
    }
  }

  const handleNevigate = () => {
    navigate(`/details/${workout._id}`)
  }

  return (

        <div className='col-4'>
        
          <div className="background-light-color rounded-3 p-3 mb-3 d-flex justify-content-between workout-hover">
            <div>
              <h4 className='fw-bold text-capitalize cursor-pointer' onClick={handleNevigate}>{workout.name}</h4>
              <p className='mb-1'><strong>{workout.activity}</strong></p>
              {/* <p className='mb-1'><strong>Duration in (min): </strong>{workout.duration}</p> */}
              {/* <p className='mb-1'><strong>Description: </strong>{workout.description}</p> */}
              <p className='mb-1'>{dateFormatted}</p>

            </div>
            <div className='d-flex flex-column justify-content-between align-items-end'>

              <div>
                <Link className="material-symbols-outlined text-decoration-none text-black" onClick={handleClick}>delete</Link>
                <Link className="material-symbols-outlined text-decoration-none text-black" to={`/edit/${workout._id}`}>update</Link>
              </div>

              <div>
                <p className='mb-1'>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
              </div>

            </div>
          </div>
        </div>

  )
}

export default WorkoutDetails