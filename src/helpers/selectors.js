import React from "react";

//Appointments for the day
export function getAppointmentsForDay(state, day) {
  const currentDay = state.days.find((d) => d.name === day);

  if (!currentDay) {
    return [];
  }
  const appointments = currentDay.appointments.map(
    (id) => state.appointments[id]
  );
  return appointments;
}

// An Interview
export function getInterview(state, interview) {
  if (!interview || interview === null) {
    return null;
  }
  const interviewObj = {
    student: interview.student,
  };

  //  console.log('interviewOb',interviewObj)

  interviewObj.interviewer = state.interviewers[interview.interviewer];

  //  console.log('interviewOb2', interviewObj.interviewer)
  //  console.log('interviewOb3', interview.interviewer)
  //  console.log('interviewOb4',state.interviewers[interview.interviewer])
  //  console.log('interviewOb5',interviewObj)

  return interviewObj;
}

// Gets the interviewers for a given day
export function getInterviewersForDay(state, day) {
   const currentDay = state.days.find((d) => d.name === day);
   
   console.log('1',currentDay)

   if (!currentDay) {
     return [];
   }
   const intPeople = currentDay.interviewers.map(
     (id) => state.appointments[id]
   );

   console.log('int',intPeople)

   return intPeople;
 }
