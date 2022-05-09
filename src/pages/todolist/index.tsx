import Head from "next/head";
import DefaultGridLayout from "../../containers/Layouts/DefaultGridLayout";

import { TodoList } from "../../components/TodoList";
import { Box } from "../../styles/pageStyles/todolist/styles";

export default function PageTodoList() {
  return (
    <>
      <Head>
        <title>Lista de tarefas | Customer Controll</title>
      </Head>
      
      <DefaultGridLayout headerTitle="Lista de Tarefas">

        <Box>
          <TodoList />
        </Box>

      </DefaultGridLayout>
    </>
  )
}