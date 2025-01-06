import Image from "next/image";
import todoCircle from "../public/icons/todo-circle.svg";
import doneCircle from "../public/icons/done-circle.svg";
import { TODO_DETAIL_ROUTE } from "../constants/routes";
import Link from "next/link";

// 완료 여부에 따른 스타일 및 아이콘 정의
const DONE_STATUS_STYLES = {
  done: {
    bgStyle: "bg-violet-200",
    textStyle: "line-through",
    checkIcon: doneCircle,
  },
  notDone: {
    bgStyle: "bg-white",
    textStyle: "",
    checkIcon: todoCircle,
  },
};

interface CheckListProps {
  isDone: boolean;
  text: string;
  itemId: number;
}

const CheckList = ({ isDone, text, itemId }: CheckListProps) => {
  const style = isDone ? DONE_STATUS_STYLES.done : DONE_STATUS_STYLES.notDone;

  const handleClickCheckBtn = () => {};

  return (
    <div
      className={`${style.bgStyle} flex h-[50px] items-center gap-[16px] rounded-[27px] border-2 border-slate-900 px-[12px]`}
    >
      <Image
        className="cursor-pointer"
        src={style.checkIcon}
        alt={"check or not"}
        onClick={handleClickCheckBtn}
      />
      <Link
        href={`${TODO_DETAIL_ROUTE}/${itemId}`}
        className={`w-full font-nanumsquare-regular text-16px ${style.textStyle}`}
      >
        {text}
      </Link>
    </div>
  );
};

export default CheckList;
