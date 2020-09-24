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

function smoothCalc(oldV, newV, link) {
  console.log(oldV, newV)
  if(oldV == newV) return;
  let dif = Math.abs(oldV - newV)
  let iii = setInterval(() => {
    oldV > newV ? document.querySelector(link).innerHTML-- : document.querySelector(link).innerHTML++
    document.querySelector(link).innerHTML == newV ? clearInterval(iii) : null
  }, 30)

}

function calculateValues() {
  let input = document.querySelector('#jscalcinput')
  let v = Number.parseInt(input.value)
  input.oninput = function() {
    if(input.value < 1) input.value = 1
    if(input.value > 12) input.value = 12
    v = Number.parseInt(input.value)
  }

  let button = document.querySelector('#jscalcbtn')
  button.onclick = function(e) {
    e.preventDefault()
    smoothCalc(document.querySelector('#jscalcv1').innerHTML, v * 4, '#jscalcv1')
    smoothCalc(document.querySelector('#jscalcv2').innerHTML, v * 2, '#jscalcv2')
    smoothCalc(document.querySelector('#jscalcv3').innerHTML, v * 2, '#jscalcv3')
  }

}

toggleAccordeon()
calculateValues()

var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 900,
    speedAsDuration: true
})
