import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
 
const CreateForm = ()=>{
    const [category, setCategory] = useState('maths')
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [addedQuestion, setAddedQuestion] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const newFlashcard = {category, question, answer}
        fetch('http://localhost:8000/cards/', {
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
            body : JSON.stringify(newFlashcard)
        }).then(()=>{
            setAddedQuestion(true)
        })



        setTimeout(() => {
            navigate('/'+category)

        }, 1000)
    }

    return(
        <div className="form-container">
            <form onSubmit={handleSubmit}> 
                <label>Category</label>
                <select value={category} onChange={(e)=> {setCategory(e.target.value)}}>
                    <option value='maths'>Maths</option>
                    <option value='biology'>Biology</option>
                    <option value='physics'>Physics</option>
                </select>

                <label>Question</label>
                <input 
                type="text"
                value={question}
                onChange={(e) => {setQuestion(e.target.value)}}
                />
                <label>Answer</label>
                <input 
                type="text"
                value={answer}
                onChange={(e) => {setAnswer(e.target.value)}}
                />
                <div className="submit-button">
                    <button>Add Question</button>
                </div>
            </form>

            {addedQuestion && <p className='confirmation-text'>Your question was added.</p>}
        </div>
    )
}

export default CreateForm