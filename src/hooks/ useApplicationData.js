import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {

  // create state object that contain all values
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

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

// bookingInterview 
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then((res) => {
        setState({ ...state, appointments });
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
    // })
  }

  // Cancelling Interview 
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`,{ appointment})
      .then((res) => {
        setState({ ...state, appointments });
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
