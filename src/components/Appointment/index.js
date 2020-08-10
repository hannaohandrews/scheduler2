import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE"
const SAVING = "SAVING"
const CONFIRM = "CONFIRM"
const EDIT = "EDIT"
const DELETING = "DELETING"

export default function Appointment(props) {
 
const {mode, transition, back} = useVisualMode (
    props.interview? SHOW:EMPTY
  );

  const onAdd = () => {
    transition(CREATE)
  };

  const onDelete =() => {
    transition(CONFIRM)
  };

  const edit =() => {
    transition(EDIT)
  };

 const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
  
    props
      .bookInterview(props.id, interview)
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
          onDelete={onDelete}
          onEdit={edit}
        />
      )}

       {mode === CREATE && (
        <Form
        interviewers={props.interviewers} 
        //onCancel={back} 
        onCancel={(event) => back()}
        onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="You will lose your interview, are you sure?"
          onCancel={(event) => back()}
          //onConfirm={cancel} 
        />
      )}

      {mode === DELETING && (
        <Status message="Deleting"/>
        )}
        
        {mode === SAVING && (
        <Status message="Saving"/>
      )}

      {mode === EDIT && (
        <Form 
        student={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers} 
        name={props.interview.student}
        onCancel={back} 
        onSave={save}
        
        />
      )}
      
    </article>
  );
}
