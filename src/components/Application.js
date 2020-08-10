import React, { useState, useEffect } from "react";
import axios from "axios";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';
import "components/Application.scss";
// import useApplicationData from '../../hooks/useApplicationData'
// import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {

  // const {
  //   state,
  //   setDay,
  //   bookInterview,
  //   cancelInterview,
  // } = useApplicationData();

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

  // let appointments = getAppointmentsForDay(state, state.day);
  let interviewers = getInterviewersForDay(state, state.day);

  const schedule = getAppointmentsForDay(state, state.day).map((appointment) => {
    return (
      <Appointment 
      key={appointment.id}
      {...appointment} 
      interview={getInterview(state, appointment.interview)} 
      interviewers={interviewers} 
      bookInterview={bookInterview} 
      cancelInterview={cancelInterview} 
      />
    )
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <section className="schedule">
          {schedule}
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
}
