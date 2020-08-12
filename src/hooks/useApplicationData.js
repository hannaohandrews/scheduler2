import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  // create state object that contain all values
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // const [day, setday] = useState('Monday')
  const setDay = (day) => setState((prev) => ({ ...state, day }));
  // const setDays = (days) => setState((prev) => ({ ...prev, days }));

  const setInterviewers = (interviewers) =>
    setState((prev) => ({ ...prev, interviewers }));

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
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        const daysArray = [];
        for (let i of state.days){
          daysArray.push(i)
          if(i.name === state.day) {
            daysArray[daysArray.indexOf(i)].spots -= 1;
          }
        }
        setState({ ...state, days : daysArray });
        return setState({...state, appointments});
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

    return axios.delete(`/api/appointments/${id}`, {appointment} )
    .then((res) => {
     
      const daysArray = [];
      for (let i of state.days) {
        daysArray.push(i);
        if (i.name === state.day) {
          daysArray[daysArray.indexOf(i)].spots += 1;
        }
      }
      console.log('daysArray',daysArray)
      setState({...state, days: daysArray});
      return setState({...state, appointments: appointments});
    })
  };


  React.useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")),
      Promise.resolve(axios.get("/api/interviewers")),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);
  
  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
