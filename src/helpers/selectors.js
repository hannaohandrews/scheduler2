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

// Get interview of the day
export function getInterview(state, interview) {
  if (!interview || interview === null) {
    return null;
  }
  const interviewObj = {
    student: interview.student,
  };

  interviewObj.interviewer = state.interviewers[interview.interviewer];
  return interviewObj;
}

// Gets the interviewers for a given day
export function getInterviewersForDay(state, day) {
  const currentDay = state.days.find((d) => d.name === day);

  if (!currentDay) {
    return [];
  }

  const interviewers = currentDay.interviewers.map(
    (id) => state.interviewers[id]
  );

  return interviewers;
}
