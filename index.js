'use strict'

window.onload = () => {
  const keyAudioPairs = getMidiKeysAndAudioElements()

  playAudioOnKeyClick(keyAudioPairs)
  playAudioOnNumpadTyping(keyAudioPairs.map((pair) => pair[0]))

  showTip()
}

function getMidiKeysAndAudioElements() {
  const keys = document.querySelectorAll('.tecla')
  const pairs = []
  keys.forEach((key) => {
    const audio = document.getElementById(key.id.substring(4))
    pairs.push([key, audio])
  })
  return pairs
}

function playAudioOnKeyClick(elements) {
  elements.forEach((pair) => {
    const [key, audio] = pair
    key.onclick = () => {
      audio.play()
    }
    audio.onplay = () => {
      key.classList.add('ativa')
    }
    audio.onpause = () => {
      key.classList.remove('ativa')
    }
  })
}

function playAudioOnNumpadTyping(midiKeys) {
  const orderedKeys = [
    ...midiKeys.slice(6),
    ...midiKeys.slice(3, 6),
    ...midiKeys.slice(0, 3),
  ]

  document.onkeydown = (e) => {
    const parsedValue = parseInt(e.key)
    if (parsedValue === NaN) return

    orderedKeys[parsedValue - 1].click()
  }
}

function showTip() {
  const hideTip = localStorage.getItem('hideTip')
  if (hideTip === null) {
    const tip = document.getElementById('dica')
    tip.style.display = 'flex'
    document.getElementById('dica__botao').onclick = () => {
      tip.style.display = 'none'
      localStorage.setItem('hideTip', '')
    }
  }
}
