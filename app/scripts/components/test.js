export default () => {
  describe('Todo list creation', function() {
    it('should create todos object with empty array', function () {
      var todos = TodosFactory.createList()
      expect(Object.keys(todos).sort()).toEqual(['add', 'remove', 'getList'].sort())
      expect(todos.getList()).toEqual([])
    })
    it('should create todos object with one value', function() {
      var todos = TodosFactory.createList('Test todo')
      expect(todos.getList()).toEqual(['Test todo'])
    })
    it('should create todos object with two values', function() {
      var todos = TodosFactory.createList(['Test todo 1', 'Test todo 2'])
      expect(todos.getList()).toEqual(['Test todo 1', 'Test todo 2'])
    })
  });
  describe('Todo list adding item(s)', function() {
    it('should add an item to empty list', function() {
      var todos = TodosFactory.createList()
      todos.add('Test todo')
      expect(todos.getList()).toEqual(['Test todo'])
    })
    it('should add an item to list', function() {
      var todos = TodosFactory.createList('Test todo 1')
      todos.add('Test todo 2')
      expect(todos.getList()).toEqual(['Test todo 1', 'Test todo 2'])
    })
    it('should add an items to list', function() {
      var todos = TodosFactory.createList('Test todo 1')
      todos.add(['Test todo 2', 'Test todo 3'])
      expect(todos.getList()).toEqual(['Test todo 1', 'Test todo 2', 'Test todo 3'])
    })
  })
  describe('Todo list removing item(s)', function() {
    it('should remove item by index', function() {
      var todos = TodosFactory.createList(['Test todo 1', 'Test todo 2', 'Test todo 3'])
      todos.remove(1)
      expect(todos.getList()).toEqual(['Test todo 1', 'Test todo 3'])
    })
    it('should remove item by name', function() {
      var todos = TodosFactory.createList(['Test todo 1', 'Test todo 2', 'Test todo 3', 'Test todo 2'])
      todos.remove('Test todo 2')
      expect(todos.getList()).toEqual(['Test todo 1', 'Test todo 3'])
    })
    it('shouldn\'t remove item by nonexistent name', function() {
      var todos = TodosFactory.createList(['Test todo 1', 'Test todo 2', 'Test todo 3', 'Test todo 2'])
      todos.remove('Test todo 4')
      expect(todos.getList()).toEqual(['Test todo 1', 'Test todo 2', 'Test todo 3', 'Test todo 2'])
    })
    it('shouldn\'t remove item by nonexistent index', function() {
      var todos = TodosFactory.createList(['Test todo 1', 'Test todo 2', 'Test todo 3', 'Test todo 2'])
      todos.remove(10)
      expect(todos.getList()).toEqual(['Test todo 1', 'Test todo 2', 'Test todo 3', 'Test todo 2'])
    })
  });
}