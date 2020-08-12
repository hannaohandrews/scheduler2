import React from "react";
import InterviewerListItem from "components/InterviewerListItem.js";
import PropTypes from "prop-types";
import "components/InterviewerListItem.scss";

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default function InterviewerList(props) {

  // console.log('props',props);
  
  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        id={interviewer.id}
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={props.value === interviewer.id}
        onChange={props.onChange}
        setInterviewer={() => props.onChange(interviewer.id)}>
        </InterviewerListItem>
    );
  });

  return (
    <section className="">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewers}</ul>
    </section>
  );
}
