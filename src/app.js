'use strict'

function onLoad () {
  const toolbar = document.querySelector('.toolbar')
  const contrastButton = document.querySelector('.contrast-button')
  const spinButton = document.querySelector('.spin-button')
  const display = document.querySelector('.display')
  const shinyText = document.querySelector('.shiny-text')
  const shinyImage = document.querySelector('.shiny-image')

  function contrast () {
    const classList = display.classList
    const contrastClass = Array.from(classList)
      .filter(className => className.search(/^contrast-*/) !== -1)[0]
    const map = {
      'contrast-bright': 'contrast-dark',
      'contrast-middle': 'contrast-bright',
      'contrast-dark': 'contrast-middle',
    }
    classList.remove(contrastClass)
    classList.add(map[contrastClass])
  }

  function spin () {
    const classList = display.classList
    const contrastClass = Array.from(classList)
      .filter(className => className.search(/^spin-*/) !== -1)[0]
    const map = {
      'spin-fast': 'spin-off',
      'spin-middle': 'spin-fast',
      'spin-slow': 'spin-middle',
      'spin-off': 'spin-slow',
    }
    classList.add(map[contrastClass])
    classList.remove(contrastClass)
  }

  function enableDropImage (ele, fn) {
    ele.addEventListener('dragover', (e) => {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    }, false)
    ele.addEventListener('drop', (e) => {
      e.stopPropagation()
      e.preventDefault()

      const imageType = /image.*/
      const imgFiles = [...e.dataTransfer.files].filter(file => file.type.match(imageType))
      fn(imgFiles)
    }, false)
  }

  function edit () {
    toolbar.classList.remove('hidden')
    shinyText.focus()
  }

  function finishEditing () {
    toolbar.classList.add('hidden')
    shinyText.blur()
  }

  contrastButton.addEventListener('click', contrast)
  spinButton.addEventListener('click', spin)

  shinyText.addEventListener('focus', edit)

  shinyText.addEventListener('keydown', e => {
    if (e.key === 'Escape' || e.key === 'Enter') {
      finishEditing()
    }
  })

  document.addEventListener('keydown', e => {
    if (e.target === shinyText) return

    switch (e.key) {
    case 'i':
    case 'e':
      edit()
      break

    case 'c':
      // Change contrast
      contrast()
      break

    case 's':
      // spin text
      spin()
      break

    default:
      e.preventDefault()
    }
  })

  enableDropImage(document.body, (files) => {
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      shinyImage.src = e.target.result
    }
    reader.readAsDataURL(file)
    shinyText.classList.add('hidden')
    shinyImage.classList.remove('hidden')
  })
}

if (document.readyState !== 'loading') {
  onLoad()
} else {
  document.addEventListener('DOMContentLoaded', onLoad)
}
