import { GetItemsResponse } from "../../../services/apis/itemApi";
import Image from "next/image";
import todoLabel from "../../../public/imgs/todo-label.svg";
import doneLabel from "../../../public/imgs/done-label.svg";
import todoNullLarge from "../../../public/imgs/todo-null-large.svg";
import doneNullLarge from "../../../public/imgs/done-null-large.svg";
import todoNullSmall from "../../../public/imgs/todo-null-small.svg";
import doneNullSmall from "../../../public/imgs/done-null-small.svg";
import TodoItem from "../../../components/todo-item";

const LIST_TYPE = {
  todo: {
    labelImg: todoLabel,
    NullImgSmall: todoNullSmall,
    NullImgLarge: todoNullLarge,
    nullText: ["할 일이 없어요.", "TODO를 새롭게 추가해주세요!"],
  },
  done: {
    labelImg: doneLabel,
    NullImgSmall: doneNullSmall,
    NullImgLarge: doneNullLarge,
    nullText: ["아직 다 한 일이 없어요.", "해야 할 일을 체크해보세요!"],
  },
};

interface TodoListProps {
  items: GetItemsResponse[];
  type: "todo" | "done";
}

// 타입에 따라 Todo List를 렌더링하는 컴포넌트
const TodoList = ({ items, type }: TodoListProps) => {
  // Todo 아이템이 없는 경우 데이터 없음 이미지 렌더링
  if (!items.length)
    return (
      <div className="grow">
        <Image src={LIST_TYPE[type].labelImg} alt={`${type}Label`} />
        <div className="flex flex-col items-center gap-[24px] pc:mt-[64px]">
          <Image
            className="tablet:hidden"
            src={LIST_TYPE[type].NullImgSmall}
            alt={`${type}NullSmall`}
          />
          <Image
            className="hidden tablet:block"
            src={LIST_TYPE[type].NullImgLarge}
            alt={`${type}NullLarge`}
          />

          {/* Item이 없는 경우 텍스트 */}
          <p className="flex flex-col items-center font-nanumsquare-bold text-16px text-slate-400">
            {LIST_TYPE[type].nullText.map((text, idx) => (
              <span key={idx}>{text}</span>
            ))}
          </p>
        </div>
      </div>
    );

  // Todo 아이템이 있는 경우 리스트 렌더링
  return (
    <div className="grow">
      <Image src={LIST_TYPE[type].labelImg} alt={`${type}Label`} />
      <ul className="mt-[16px] flex grow flex-col gap-[16px]">
        {items.map((item) => (
          <TodoItem
            key={item.id}
            itemId={item.id}
            isDone={item.isCompleted}
            text={item.name}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;