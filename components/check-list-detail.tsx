import Image from "next/image";
import todoCircle from "../public/icons/todo-circle.svg";
import doneCircle from "../public/icons/done-circle.svg";

interface CheckListDetailProps {
  isDone: boolean;
  text: string;
}

const CheckListDetail = ({ isDone, text }: CheckListDetailProps) => {
  // 완료 여부에 따른 배경색 적용
  const bgStyle = isDone ? "bg-violet-200" : "bg-white";

  // 완료 여부에 따른 아이콘 적용
  const checkIcon = isDone ? doneCircle : todoCircle;

  const handleClickCheckBtn = () => {
    return !isDone;
  };

  return (
    <div
      className={`${bgStyle} flex h-[64px] items-center justify-center gap-[16px] rounded-[24px] border-2 border-slate-900`}
    >
      <Image
        className="cursor-pointer"
        src={checkIcon}
        alt={"check or not"}
        onClick={handleClickCheckBtn}
      />
      <span className="font-nanumsquare-bold text-20px underline">{text}</span>
    </div>
  );
};

export default CheckListDetail;
