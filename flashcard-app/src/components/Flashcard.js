import { useState } from "react";
import useFetch from "../hooks/useFetch";

const Flashcard = () => {
    const [id, setId] = useState(1);
    const { data : flashcard, error, isPending} = useFetch(`http://localhost:8000/cards/${ id }`);

    return ( 
        <div className="flashcard-container">
            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {flashcard && (
                <article>
                    <p>{ flashcard.category }</p>
                    <h2>{ flashcard.question}</h2>
                    { <button onClick={console.log('button clicked')}>SEE ANSWER</button> }
                </article>
      )}
        </div>
     );
}
 
export default Flashcard;