import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Error from "./Error";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

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

  const onEdit = () => {
    transition(EDIT);
  };

  const cancel = () => {
    transition(DELETING);
    transition(EMPTY);
  };

  // bookInterview and edit
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);

    if (mode === EDIT) {
      props
        .editInterview(props.id, interview)
        .then(() => {
          transition(SHOW);
        })
        .catch((error) => transition(ERROR_SAVE, true));
    } else {
      // make a put request, when it completes transition to SHOW mode
      props
        .bookInterview(props.id, interview)
        .then(() => {
          transition(SHOW);
        })
        .catch((error) => transition(ERROR_SAVE, true));
    }
  };

  //Deletes interview when clicked

  function deletingInterview(id) {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={onAdd} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={(e) => transition(CONFIRM)}
          onEdit={(e) => transition(EDIT)}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={(event) => back()}
          onSave={save}
          bookInterview={props.bookInterview}
          id={props.id}
          interview={props.interview}
          onEdit={(e) => transition(EDIT)}
        />
      )}

      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you would like to delete?"}
          onCancel={(event) => back()}
          onConfirm={(event) => deletingInterview(props.id)}
        />
      )}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          name={props.interview.student}
          onCancel={(event) => back()}
          onSave={save}
          id={props.id}
        />
      )}

      {mode === DELETING && <Status message={"Deleting"} />}

      {mode === SAVING && <Status message={"Saving"} />}

      {mode === ERROR_DELETE && (
        <Error message="Error Deleting Appointment" onClose={() => back()} />
      )}

      {mode === ERROR_SAVE && (
        <Error message="Error Saving Appointment" onClose={() => back()} />
      )}
    </article>
  );
}
