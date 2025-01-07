"use client";

import { useParams, useRouter } from "next/navigation";
import imgNullIcon from "../../../public/imgs/img-null.svg";
import ActionBtn from "../../../components/action-btn";
import Image from "next/image";
import EditImgBtn from "../../../components/edit-img-btn";
import TodoItemDetail from "../../../components/todo-item-detail";
import {
  deleteItem,
  getItem,
  updateItem,
} from "../../../services/apis/itemApi";
import { useEffect, useState } from "react";
import { Item } from "../../../types/ItemType";
import { HOME_PAGE_ROUTE } from "../../../constants/routes";

const Detail = () => {
  const params = useParams();
  const id = Number(params.id);

  const [item, setItem] = useState<Item>();
  const [memo, setMemo] = useState<string>("");
  const router = useRouter();

  const handleDelete = () => {
    // 삭제 확인 모달 표시
    if (confirm(`"${item?.name}" 할 일을 삭제하시겠습니까?`)) {
      deleteItem(id)
        .then(() => {
          // 아이템 삭제 후 홈으로 이동
          alert("삭제 완료하였습니다.");
          router.push(HOME_PAGE_ROUTE);
        })
        .catch(() => {
          alert("삭제에 실패하였습니다.");
        });
    }
  };

  const handleClickCheckBtn = () => {
    // 현재 아이템에서 complete 변경 => 낙관적 업데이트
    setItem((item) => {
      return { ...item, isCompleted: !item?.isCompleted } as Item;
    });

    // patch API 호출
    updateItem(id, { isCompleted: !item?.isCompleted }).catch(() => {
      alert("할 일 상태 변경에 실패하였습니다.");
      location.reload();
    });
  };

  useEffect(() => {
    // 상세정보 API 호출
    getItem(id).then((data) => {
      setItem(data);
      setMemo(data.memo);
    });
  }, []);

  return (
    <div className="py-[16px] tablet:py-[24px] pc:w-[1200px] pc:px-[120px]">
      {/* Todo 타이틀 섹션*/}
      <section className="mb-[17px] tablet:mb-[24px]">
        <TodoItemDetail
          onClick={handleClickCheckBtn}
          text={item?.name}
          isDone={item?.isCompleted}
        />
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
          <span className="absolute left-[50%] right-[50%] top-[24px] mx-auto w-fit translate-x-[-50%] transform font-nanumsquare-bold text-16px font-extrabold text-amber-800">
            Memo
          </span>
          <textarea
            value={memo || ""}
            onChange={(e) => {
              setMemo(e.currentTarget.value);
            }}
            className="memo-scroll-bar m-[16px] mt-[58px] h-[229px] w-full resize-none bg-transparent pr-[12px] text-center font-nanumsquare-regular text-16px outline-none"
          />
        </div>
      </section>

      {/* 버튼 섹션*/}
      <section className="flex items-center justify-center gap-[7px] tablet:gap-[16px] pc:justify-end">
        <ActionBtn type="edit" active={true} onClick={() => {}} />
        <ActionBtn type="delete" onClick={handleDelete} />
      </section>
    </div>
  );
};

export default Detail;
