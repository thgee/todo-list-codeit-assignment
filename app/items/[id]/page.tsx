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
  UpdateItemProps,
} from "../../../services/apis/itemApi";
import { useEffect, useState } from "react";
import { Item } from "../../../types/ItemType";
import { HOME_PAGE_ROUTE } from "../../../constants/routes";

const Detail = () => {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [item, setItem] = useState<Item>();
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEdit = () => {
    // 현재 아이템에서 API 호출에 필요한 속성만 추출
    const { imageUrl, isCompleted, memo, name } = item!;
    const updatedItem: UpdateItemProps = {
      imageUrl: imageUrl || "",
      memo: memo || "",
      isCompleted,
      name,
    };

    // Update API 호출
    updateItem(id, updatedItem)
      .then(() => {
        alert("수정 완료하였습니다.");
        router.push(HOME_PAGE_ROUTE);
      })
      .catch(() => {
        alert("수정에 실패하였습니다.");
      });
  };

  // 할 일 상태 변경
  const handleClickCheckBtn = () => {
    setIsEditing(true);
    setItem((item) => {
      return { ...item, isCompleted: !item?.isCompleted } as Item;
    });
  };

  useEffect(() => {
    // 상세정보 API 호출
    getItem(id).then((data) => {
      setItem(data);
    });
  }, []);

  return (
    <div className="py-[16px] tablet:py-[24px] pc:w-[1200px] pc:px-[120px]">
      {/* Todo 타이틀 섹션*/}
      <section className="mb-[17px] tablet:mb-[24px]">
        <TodoItemDetail
          setItem={setItem}
          onClick={handleClickCheckBtn}
          name={item?.name}
          isDone={item?.isCompleted}
          setIsEditing={setIsEditing}
        />
      </section>

      {/* 이미지 & 메모 섹션 */}
      <section className="mb-[24px] flex flex-col items-center justify-center gap-[15px] tablet:gap-[24px] pc:flex-row">
        <div className="relative flex h-[311px] w-full shrink-0 items-center justify-center rounded-[24px] border-2 border-dashed border-slate-300 bg-slate-50 pc:w-[384px]">
          <Image src={imgNullIcon} alt="imgNullIcon" />
          <EditImgBtn
            className="absolute bottom-[16px] right-[16px]"
            onClick={handleUploadImgBtn}
            type="add"
          />
        </div>
        <div className="relative flex h-[311px] w-full items-center justify-center rounded-[24px] bg-[url('/imgs/memo.svg')]">
          <span className="absolute left-[50%] right-[50%] top-[24px] mx-auto w-fit translate-x-[-50%] transform font-nanumsquare-bold text-16px font-extrabold text-amber-800">
            Memo
          </span>
          <textarea
            value={item?.memo || ""}
            onChange={(e) => {
              setItem((item) => {
                setIsEditing(true);
                return { ...item, memo: e.target.value } as Item;
              });
            }}
            className="memo-scroll-bar m-[16px] mt-[58px] h-[229px] w-full resize-none bg-transparent pr-[12px] text-center font-nanumsquare-regular text-16px outline-none"
          />
        </div>
      </section>

      {/* 버튼 섹션*/}
      <section className="flex items-center justify-center gap-[7px] tablet:gap-[16px] pc:justify-end">
        <ActionBtn type="edit" active={isEditing} onClick={handleEdit} />
        <ActionBtn type="delete" onClick={handleDelete} />
      </section>
    </div>
  );
};

export default Detail;
