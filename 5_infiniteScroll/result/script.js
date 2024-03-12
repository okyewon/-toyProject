;(function () {
  'use strict'

  const get = (target) => {
    return document.querySelector(target)
  }

  let page = 1
  const limit = 10
  const $posts = get('.posts')
  const end = 100
  let total = 10

  const $loader = get('.loader')

  const getPost = async () => {
    const API_URL = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('에러')
    }
    return await response.json()
  }

  const showPosts = (posts) => {
    posts.forEach((post) => {
      const $post = document.createElement('div')
      $post.classList.add('post')
      $post.innerHTML = `
        <div class="header">
          <div class="id">${post.id}</div>
          <div class="title">${post.title}</div>
        </div>
        <div class="body">
          ${post.body}
        </div>
      `
      $posts.appendChild($post)
    })
  }

  const showLoader = () => {
    $loader.classList.add('show')
  }

  const hideLoader = () => {
    $loader.classList.remove('show')
  }

  const loadPosts = async (page, limit) => {
    showLoader()
    try{
      const response = await getPost(page, limit)
      showPosts(response)
    } catch (error) {
      console.error(error)
    } finally {
      hideLoader()
    }
  }

  const onScroll = () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement

    if (total === end) {
      window.removeEventListener('scroll', handleScroll)
      return
    }

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      page++
      total += 10
      loadPosts()
      return
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    loadPosts()
    window.addEventListener('scroll', onScroll)
  })
})()
