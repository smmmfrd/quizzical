export default function StartScreen(props){
    return(
        <div className="start">
            <h1>Quizzical</h1>
            <p>A quiz app by smmmfrd</p>
            <button onClick={props.handleStart}className="start-btn">Start quiz</button>
        </div>
    )
}