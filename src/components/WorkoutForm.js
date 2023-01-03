import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom"


const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [activity, setActivity] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const workout = {name, activity, duration, date, description}

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      // setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setName('')
      setActivity('')
      setDuration('')
      setDate('')
      setDescription('')
      setError(null)
      setEmptyFields([])
      dispatch({type: 'CREATE_WORKOUT', payload: json});
      navigate("/");
    }

  }

  return (
    <div className="w-50">
    <form onSubmit={handleSubmit} className="mt-5 background-light-color p-5 rounded-3">
      <h3>Add a New Exercise Activity</h3>

      <label className="form-label mt-3">Exercise Name:</label>
      <input 
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className= "form-control"
        required
      />

      <label className="form-label mt-2">Activity type</label>
      <select class="form-select" aria-label="Default select example" onChange={(e) => setActivity(e.target.value)} value={activity}>
        <option selected>Open this select menu</option>
        <option value="Run">Run</option>
        <option value="Bicycle Ride">Bicycle Ride</option>
        <option value="Swim">Swim</option>
        <option value="Walk">Walk</option>
        <option value="Hike">Hike</option>
      </select>

      <label className="form-label mt-2">Time Duration in minutes</label>
      <input 
        type="number"
        onChange={(e) => setDuration(e.target.value)}
        value={duration}
        className= "form-control"
      />

      <label className="form-label mt-2">Date</label>
      <input 
        type="date"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        className= "form-control"
      />

      <label className="form-label mt-2">Description</label>
      <textarea 
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className= "form-control"
      />

      <div className="d-flex justify-content-center mt-5">
        <button className="btn btn-dark">Add Activity</button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  )
}

export default WorkoutForm