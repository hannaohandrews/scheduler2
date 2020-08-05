import React, {useState} from "react";
import Button from "components/Button"
import InterviewerList from "components/InterviewerList.js"

import "components/Appointment/styles.scss"
import "components/Button.scss"

export default function Form(props) {

const [name, setName] = useState(props.name || "");
const [interviewer, setInterviewer] = useState(props.interviewer || null);

 // Reset details; passed to cancel
const reset = () => {
    setName("");
    setInterviewer(null);
}

// cancel when cancel button is clicked

const cancel = ()=> {
    reset();
    props.onCancel();
}

    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off">
                    <input
                        className="appointment__create-input text--semi-bold"
                        name={name}
                        type="text"
                        placeholder="Enter Student Name"
                    /*
                      This must be a controlled component
                    */
                    />
                </form>

                <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />

        </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger>Cancel</Button>
                    <Button confirm>Save</Button>
                </section>
            </section>
        </main>
    );
}