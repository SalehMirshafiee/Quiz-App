const formatDate = (questionData) => {
    const result = questionData.map((item) => {
      const qustionObject = { question: item.question };
      const awnsers = [...item.incorrect_answers];
      const correctAwnserIndex = Math.floor(Math.random() * 4);
      awnsers.splice(correctAwnserIndex, 0, item.correct_answer);
      qustionObject.answers = awnsers;
      qustionObject.correctAwnserIndex = correctAwnserIndex;
      return qustionObject;
    });
    return result;
  };

  export default formatDate;