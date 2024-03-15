;(function () {
  'use strict'

  const get = (target) => document.querySelector(target);
  const getAll = (target) => document.querySelectorAll(target);

  const $search = get('#search');
  const $list = getAll('.contents.list figure');
  const $searchButton = get('.btn_search');

  const $player = get('.view video');
  const $btnPlay = get('.js-play');
  const $btnReplay = get('.js-replay');
  const $btnStop = get('.js-stop');
  const $btnMute = get('.js-mute');
  const $progress = get('.js-progress');
  const $volume = get('.js-volume');
  const $fullScreen = get('.js-fullScreen');
  
  const init = () => {
    $search.addEventListener('keyup', search);
    $searchButton.addEventListener('click', search);

    for (let index = 0; index < $list.length; index++) {
      const $target = $list[index].querySelector('picture');
      $target.addEventListener('mouseover', onMouseOver);
      $target.addEventListener('mouseout', onMouseOut);
    }

    for (let index = 0; index < $list.length; index++) {
      $list[index].addEventListener('click', hashChange)
    }

    window.addEventListener('hashchange', () => {
      const isView = -1 < window.location.hash.indexOf('view');
      if(isView) {
        getViewPage();
      } else {
        getListPage();
      }
    })

    viewPageEvent();
  }

  const search = () => {
    let searchText = $search.value.toLowerCase();

    for (let index = 0; index < $list.length; index++) {
      const $target = $list[index].querySelector('strong');
      const text = $target.textContent.toLowerCase();

      if(-1 < text.indexOf(searchText)) {
        $list[index].style.display = 'flex';
      } else {
        $list[index].style.display = 'none';
      }
    }
  }

  const onMouseOver = (e) => {
    const webpPlay = e.target.parentNode.querySelector('source');
    webpPlay.setAttribute('srcset', './assets/sample.webp');
  }

  const onMouseOut = (e) => {
    const webpPlay = e.target.parentNode.querySelector('source');
    webpPlay.setAttribute('srcset', './assets/sample.jpg');
  }

  const hashChange = (e) => {
    e.preventDefault();
    const parentNode = e.target.closest('figure');
    const viewTitle = parentNode.querySelector('strong').textContent;
    window.location.hash = `view&${viewTitle}`;
  }

  const getViewPage = () => {
    const viewTitle = get('.view strong');
    // 인코딩 된 문자열을 그대로 넣지 않고 decodeURI 사용
    const urlTitle = decodeURI(window.location.hash.split('&')[1]);
    viewTitle.innerText = urlTitle;

    get('.list').style.display = 'none';
    get('.view').style.display = 'flex';
  }

  const getListPage = () => {
    get('.list').style.display = 'flex';
    get('.view').style.display = 'none';
  }

  const buttonChange = (btn, value) => {
    btn.innerText = value;
  }

  const viewPageEvent = () => {
    $volume.addEventListener('change', (e) => {
      $player.volume = e.target.value;
    })

    $player.addEventListener('timeupdate', setProgress)
    // $player.addEventListener('play', buttonChange($btnPlay, 'pause'))
    // $player.addEventListener('pause', buttonChange($btnPlay, 'play'))
    // $player.addEventListener('volumeChange', () => {
    //   $player.muted 
    //   ? buttonChange($btnMute, 'unmute')
    //   : buttonChange($btnMute, 'mute')
    // })
    $player.addEventListener('ended', $player.pause())
    $progress.addEventListener('click', getCurrent)
    $btnPlay.addEventListener('click', playVideo)
    $btnStop.addEventListener('click', stopVideo)
    $btnReplay.addEventListener('click', replayVideo)
    $btnMute.addEventListener('click', mute)
    $fullScreen.addEventListener('click', fullScreen)
  }

  const getCurrent = (e) => {
    // e.offsetX => 이벤트 발생 시 progress 바 위치
    // $progress.offsetWidth => progress 바 전체 넓이
    let percent = e.offsetX / $progress.offsetWidth;
    // $player.duration => 비디오 재생 시간(초 단위)
    $player.currentTime = percent * $player.duration;
    e.target.value = Math.floor(percent / 100);
  }

  const setProgress = () => {
    let percentage = Math.ceil((100 / $player.duration) * $player.currentTime)
    $progress.value = percentage;
  }

  const playVideo = () => {
    if($player.paused || $player.ended) {
      buttonChange($btnPlay, 'Pause');
      $player.play();
    } else {
      buttonChange($btnPlay, 'Play')
      $player.pause();
    }
  }

  const stopVideo = () => {
    $player.pause();
    $player.currentTime = 0
    buttonChange($btnPlay, 'play')
  }

  const resetPlayer = () => {
    // $progress.value = 0
    $player.currentTime = 0
    buttonChange($btnPlay, 'play')
  }

  const replayVideo = () => {
    resetPlayer()
    $player.play()
    buttonChange($btnPlay, 'Pause')
  }

  const mute = () => {
    if($player.muted) {
      buttonChange($btnMute, 'mute')
      $player.muted = false;
    } else {
      buttonChange($btnMute, 'unmuted')
      $player.muted = true;
    }
  }

  const fullScreen = () => {
    if($player.requestFullscreen) {
      // document.fullscreenElement => 전체화면 사용중인지 여부
      if(document.fullscreenElement) {
        document.cancelFullScreen()
      } else {
        $player.requestFullscreen()
      }
    } else if($player.msRequestFullscreen) {
      if(document.msRequestFullscreen) {
        document.msExitFullscreen()
      } else {
        alert('Not Supported')
      }
    }
  }

  init()

})()
