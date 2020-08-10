import { useEffect, useReducer } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW,
  UPDATE_SPOTS
} from "../reducer/application";


export default function useApplicationData(props) {

    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {},
    });
  
    const interviewers = getInterviewersForDay(state, state.day);
  
    const appointments = getAppointmentsForDay(state, state.day).map(
      (appointment) => {
        return (
          <Appointment
            key={appointment.id}
            {...appointment}
            interview={getInterview(state, appointment.interview)}
            interviewers={interviewers}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
          />
        );
      }
    );
  
    // const [day, setday] = useState('Monday')
    const setDay = (day) => setState((prev) => ({ ...state, day }));
    const setDays = (days) => setState((prev) => ({ ...prev, days }));
    
    const setInterviewers = (interviewers) =>
      setState((prev) => ({ ...prev, interviewers }));
  
    React.useEffect(() => {
      Promise.all([
        Promise.resolve(axios.get("/api/days")),
        Promise.resolve(axios.get("/api/appointments")),
        Promise.resolve(axios.get("/api/interviewers")),
      ]).then((all) => {
        setState((prev) => ({
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      });
    }, []);
  
    function bookInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview },
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
  
        axios
        .put(`http://localhost:8001/api/appointments/${id}`, { interview })
        .then((res) => {
          setState({ ...state, appointments });
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
      // })
    };
  
    function cancelInterview(id, interview) {
      const appointment = {
        ...state.appointments[id],
        interview: null,
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
  
       axios
        .delete(`http://localhost:8001/api/appointments/${id}`)
        .then((res) => {
          setState({ ...state, appointments });
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    };

        return {
            state, 
            setDay,
            bookInterview,
            cancelInterview
          };
        
    }
