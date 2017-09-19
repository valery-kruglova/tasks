import TodosFactory from './modules/TodosFactory'

const todos = TodosFactory.createList(['Make some code'])

console.log(todos.getList())