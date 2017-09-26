import { assert } from 'chai'
import TodosFactory from './'

describe('Todo list creation', () => {
  it('should create todos object with empty array', () => {
    const todos = TodosFactory.createList()
    assert.deepEqual(Object.keys(todos).sort(), ['add', 'remove', 'getList', 'subscribe', 'unsubscribe'].sort())
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

describe('Todo list subscribe functionality', () => {
  it('shouldn\'t subscribe to non function argument', () => {
    const todos = TodosFactory.createList()
    const anything = 'asdfasdf'
    const subscription = todos.subscribe(anything)
    assert.isNull(subscription)
  })
  it('should subscribe to any function', () => {
    const todos = TodosFactory.createList()
    let tester = 0
    const iter = (items) => {
      tester = items.length
    }
    todos.subscribe(iter)
    todos.add(['1', '2', '3', '4'])
    assert.equal(tester, 4)
  })

  it('should subscribe to 2 functions', () => {
    const todos = TodosFactory.createList()
    let tester1 = 0
    let tester2 = 0
    const iter1 = (items) => {
      tester1 = items.length
    }
    const iter2 = (items) => {
      tester2 = items.length
    }
    todos.subscribe(iter1)
    todos.subscribe(iter2)
    todos.add(['1', '2', '3', '4'])
    assert.equal(tester1, 4)
    assert.equal(tester2, 4)
  })
})

describe('Todo list unsubscribe functionality', () => {
  it('should subscribe to a function and then unsubscribe from it', () => {
    const todos = TodosFactory.createList()
    let tester = 0
    const iter = (items) => {
      tester = items.length
    }
    const subscription = todos.subscribe(iter)
    todos.unsubscribe(subscription)
    todos.add(['1', '2', '3', '4'])
    assert.equal(tester, 0)
  })

  it('should subscribe to 2 functions and unsubscribe from 1 of them', () => {
    const todos = TodosFactory.createList()
    let tester1 = 0
    let tester2 = 0
    const iter1 = (items) => {
      tester1 = items.length
    }
    const iter2 = (items) => {
      tester2 = items.length
    }
    todos.subscribe(iter1)
    const subscription2 = todos.subscribe(iter2)
    todos.unsubscribe(subscription2)
    todos.add(['1', '2', '3', '4'])
    assert.equal(tester1, 4)
    assert.equal(tester2, 0)
  })
})