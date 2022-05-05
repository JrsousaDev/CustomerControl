import { TodoList } from "../../components/TodoList";
import DefaultGridLayout from "../../containers/Layouts/DefaultGridLayout";

import { Box } from "../../styles/pageStyles/todolist/styles";

export default function PageTodoList() {
  return(
    <DefaultGridLayout headerTitle="Lista de Tarefas">
      
      <Box>
        <TodoList />
      </Box>

    </DefaultGridLayout>
  )
}