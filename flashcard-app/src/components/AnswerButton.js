

const AnswerButton = (props) => {

  return(
    <button className="answer-button" onClick={props.handleAnswer}>
      See Answer
    </button>
  )  
}

export default AnswerButton;