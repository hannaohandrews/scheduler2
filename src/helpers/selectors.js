import React from 'react';

export function getAppointmentsForDay(state, day) {

    const currentDay = state.days.find((d)=> d.name === day)
   
    if (!currentDay) {
       return []
    }
    const appointments = currentDay.appointments.map((id)=> state.appointments[id] )
    return appointments;

    

    };

