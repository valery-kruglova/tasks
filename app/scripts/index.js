import TodosFactory from './modules/TodosFactory'

const todos = TodosFactory.createList(['Make some code'])

const root = document.getElementById('root')

function render(items) {
  const ul = document.createElement('ul')
  const list = items.forEach(item => {
    const li = document.createElement('li')
    li.textContent = item
    ul.appendChild(li)
  })
  root.innerHTML = ''
  root.appendChild(ul)
}

todos.subscribe(render)

