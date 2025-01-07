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
import { useEffect, useRef, useState } from "react";
import { Item } from "../../../types/ItemType";
import { HOME_PAGE_ROUTE } from "../../../constants/routes";
import { uploadImage } from "../../../services/apis/imageApi";

const Detail = () => {
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);

  const [item, setItem] = useState<Item>();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    const file = e.target.files?.[0];
    if (file) {
      // 파일 이름 영어로만 이루어져 있는지 확인
      const isEnglishOnly = /^[a-zA-Z.]+$/.test(file.name);
      if (!isEnglishOnly) {
        alert("파일 이름은 영어로만 구성되어야 합니다.");
        return;
      }
      // 크기 제한 (5MB 이하 확인)
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기가 5MB를 초과합니다.");
        return;
      }

      // 파일을 폼데이터 형식으로 변환
      const formData = new FormData();
      formData.append("image", file);

      // 이미지 링크 받아오기
      const uploadedImageUrl = await uploadImage(formData);

      // 아이템 업데이트
      setItem((item) => ({ ...item, imageUrl: uploadedImageUrl }) as Item);
    }
  };

  useEffect(() => {
    // 상세정보 API 호출
    getItem(id).then((data) => {
      setItem(data);
    });
  }, []);

  return (
    <div className="mx-auto min-h-[calc(100vh-60px)] bg-white px-[16px] py-[16px] tablet:px-[24px] tablet:py-[24px] pc:w-[1200px] pc:px-[120px]">
      {/* Todo 이름 섹션*/}
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
        <div
          className={`relative flex h-[311px] w-full shrink-0 items-center justify-center rounded-[24px] border-2 border-dashed border-slate-300 bg-slate-50 pc:w-[384px]`}
        >
          {/* 이미지 존재 여부에 따라 조건부 렌더링*/}
          {item?.imageUrl ? (
            <Image
              className="rounded-[24px] object-cover"
              src={item?.imageUrl}
              alt={item?.imageUrl}
              fill
            />
          ) : (
            <Image src={imgNullIcon} alt="imgNullIcon" />
          )}

          <EditImgBtn
            className="absolute bottom-[16px] right-[16px]"
            onClick={() => fileInputRef.current!.click()}
            type={item?.imageUrl ? "edit" : "add"}
          />

          {/* 이미지 업로드 input태그 숨기기 */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
        <div
          className={`relative flex h-[311px] w-full items-center justify-center rounded-[24px] bg-[url('/imgs/memo.svg')]`}
        >
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
