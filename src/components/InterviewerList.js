import React from "react";
import InterviewerListItem from "components/InterviewerListItem.js";
import PropTypes from 'prop-types';
import "components/InterviewerListItem.scss";

export default function InterviewerList(props) {

    const interviewers = props.interviewers.map(interviewer => {
        return (
          <InterviewerListItem
            key={interviewer.id}
            name={interviewer.name}
            avatar={interviewer.avatar}
            selected={interviewer.id === props.interviewer}
            setInterviewer={()=> props.setInterviewer(interviewer.id)}
          />
        );
      });

      InterviewerList.propTypes = {
        value : PropTypes.number,
        onChange : PropTypes.func.isRequired
      }

    return (
        <section className =''>
            <h4 className="interviewers__header text--light">{props.name}</h4>
            <ul className="interviewers__list">{interviewers}</ul>
            
        </section>

    )
}

// Set prop types
InterviewerList.propTypes = {
  interviewer: PropTypes.number,
  setInterviewer: PropTypes.func.isRequired
};