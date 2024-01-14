const CreateForm = ()=>{
    return(
        <div className="form-container">
            <form>
                <label>Category</label>
                <select>
                    <option value='maths'>Maths</option>
                    <option value='biology'>Biology</option>
                    <option value='physics'>Physics</option>
                </select>

                <label>Question</label>
                <input type="text" placeholder="Question goes here..." />
                <label>Answer</label>
                <input type="text" placeholder="Question goes here..." />

                <button>Submit</button>
            </form>
        </div>
    )
}

export default CreateForm