import React, { useState ,useEffect } from "react";
import { getInterview, getInterviewersForDay , getAppointmentsForDay } from "../helpers/selectors";
import axios from "axios";
import Appointment from 'components/Appointment';
import DayList from "components/DayList.js";
import useVisualMode from "hooks/useVisualMode";

import "components/Application.scss";

const days= [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

const appointmentsData = [
  {
    id: 1,
    time: "2pm",
    interview: {
      student: "Pam Beesley",
      interviewer: {
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Michael Scott",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "10am",
    interview: {
      student: "Dwight Schrute",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "7pm",
  },

];

const interviewers = []

export default function Application(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";


  // const appointments = appointmentsData.map(appointment => {
  //   return (
  //   <Appointment key={appointment.id} {...appointment} />
  //   );
  // });
 
  const [state, setState] = useState ( {
    day : 'Monday',
    days : [],
    appointments : {},
    interviewers:{}
  });

 
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state,state.day)

  const schedule = appointments.map((appointment) => {

    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
      />
    );
  });


  // const [day, setday] = useState('Monday')
  const setDay = day => setState(prev => ({ ...state, day }));
  const setDays = days => setState(prev => ({ ...prev, days }));
  const setInterviewers = interviewers => setState(prev => ({ ...prev, interviewers }));

  React.useEffect(() => {

    Promise.all([
     Promise.resolve(axios.get('/api/days')),
     Promise.resolve(axios.get('/api/appointments')),
     Promise.resolve(axios.get('/api/interviewers')),
    ])
    .then((all) => {
 
    setState(prev => ({days: all[0].data,appointments: all[1].data, interviewers: all[2].data}))
    })
  },[]) ;

  console.log('appointments',appointments)
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
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section>
      {schedule}
        <Appointment key="last" time="5pm" />
      </section>

    </main>
  );
}

