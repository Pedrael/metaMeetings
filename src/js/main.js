var SmoothScroll = require('smooth-scroll')
var axios = require('axios')

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
    // 1 = 4.33 и 2.16 и 2.16
    smoothCalc(document.querySelector('#jscalcv1').innerHTML, Math.round(v * 4.33), '#jscalcv1')
    smoothCalc(document.querySelector('#jscalcv2').innerHTML, Math.round(v * 2.16), '#jscalcv2')
    smoothCalc(document.querySelector('#jscalcv3').innerHTML, Math.round(v * 2.16), '#jscalcv3')
  }
  smoothCalc(document.querySelector('#jscalcv1').innerHTML, Math.round(v * 4.33), '#jscalcv1')
  smoothCalc(document.querySelector('#jscalcv2').innerHTML, Math.round(v * 2.16), '#jscalcv2')
  smoothCalc(document.querySelector('#jscalcv3').innerHTML, Math.round(v * 2.16), '#jscalcv3')
}

function calculatePricesDollar() {
  axios.get('https://www.cbr-xml-daily.ru/daily_json.js').then((data) => {
    let dollar = data.data.Valute.USD.Value
    let list = document.querySelector('#jsprice')
    let items = list.querySelectorAll('.item')
    items.forEach((item) => {
      let dollarPrice = item.querySelector('.dollar').innerHTML.replace(' $', '')
      let rublItem = item.querySelector('.rubl')
      let rublPrice = Math.ceil(dollarPrice*dollar)
      var length = Math.log(rublPrice) * Math.LOG10E + 1 | 0
      if (length >= 5) {
        rublPrice = rublPrice.toString().slice(0, 2) + ' ' + rublPrice.toString().slice(2, rublPrice.length)
      }
      rublItem.innerHTML = `~${rublPrice} руб`
    })

  })
}

toggleAccordeon()
calculateValues()
calculatePricesDollar()

var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 900,
    speedAsDuration: true
})
