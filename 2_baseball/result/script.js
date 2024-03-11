;(function () {
  'use strict'

  const get = (target) => document.querySelectorAll(target);

  const init = () => {
    get('form').addEventListener('submit', (event) => {
      playGame(event);
    });
    setHomeRun();
  };

  const baseball = {
    linit: 10,
    digit: 4,
    trial: 0,
    end: false,
    $question: get('.ball_question'),
    $answer: get('.ball_answer'),
    $input: get('.ball_input'),
  }

  const setHomeRun = () => {
    // 4자리 숫자를 모두 맞추었을 때
  }

  const onplayed = (number, hint) => {
    // 시도를 했을 때
    return `<em>${trial}차 시도</em>: ${number}, ${hint}`
  }

  const isCorrect = () => {
    // 번호가 같은가?
  }

  const isDuplicate = () => {
    // 중복번호가 있는가?
  }

  const getStrikes = () => {
    // 스트라이크 카운트는 몇개?
  }

  const getBalls = () => {
    // 볼 카운트는 몇개?
  }

  const getResult = () => {
    // 시도에 따른 결과는?
  }

  const playGame = () => {
    // 시도에 따른 결과는?
  }
})()
