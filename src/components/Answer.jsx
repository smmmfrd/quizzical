export default function Answer(props){

    function answerClasses(answer){
        //Base class
        let bleh = "answer ";
        // if showing
        if(props.displayCorrect){
            if(answer === props.correctAnswer){
                bleh += "correct";
            } else if(answer === props.selected){
                bleh += "wrong";
            }
        } else {
            if(answer === props.selected) {
                bleh += "selected";
            }
        }

        //If selected
        

        return bleh;
    }

    const answerElements = props.answers.map((answer, index) =>{
        return (
            <div 
                key={index} 
                className={answerClasses(answer)}
                
                onClick={() => {
                    if(!props.displayCorrect){
                        props.handleClick(props.id, answer)
                    }
                }}
            >{answer}</div>
        )
    })

    return (
        <>
            <h3 className="question">{props.question}</h3>
            <div className="answer-container">
                {answerElements}
            </div>
            <hr></hr>
        </>
    )
}