import TodosFactory from './modules/TodosFactory'

const todos = window.todos = TodosFactory.createList(['Make some code'])

console.log(todos.getList())
