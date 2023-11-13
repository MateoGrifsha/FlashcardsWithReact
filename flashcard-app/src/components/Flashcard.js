import { useState } from "react";
import useFetch from "../hooks/useFetch";

const Flashcard = (category) => {
    const [id, setId] = useState(1);
    const [flashcardCategory, setFlashcardCategory] = useState(category)
    const { data : flashcard, error, isPending} = useFetch(`http://localhost:8000/cards/${ id }`);
    const handleClick = () => {
        console.log(flashcard.answer)
    }

    const handleCategory = () => {
        setId((Math.floor(Math.random() * 4) + 1))
    }

    let questions = Array()

    return ( 
        <div className="flashcard-container">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {flashcard && (
                <article>
                    <p>Category: { flashcard.category }</p>
                    <h2>{ flashcard.question}</h2>
                    { <button onClick={handleCategory}>SEE ANSWER</button> }
                </article>
      )}
        </div>
     );
}
 
export default Flashcard;