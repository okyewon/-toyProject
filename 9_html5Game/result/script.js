;(function () {
  'use strict'

  const get = (target) => document.querySelector(target)

  const $canvas = get('convas')
  const ctx = $canvas.getContext('2d')

  const $score = get('.score')
  const $highscore = get('.highscore')
  const $play = get('.js-play')

  //옵션화
  const colorSet = {
    board: 'rgb(20, 105, 38)',
    snakeHead: 'rgba(229, 65, 120, 0.929)',
    snakeBody: 'rgba(153, 206, 244, 0.498)',
    food: 'rgb(66, 187, 103)',
  }

  let start = 0;
  let option = {
    highscore: localStorage.getItem('score') || 0,
    gameEnd: true,
    direction: 2, // 시계방향으로 4개의 모서리 중 2번 위치
    snake: [
      {x: 10, y: 10, direction: 2},
      {x: 10, y: 20, direction: 2},
      {x: 10, y: 30, direction: 2},
    ],
    food: {x: 0, y: 0},
    score: 0,
  }

  const init = () => {

  }

  init()
})()
