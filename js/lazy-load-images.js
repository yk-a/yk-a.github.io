addEventListener('DOMContentLoaded', () => {

  [...document.querySelectorAll('img')].forEach((img) => {

    var loaded = img.complete && img.naturalHeight !== 0

    if (loaded) {
      img.classList.add('loaded')
    } else {
      img.addEventListener('load', img.classList.add('loaded'))
    }
  })
})
