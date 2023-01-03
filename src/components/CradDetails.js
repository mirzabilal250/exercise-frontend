import { useState, useEffect } from "react"
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate, useParams } from "react-router-dom"
import { format } from "date-fns";

function CradDetails() {

    const { user } = useAuthContext();
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [activity, setActivity] = useState('');
    const [duration, setDuration] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    //   const [error, setError] = useState(null);
    // const [emptyFields, setEmptyFields] = useState([])

    useEffect(() => {

        const fetchWorkouts = async () => {
            const response = await fetch(`/api/workouts/${id}`, {
                headers: { 'Authorization': `Bearer ${user.token}` },
            })
            const json = await response.json();
            setName(json.name);
            setActivity(json.activity);
            setDate(format(new Date(json.date), 'eee, dd MMM yyy'));
            console.log(json.date);

            setDescription(json.description);
            setDuration(json.duration);
            // if (response.ok) {
            //   dispatch({type: 'SET_WORKOUTS', payload: json})
            // }

        }

        if (user) {
            fetchWorkouts()
        }

    }, [user, id]);

    return (
        <div className="container">
            <div className="d-flex align-items-center justify-content-between background-light-color p-4 rounded-top mt-5">
                <div>
                    <div className="fw-bold fs-1">
                        {name}
                    </div>
                    <div className="fs-4">Duration in (min): 
                        {duration}
                    </div>
                </div>
                <div className="d-flex flex-column align-items-end">
                    <div className="fs-4">
                        {activity}
                    </div>
                    <div className="fs-4">
                        {date}
                    </div>

                </div>
            </div>
            <div className="background-dark-color text-white px-4 rounded-bottom py-2">
                {description}
            </div>

        </div>
    )
}

export default CradDetails
