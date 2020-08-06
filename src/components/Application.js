
import React, { useState } from "react";
import Appointment from 'components/Appointment';
import DayList from "components/DayList.js";

import "components/Application.scss";

const DAYS = [
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
  const [days, setdays] = useState(DAYS)
  const [day, setday] = useState('Monday')
  
  const appointments = appointmentsData.map(appointment => {
    return (
    <Appointment key={appointment.id} {...appointment} />
    );
  });

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
            days={days}
            day={day}
            setDay={day => setday(day)}
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

