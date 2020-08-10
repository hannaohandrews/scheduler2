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
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const DELETING = "DELETING";
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const onAdd = () => {
    transition(CREATE);
  };

  const onDelete = () => {
    transition(CONFIRM);
  };

  const edit = () => {
    transition(EDIT);
  };

  const cancel = () => {
    transition(DELETING);
    transition(EMPTY);
  };

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    console.log(props.id);
    console.log(interview);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  };

  const remove = () => {
    transition(CONFIRM);
  };

  function confirm(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(DELETING);

    props
      .cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }

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
          onCancel={back}
          onCancel={(event) => back()}
          onSave={save}
        />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="You will lose your interview, are you sure?"
          onCancel={(event) => back()}
          onConfirm={confirm}
        />
      )}

      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === SAVING && <Status message={"Saving"} />}

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
