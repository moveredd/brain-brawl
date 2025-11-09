import "./Result.css"

type ResultProps = {
  correct: number;
};

const Result=({correct}: ResultProps)=>{
    return (
        <div className="correct-box">
        You answered correctly to {correct} questions!
      </div>
    );
}

export default Result