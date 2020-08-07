import React, { useState ,useEffect } from "react";
import {getAppointmentsForDay} from "../helpers/selectors";
import axios from "axios";
import Appointment from 'components/Appointment';
import DayList from "components/DayList.js";
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


export default function Application(props) {

  // const appointments = appointmentsData.map(appointment => {
  //   return (
  //   <Appointment key={appointment.id} {...appointment} />
  //   );
  // });
 
  const [state, setState] = useState ( {
    day : 'Monday',
    days : [],
    appointments : {}
  });

  const appointments = getAppointmentsForDay(state, state.day);

  const [day, setday] = useState('Monday')
  const setDay = day => setState(prev => ({ ...prev, day }));
  const setDays = days => setState(prev => ({ ...prev, days }));

  React.useEffect(() => {

    const promiseOne = axios.get("/api/days")
    const promiseTwo = axios.get("/api/appointments")

    Promise.all([promiseOne,promiseTwo]) 
    .then((all) => {
    setState(state => ({ ...state,days: all[0].data, appointments: all[1].data }));
    })
  })

  console.log(appointments)
  console.log(days)
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
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>

    </main>
  );
}

