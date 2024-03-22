;(function () {
  'use strict'

  const commands = [
    {
      cmd: 'backColor',
      val: 'blue',
      label: '배경 컬러',
    },
    {
      cmd: 'bold',
      label: '굵기',
    },
    {
      cmd: 'justifyCenter',
      label: '가운데 정렬',
    },
    {
      cmd: 'justifyFull',
      label: '양쪽 정렬',
    },
    {
      cmd: 'justifyLeft',
      label: '좌측 정렬',
    },
    {
      cmd: 'justifyRight',
      label: '우측 정렬',
    },
    {
      cmd: 'underline',
      label: '밑줄',
    },
  ]

  let commandObject = {}

  const get = (target) => {
    return document.querySelector(target)
  }

  const $editorBottons = get('.editor_buttons')
  const $showEditorButton = get('.show_editor_button')
  const $showHTMLButton = get('.show_html_button')
  const $editorEdit = get('.editor.edit')
  const $editorHTML = get('.editor.html')

  const doCommand = (cmdKey) => {
    // init 에서 만든 commandObject 객체의 key값으로 접근
    const cmd = commandObject[cmdKey]
    const val =
      typeof cmd.val !== 'undefined'
        ? prompt('Value for ' + cmd.cmd + '?', cmd.val)
        : ''
    document.execCommand(cmd.cmd, false, val || '')
  }

  const onClickShowEditorButton = () => {
    $editorEdit.innerHTML = $editorHTML.innerText
    $editorEdit.classList.toggle('show')
    $editorHTML.classList.toggle('show')
  }

  const onClickShowHTMLButton = () => {
    $editorHTML.innerText = $editorEdit.innerHTML
    $editorEdit.classList.toggle('show')
    $editorHTML.classList.toggle('show')
  }

  const init = () => {
    commands.map((command) => {
      // 빈 객체에 command.cmd 를 key 로 받고 각 command 를 값으로 넣어주기
      commandObject[command.cmd] = command
      const element = document.createElement('button')
      element.innerText = command.label
      element.addEventListener('click', (e) => {
        e.preventDefault()
        doCommand(command.cmd)
      })
      $editorBottons.appendChild(element)
    })
  }

  $showEditorButton.addEventListener('click', onClickShowEditorButton)
  $showHTMLButton.addEventListener('click', onClickShowHTMLButton)

  init()
})()
