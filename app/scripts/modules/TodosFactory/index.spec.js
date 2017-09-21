import { assert } from 'chai'
import TodosFactory from './'

describe('Todo list creation', () => {
  it('should create todos object with empty array', () => {
    const todos = TodosFactory.createList()
    assert.deepEqual(Object.keys(todos).sort(), ['add', 'remove', 'getList', 'subscribe'].sort())
    assert.deepEqual(todos.getList(), [])
  })

  it('should create todos object with one value', () => {
    const todos = TodosFactory.createList('Test todo')
    assert.deepEqual(todos.getList(), ['Test todo'])
  })

  it('should create todos object with two values', () => {
    const todos = TodosFactory.createList(['Test todo 1', 'Test todo 2'])
    assert.deepEqual(todos.getList(), ['Test todo 1', 'Test todo 2'])
  })
})

describe('Todo list adding item(s)', () => {
  it('should add an item to empty list', () => {
    const todos = TodosFactory.createList()
    todos.add('Test todo')
    assert.deepEqual(todos.getList(), ['Test todo'])
  })

  it('should add an item to list', () => {
    const todos = TodosFactory.createList('Test todo 1')
    todos.add('Test todo 2')
    assert.deepEqual(todos.getList(), ['Test todo 1', 'Test todo 2'])
  })
  it('should add an items to list', () => {
    const todos = TodosFactory.createList('Test todo 1')
    todos.add(['Test todo 2', 'Test todo 3'])
    assert.deepEqual(todos.getList(), ['Test todo 1', 'Test todo 2', 'Test todo 3'])
  })
})

describe('Todo list removing item(s)', () => {
  it('should remove item by index', () => {
    const todos = TodosFactory.createList(['Test todo 1', 'Test todo 2', 'Test todo 3'])
    todos.remove(1)
    assert.deepEqual(todos.getList(), ['Test todo 1', 'Test todo 3'])
  })

  it('should remove item by name', () => {
    const todos = TodosFactory.createList(['Test todo 1', 'Test todo 2', 'Test todo 3', 'Test todo 2'])
    todos.remove('Test todo 2')
    assert.deepEqual(todos.getList(), ['Test todo 1', 'Test todo 3'])
  })

  it('shouldn\'t remove item by nonexistent name', () => {
    const todos = TodosFactory.createList(['Test todo 1', 'Test todo 2', 'Test todo 3', 'Test todo 2'])
    todos.remove('Test todo 4')
    assert.deepEqual(todos.getList(), ['Test todo 1', 'Test todo 2', 'Test todo 3', 'Test todo 2'])
  })

  it('shouldn\'t remove item by nonexistent index', () => {
    const todos = TodosFactory.createList(['Test todo 1', 'Test todo 2', 'Test todo 3', 'Test todo 2'])
    todos.remove(10)
    assert.deepEqual(todos.getList(), ['Test todo 1', 'Test todo 2', 'Test todo 3', 'Test todo 2'])
  })
})