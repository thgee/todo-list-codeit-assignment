"use client";

import Image from "next/image";
import todoLabel from "../../public/imgs/todo-label.svg";
import doneLabel from "../../public/imgs/done-label.svg";
import CheckList from "../../components/check-list";
import AddInput from "../../components/add-input";
import ActionBtn from "../../components/action-btn";

const Home = () => {
  return (
    <div className="py-[16px] tablet:py-[24px]">
      {/* 할 일 추가 섹션 */}
      <section className="mb-[24px] flex gap-[8px] tablet:mb-[40px] tablet:gap-[16px]">
        <AddInput />
        <ActionBtn onClick={() => {}} type="add" />
      </section>

      {/* 할 일 리스트 섹션 */}
      <section className="flex flex-col gap-[48px] pc:flex-row pc:gap-[24px]">
        {/* Todo List*/}
        <div className="flex grow flex-col gap-[16px]">
          <Image src={todoLabel} alt="todoLabel" />
          <CheckList key={1} isDone={true} itemId={1} text="밥 먹기" />
          <CheckList key={1} isDone={true} itemId={1} text="밥 먹기" />
          <CheckList key={1} isDone={true} itemId={1} text="밥 먹기" />
        </div>
        {/* Done List*/}
        <div className="flex grow flex-col gap-[16px]">
          <Image src={doneLabel} alt="doneLabel" />
          <CheckList key={1} isDone={false} itemId={1} text="밥 먹기" />
          <CheckList key={1} isDone={false} itemId={1} text="밥 먹기" />
          <CheckList key={1} isDone={false} itemId={1} text="밥 먹기" />
        </div>
      </section>
    </div>
  );
};

export default Home;
