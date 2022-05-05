
import { InputPrimary } from "../Inputs/InputPrimary";
import { BiTask } from "react-icons/bi"
import { 
  Container, 
  ContainerSearch, 
  ContainerTasksList,
} from "./styles";
import { useState } from "react";


type TodoList = {
  title: string;
  done: boolean;
}

export function TodoList() {
  const [ todoName, setTodoName ] = useState<string>('');
  const [ todoList, setTodoList ] = useState<TodoList[] | []>([]);

  function handleAddTask(event) {
    if(event.key !== 'Enter') return null;

    const cloneList = [...todoList];
    const newTodo = {title: todoName, done: false}
    cloneList.push(newTodo)

    setTodoList(cloneList);
    setTodoName('');
  }

  function handleDoneTask(index: number) {
    const cloneList = [...todoList];
    
    if(cloneList[index].done !== true) 
      cloneList[index].done = true;
    else 
      cloneList[index].done = false;

    setTodoList(cloneList);
  }

  return(
  <Container>

    <ContainerSearch>
      <InputPrimary 
        id="createTask" 
        styleInput={{background: 'transparent'}}
        styleContainer={{maxWidth: '300px', width: '100%'}}
        placeholder="Adicione sua tarefa"
        value={todoName}
        onChange={(event) => setTodoName(event.target.value)}
        onKeyDown={handleAddTask}
        iconLeft={<BiTask/>}
      />
    </ContainerSearch>

    <ContainerTasksList>
      {todoList?.map((todo: TodoList, index: number) => (
      <>
        <div key={index}>
          <input type="checkbox" onChange={() => handleDoneTask(index)}/>  
          {todo.title} - {todo.done ? 'Feita' : 'Em andamento'}
        </div>
      </>
      ))}
    </ContainerTasksList>

  </Container>
  )
}