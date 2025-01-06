import { useState, ChangeEvent } from "react";
import ActionBtn from "./action-btn";
import { createItem } from "../services/apis/itemApi";

const AddInput = () => {
  const [newTodo, setNewTodo] = useState("");

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.currentTarget.value);
  };

  const handleSubmit = (): void => {
    if (newTodo.trim()) {
      createItem(newTodo);
      setNewTodo("");
    }
  };

  return (
    <form className="mb-[24px] flex grow gap-[8px] tablet:mb-[40px] tablet:gap-[16px]">
      <input
        className="h-[52.5px] w-full rounded-[24px] border-[2px] border-slate-900 p-[24px_17px] font-nanumsquare-regular text-16px shadow-2px-slate-900 outline-none placeholder:text-slate-500"
        type="text"
        placeholder="할 일을 입력해주세요"
        value={newTodo}
        onChange={handleChangeInput}
      />
      <ActionBtn
        onClick={handleSubmit}
        type="add"
        active={Boolean(newTodo.length)} // input에 입력값이 있을 경우 버튼 활성화
      />
    </form>
  );
};

export default AddInput;
