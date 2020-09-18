function toggleAccordeon() {
  let items = document.querySelectorAll('.accordeon-item')
  items.forEach((item) => {
    item.addEventListener('click', (e) => {
      console.log(e.currentTarget)
      e.currentTarget.classList.toggle('selected')
    })
  })
}

toggleAccordeon()
