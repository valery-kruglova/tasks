export const convertToArray = arg => Array.isArray(arg)
  ? arg.slice()
  : typeof arg === 'string'
    ? [arg]
    : []

const TodosFactory = {
  createList(list) {
    let items = convertToArray(list)
    const callbacks = new Map()
    let runCallbacks = function () {
      for (const callback of callbacks) {
        callback[1](this.getList())
      }
    }
    const result = {
      subscribe(fn) {
        if (typeof fn !== 'function') {
          return null
        }
        const key = `__subsciber__${Math.random().toString().substr(2)}`
        callbacks.set(key, fn)
        return key
      },
      unsubscribe(key) {
        return callbacks.delete(key)
      },
      add(item) {
        items = [...items, ...convertToArray(item)]
        runCallbacks()
      },
      getList() {
        return items.slice()
      },
      remove(itemToRemove) {
        const indexes = typeof itemToRemove === 'number'
          ? [itemToRemove]
          : typeof itemToRemove === 'string'
            ? items.reduce((acc, item, index) => {
              item === itemToRemove && acc.push(index)
              return acc
            }, [])
            : []
        items = items.filter((item, index) => !~indexes.indexOf(index))
        runCallbacks()
      }
    }
    runCallbacks = runCallbacks.bind(result)
    return result
  }
}

export default TodosFactory