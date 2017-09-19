import { markupMenu } from './markup-menu';
markupMenu(window.document);

// import test from './components/test'
import fabric from './components/fabric'
$(() => {
  const TodosFactory = fabric;
  const todos = TodosFactory.createList();
  todos.add();
  // test();
});