import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  // State constants
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // Reset details; passed to cancel
  const reset = function () {
    setName("");
    setError("");
    setInterviewer(null);
  };

  // Action performed upon clicking 'Cancel' button
  const cancel = function () {
    reset();
    props.onCancel();
  };

  // Form Validation
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    console.log('onSave, Name,interviewer',name,interviewer)
   

    props.onSave(name, interviewer);

    if (!interviewer) {
      setError("Please select an interviewer");
      return;
    }
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <input
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={(event) => cancel()}>
            Cancel
          </Button>
          <Button confirm onClick={(event) => validate()}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}
