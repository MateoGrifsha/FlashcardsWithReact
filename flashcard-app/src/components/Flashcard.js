import { useState } from "react";
import useFetch from "../hooks/useFetch";
import AnswerButton from "./AnswerButton";
import NextQuestion from "./NextQuestion";
import { useNavigate } from 'react-router-dom'
import CategoryText from "./CategoryText";

const Flashcard = (props) => {
    const { data : flashcard, error, isPending} = useFetch(`http://localhost:8000/cards/`);
    // const [filteredQuestions, setFilteredQuestions] = useState(Array().fill(null))
    const filteredQuestions = Array()
    const [showQuestion, setShowQuestion] = useState(true)
    const [questionIndex, setQuestionIndex] = useState(0)
    const [deleted, setDeleted] = useState(false)
    const filteredFlashcard = Array()
    const flashcardCategory = props.category
    const navigate = useNavigate()

    if(flashcard){
        flashcard.filter((question) => {
            if(question.category === flashcardCategory){
                filteredFlashcard.push(question)
                filteredQuestions.push(question.question)
            }})
    }

    const handleDelete = (flashcardId) => {
        fetch('http://localhost:8000/cards/' + flashcardId, {
            method : 'DELETE'
        }).then(() => {
            setDeleted(true)
            setTimeout(()=>{
                navigate(0)
            }, 1000)
        })
    }
    
    const onAnswerClick = () =>{
        setShowQuestion(!showQuestion)
    }

    const onNextQuestion = () => {
        setShowQuestion(!showQuestion)
        setQuestionIndex(Math.floor(Math.random() * filteredFlashcard.length))
        
    }
    return ( 
        <div className="flashcard-container">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}

            <CategoryText category={flashcardCategory} />
            
            <h1>{(showQuestion && filteredFlashcard) ? 
            filteredQuestions[questionIndex] : filteredFlashcard[questionIndex].answer}</h1> 

            <div>{(flashcardCategory !== 'home' && showQuestion) ? <AnswerButton handleAnswer = {onAnswerClick}/> : <NextQuestion handleNext = {onNextQuestion} />
            }</div>

            {(showQuestion && filteredFlashcard) &&<div><button className="delete-button" onClick={()=>{handleDelete(filteredFlashcard[questionIndex].id)}}>DELETE QUESTION</button></div>}
            {deleted && <div>The question was deleted.</div>}
        </div>
     );
}
 
export default Flashcard;