const NextQuestion = (props) => {

    return(
      <button className="answer-button" onClick={props.handleNext}>
        Next Question
      </button>
    )  
  }
  
  export default NextQuestion;