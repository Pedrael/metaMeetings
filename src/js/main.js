function toggleAccordeon() {
  let items = document.querySelectorAll('.accordeon-item')
  items.forEach((item) => {
    item.addEventListener('click', (e) => {
      items.forEach(i => {
        if(i != e.currentTarget) i.classList.remove('selected')
      })
      e.currentTarget.classList.toggle('selected')
    })
  })
}

toggleAccordeon()
