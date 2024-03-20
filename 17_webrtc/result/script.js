;(() => {
  'use strict'

  const get = (element) => document.querySelector(element)
  const allowUser = {
    audio: true,
    video: true,
  }

  class WebRtc {
    constructor() {
      this.media = new MediaSource()
      this.recorder
      this.blobs
      this.playedVideo = get('video.played')
      this.recordVideo = get('video.record')
      this.btnDownload = get('.btn_download')
      this.btnRecord = get('.btn_record')
      this.btnPlay = get('.btn_play')
      this.container = get('.webrtc')
      this.events()
      navigator.mediaDevices.getUserMedia(allowUser).then((videoAudio) => {
        this.success(videoAudio)
      })
    }

    events() {
      this.btnRecord.addEventListener('click', this.toggleRecord.bind(this))
      this.btnPlay.addEventListener('click', this.play.bind(this))
      this.btnDownload.addEventListener('click', this.download.bind(this))
    }

    success(audioVideo) {
      this.btnRecord.removeAttribute('disabled')
      window.stream = audioVideo
      if(window.URL) {
        this.playedVideo.setAttribute('src', window.URL.createObjectURL(audioVideo))
      } else {
        this.playedVideo.setAttribute('src', audioVideo)
      }
    }

    toggleRecord() {
      if('녹화' === this.btnRecord.textContent) {
        this.startRecord()
      } else {
        this.btnPlay.removeAttribute('disabled')
        this.btnDownload.removeAttribute('disabled')
        this.btnRecord.textContent = '녹화'
        this.stopRecord()
      }
    }

    pushBlobData(event) {
      if(!event.data || event.data.size < 1) {
        return
      }
      this.blobs.push(event.data)
    }

    startRecord() {
      let type = {mimeType: 'video/webn;codecs=vp9'}
      this.blobs = []
      if(!MediaRecorder.isTypeSupported(type.mimeType)) {
        type = {mimeType: 'video/webm'}
      }
      this.recorder = new MediaRecorder(window.stream, type)
      this.btnRecord.textContent = '중지'
      this.btnPlay.setAttribute('disabled', true)
      this.btnDownload.setAttribute('disabled', true)
      this.recorder.ondataavailable = this.pushBlobData.bind(this)
      this.recorder.start(20)
    }

    stopRecord() {
      this.recorder.stop()
      this.recordVideo.setAttribute('controls', true)
    }

    play() {
      this.recordVideo.src = window.URL.createObjectURL(
        new Blob(this.blobs, {type: 'video/webm'})
      )
    }

    download() {
      const videoFile = new Blob(this.blobs, {type: 'video/webm'})
      const url = window.URL.createObjectURL(videoFile)
      // 다운로드 기능을 할 a 태그 생성
      const downloader = document.createElement('a')
      downloader.style.display = 'none'
      // attribute 속성으로 다운로드 기능 구현
      downloader.setAttribute('href', url)
      downloader.setAttribute('download', 'test_video.webm')
      this.container.appendChild(downloader)
      // 생성 즉시 click 동작
      downloader.click()
      // 다운로드 후 downloader 요소 및 url 삭제
      setTimeout(() => {
        this.container.removeChild(downloader)
        window.URL.revokeObjectURL(url)
      }, 100)
    }
  }

  new WebRtc()
})()
