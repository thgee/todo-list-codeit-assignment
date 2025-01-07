"use client";

import { useParams } from "next/navigation";
import imgNullIcon from "../../../public/imgs/img-null.svg";
import memoImg from "../../../public/imgs/memo.svg";

import ActionBtn from "../../../components/action-btn";
import Image from "next/image";
import EditImgBtn from "../../../components/edit-img-btn";
import TodoItemDetail from "../../../components/todo-item-detail";

const Detail = () => {
  const params = useParams();
  console.log(params.id);

  return (
    <div className="py-[16px] tablet:py-[24px] pc:px-[120px]">
      {/* Todo 타이틀 섹션*/}
      <section className="mb-[17px] tablet:mb-[24px]">
        <TodoItemDetail text="비타민 챙겨 먹기" isDone={true} />
      </section>

      {/* 이미지 & 메모 섹션 */}
      <section className="mb-[24px] flex flex-col items-center justify-center gap-[15px] tablet:gap-[24px] pc:flex-row">
        <div className="relative flex h-[311px] w-full shrink-0 items-center justify-center rounded-[24px] border-2 border-dashed border-slate-300 bg-slate-50 pc:w-[384px]">
          <Image src={imgNullIcon} alt="imgNullIcon" />
          <EditImgBtn
            className="absolute bottom-[16px] right-[16px]"
            onClick={() => {}}
            type="add"
          />
        </div>
        <div className="relative flex h-[311px] w-full items-center justify-center rounded-[24px] bg-[url('/imgs/memo.svg')]">
          <h1 className="absolute left-[50%] right-[50%] top-[24px] mx-auto w-fit translate-x-[-50%] transform font-nanumsquare-bold text-16px font-extrabold text-amber-800">
            Memo
          </h1>
          <input
            type="text"
            className="m-[16px] mt-[58px] h-[229px] w-full bg-transparent text-center font-nanumsquare-regular text-16px outline-none [border:1px_solid_black]"
          />
        </div>
      </section>

      {/* 버튼 섹션*/}
      <section className="flex items-center justify-center gap-[7px] tablet:gap-[16px] pc:justify-end">
        <ActionBtn type="edit" active={true} onClick={() => {}} />
        <ActionBtn type="delete" onClick={() => {}} />
      </section>
    </div>
  );
};

export default Detail;
