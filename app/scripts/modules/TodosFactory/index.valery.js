const convertToArray = arg => Array.isArray(arg)
  ? arg
  : typeof arg === 'string'
    ? [arg]
    : []

const TodosFactory = {

  createList(list) {
    const items = convertToArray(list)
    const callbacks = {
      add: {},
      remove: {}
    }
    let lastId = 0
    const runCallback = (event) => {
      for (const key in callbacks[event]) {
        callbacks[event][key](items.slice())
      }
    }
    return {
      subscribe(event, fn) {
        if (typeof fn === 'function') {
          callbacks[event][lastId] = fn
          return lastId++
        }
        throw Error('You should provide function to subscribe method')
      },
      unsubscribe(id) {
        if (typeof callbacks[id] === 'function') {
          delete callbacks.add[id]
          delete callbacks.remove[id]
          return true
        }
        return null
      },
      add(item) {
        const convertedItem = convertToArray(item)
        items.push(...convertedItem)
        runCallback('add')
      },
      getList() {
        return items.slice()
      },
      remove(removeItem) {
        if (typeof removeItem === 'string') {
          for (let i = items.length; i >= 0; i--) {
            if (removeItem === items[i]) {
              items.splice(i, 1)
            }
          }
        } else if (typeof removeItem === 'number' && removeItem < items.length) {
          items.splice(removeItem, 1)
        }
        runCallback('remove')
      }
    }
  }
}

export default TodosFactory