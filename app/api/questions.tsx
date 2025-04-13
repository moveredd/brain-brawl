export default async function Questions() {
    // Fetch questions from the API
    const response = await fetch("https://opentdb.com/api.php?amount=20&category=9&difficulty=easy&type=multiple");
    const data = await response.json();
    const questions = data.results;  // Assuming the questions are in the 'results' property.

    return (
        <ul className="space-y-4 p-4">
            {questions.map((question, index) => (
                <li key={index} className="p-4 bg-white shadow-md rounded-lg text-gray-700">
                    <div className="font-bold">{question.question}</div>
                    <div>Options:</div>
                    <ul className="list-disc pl-5">
                        {question.incorrect_answers.concat(question.correct_answer).map((answer, i) => (
                            <li key={i} className="text-gray-600">{answer}</li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}
