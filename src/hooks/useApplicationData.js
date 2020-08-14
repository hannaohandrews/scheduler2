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
      .put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        const daysArray = [];
        for (let i of state.days) {
          daysArray.push(i);
          if (i.name === state.day) {
            daysArray[daysArray.indexOf(i)] = {
              ...i,
              spots: i.spots - 1,
            };
          }
        }
        // const daysArray = state.days.map(day => {
        //   if (day.name === state.day) {
        //     return {
        //       ...day,
        //       spots: day.spots - 1
        //     }
        //   }
        //   return { ...day }
        // })

        setState((prevState) => ({
          ...prevState,
          appointments,
          days: daysArray,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Cancelling Interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios
      .delete(`/api/appointments/${id}`)
      .then((res) => {
        const daysArray = [];
        for (let i of state.days) {
          daysArray.push(i);
          if (i.name === state.day) {
            daysArray[daysArray.indexOf(i)] = {
              ...i,
              spots: i.spots + 1,
            };
          }
        }

        return setState((prevState) => ({
          ...prevState,
          appointments,
          days: daysArray,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Editing Interview
  function editInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    console.log("useApp, interview", interview);
    console.log("appointments", appointments);

    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((res) => {
        return setState((prevState) => ({ ...prevState, appointments }));
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
    editInterview,
  };
}
