import { useState } from "react";
import useFetch from "../hooks/useFetch";

const Flashcard = (props) => {
    const { data : flashcard, error, isPending} = useFetch(`http://localhost:8000/cards/`);
    const [flashcardCategory, setFlashcardCategory] = useState(props.category)
    const [filteredArray, setFilteredArray] = useState(Array().fill(null))

    if(flashcard){
        flashcard.filter((question) => {
            if(question.category === flashcardCategory){
                filteredArray.push(question.question)
            }})
    }
    let randomNumber = Math.floor(Math.random() * filteredArray.length)

    return ( 
        <div className="flashcard-container">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            <h1>{filteredArray[randomNumber]}</h1>
            {flashcardCategory !== 'home' && <button>See Answer</button>}
        </div>
     );
}
 
export default Flashcard;