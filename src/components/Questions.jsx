import Answer from "./Answer";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export default function Questions(){

    const [data, setData] = useState([]);
  
    function getData(){
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then(res => res.json())
            .then(j => setData(j.results))
    }


    useEffect(function(){
      getData();
    }, []);

    const [numCorrect, setNumCorrect] = useState(-1);
    const [questions, setQuestions] = useState(() => beginQuiz());

    function randomizeAnswers(array){
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    function beginQuiz(){
        let quests = [];
        data.forEach((quest) =>{
            // API sends info with html entities
            const questionText = decode(quest.question);
            const correctAnswer = decode(quest.correct_answer);
            const incorrectAnswers = quest.incorrect_answers.map(ans => decode(ans));

            quests.push({
                id: nanoid(),
                question: questionText,
                correctAnswer: correctAnswer,
                incorrectAnswers: incorrectAnswers,
                answers: randomizeAnswers([correctAnswer, ...incorrectAnswers]),
                selected: "",
                displayCorrect: false
            })
        })
        setNumCorrect(-1);
        return quests;
    }

    useEffect(function(){
        setQuestions(beginQuiz());
    }, [data])

    const questionElements = questions.map(quest => {return(
        <Answer 
            key={quest.id}
            id={quest.id}
            question={quest.question}
            correctAnswer={quest.correctAnswer}
            answers={quest.answers}
            selected={quest.selected}

            displayCorrect={quest.displayCorrect}


            handleClick={answerSelected}
        />
    )})

    function answerSelected(id, answer){
        setQuestions(prevQuestions => prevQuestions.map(quest => quest.id === id ? {
            ...quest,
            selected: answer
        }: quest)
        )
    }

    function handleCheckAnswers(){
        let numCorrect = questions.reduce((total, quest) => { return quest.selected === quest.correctAnswer ? total + 1 : total;}, 0);

        setNumCorrect(numCorrect);

        setQuestions(prevQuestions => prevQuestions.map (quest => {
            return {
                ...quest,
                displayCorrect: true
            }
        }))
    }

    return (
        <div className="question-display">
            <div className="questions-container">
                    {questionElements}
            </div>

            <div className="questions-footer">
                {numCorrect >= 0
                ? <p>
                    You scored {numCorrect} / 5 correct answers <button onClick={getData} className="questions-btn">Play Again</button>
                </p>
                : <button onClick={handleCheckAnswers} className="questions-btn">Check answers</button>}
                
            </div>
        </div>
    )
}