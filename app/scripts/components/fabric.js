export default () => {
  const TodosFactory = {
    createList: function (list) {
      let items = [];
      if (Array.isArray(list)) {
        items = list.slice();
      } else if (typeof list === 'string') {
        items.push(list);
      }
      return {
        add: function (item) {
          if (Array.isArray(item)) {
            for (let i = 0; i < item.length; i++) {
              items.push(item[i]);
            }
          } else if (typeof item === 'string') {
            items.push(item);
          }
        },
        getList: function () {
          return items.slice();
        },
        remove: function (removeItem) {
          if (typeof removeItem === 'string') {
            for (let i = items.length; i >= 0; i--) {
              if (removeItem == items[i]) {
                items.splice(i, 1);
              }
            }
          } else if (typeof removeItem === 'number' && removeItem < items.length) {
            items.splice(removeItem, 1);
          }
        }
      }
    }
  }
  const todos = TodosFactory.createList();
  todos.add();
}