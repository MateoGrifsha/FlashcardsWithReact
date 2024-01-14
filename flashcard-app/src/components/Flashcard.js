import { useState } from "react";
import useFetch from "../hooks/useFetch";
import AnswerButton from "./AnswerButton";
import NextQuestion from "./NextQuestion";

const Flashcard = (props) => {
    const { data : flashcard, error, isPending} = useFetch(`http://localhost:8000/cards/`);
    const [flashcardCategory, setFlashcardCategory] = useState(props.category)
    const [filteredQuestions, setFilteredQuestions] = useState(Array().fill(null))
    const [filteredAnswers, setfilteredAnswers] = useState(Array().fill(null))
    const [showQuestion, setShowQuestion] = useState(true)
    const [questionIndex, setQuestionIndex] = useState(0)

    if(flashcard){
        flashcard.filter((question) => {
            if(question.category === flashcardCategory){
                filteredQuestions.push(question.question)
                filteredAnswers.push(question.answer)
            }})
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


        </div>
     );
}
 
export default Flashcard;