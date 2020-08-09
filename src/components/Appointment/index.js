import React from "react";
import Header from "components/Appointment/Header.js";
import Empty from "components/Appointment/Empty.js";
import Show from "components/Appointment/Show.js";
import Form from "components/Appointment/Form.js";
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
//const CONFIRM = "CONFIRM"
const EDIT = "EDIT"
const DELETE = "DELETE"

export default function Appointment(props) {
 
const {mode, transition, back} = useVisualMode (
    props.interview? SHOW:EMPTY
  );

  const onAdd = () => {
    transition(CREATE)
  };

  function onDelete() {
    transition(CONFIRM)
  };

  function edit() {
    transition(EDIT)
  };

 const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
  
    props
      .bookInterview(props.id, props.interview)
      .then(() => {
        transition(SHOW)
      })
      .catch(error=> console.log(error))
  };

  return (

    <article className="appointment">

      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={onAdd} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

       {mode === CREATE && (
        <Form
        interviewers={props.interviewers} 
        onCancel={back} 
        onSave={save}
        />
      )}
      {mode === DELETING && (
        <Status message="Deleting"/>
        )}
      {mode === EDIT && (
        <Form 
        
        
        />
      )}
      
    </article>
  );
}
