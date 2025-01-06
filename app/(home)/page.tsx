"use client";

import AddInput from "../../components/add-input";
import { getItems, GetItemsResponse } from "../../services/apis/itemApi";
import TodoList from "./_components/todo-list";
import { useEffect, useState } from "react";

const Home = () => {
  const [todoItems, setTodoItems] = useState<GetItemsResponse[]>([]);
  const [doneItems, setDoneItems] = useState<GetItemsResponse[]>([]);

  useEffect(() => {
    getItems().then((items) => {
      const _todoItems: GetItemsResponse[] = [];
      const _doneItems: GetItemsResponse[] = [];

      // todo와 done 분리
      items.map((item) =>
        !item.isCompleted ? _todoItems.push(item) : _doneItems.push(item),
      );

      setTodoItems(_todoItems);
      setDoneItems(_doneItems);
    });
  }, []);

  return (
    <div className="py-[16px] tablet:py-[24px]">
      {/* 할 일 추가 섹션 */}
      <section className="mb-[24px] flex gap-[8px] tablet:mb-[40px] tablet:gap-[16px]">
        <AddInput />
      </section>

      {/* 할 일 리스트 섹션 */}
      <section className="flex flex-col gap-[48px] pc:flex-row pc:gap-[24px]">
        <TodoList items={todoItems} type="todo" /> {/* Todo List*/}
        <TodoList items={doneItems} type="done" /> {/* Done List*/}
      </section>
    </div>
  );
};

export default Home;
