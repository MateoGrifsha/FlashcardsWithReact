import { useState } from "react";
import useFetch from "../hooks/useFetch";
import AnswerButton from "./AnswerButton";
import NextQuestion from "./NextQuestion";
import { useNavigate } from 'react-router-dom'

const Flashcard = (props) => {
    const { data : flashcard, error, isPending} = useFetch(`http://localhost:8000/cards/`);
    const [filteredQuestions, setFilteredQuestions] = useState(Array().fill(null))
    const [filteredAnswers, setfilteredAnswers] = useState(Array().fill(null))
    const [filteredId, setFilteredId] = useState(Array().fill(null))
    const [showQuestion, setShowQuestion] = useState(true)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [deleted, setDeleted] = useState(false)
    const flashcardCategory = props.category
    const navigate = useNavigate()

    if(flashcard){
        flashcard.filter((question) => {
            if(question.category === flashcardCategory){
                filteredQuestions.push(question.question)
                filteredAnswers.push(question.answer)
                filteredId.push(question.id)
            }})
    }

    const handleDelete = (flashcardId) => {
        fetch('http://localhost:8000/cards/' + flashcardId, {
            method : 'DELETE'
          }).then(() => {
            setDeleted(true)
            setTimeout(()=>{
                navigate("/"+flashcardCategory)
            }, 1000)
          })
    }
    
    const onAnswerClick = () =>{
        setShowQuestion(!showQuestion)
    }

    const onNextQuestion = () => {
        setShowQuestion(!showQuestion)
        if(questionIndex === filteredQuestions.length + 1){
            setQuestionIndex(0)
        }
        else{
            setQuestionIndex(questionIndex + 1)
        }
    }

    return ( 
        <div className="flashcard-container">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <p className="category-label">{'Category: ' + flashcardCategory}</p>
            <h1>{showQuestion ? filteredQuestions[questionIndex] : filteredAnswers[questionIndex]}</h1> 
            <div>{(flashcardCategory !== 'home' && showQuestion) ? <AnswerButton handleAnswer = {onAnswerClick}/> : <NextQuestion handleNext = {onNextQuestion} />
            }</div>
            {showQuestion && <div><button className="delete-button" onClick={()=>{handleDelete(filteredId[questionIndex])}}>DELETE QUESTION</button></div>}
            {deleted && <p>The question was deleted.</p>}

        </div>
     );
}
 
export default Flashcard;