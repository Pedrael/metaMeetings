var SmoothScroll = require('smooth-scroll')

function toggleAccordeon() {
  let items = document.querySelectorAll('.accordeon-item')
  items.forEach((item) => {
    item.addEventListener('click', (e) => {
      items.forEach(i => {
        if(i != e.currentTarget) {
          i.classList.remove('selected')
          var panel = i.querySelector('.panel')
          panel.style.maxHeight = null;
        }
      })
      e.currentTarget.classList.toggle('selected')
      var panel = e.currentTarget.querySelector('.panel')
       if (panel.style.maxHeight) {
         panel.style.maxHeight = null;
       } else {
         panel.style.maxHeight = panel.scrollHeight + "px";
       }
    })
  })
}

toggleAccordeon()

var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 900,
    speedAsDuration: true
})
