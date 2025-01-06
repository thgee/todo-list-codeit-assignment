import ActionBtn from "./action-btn";

const AddInput = () => {
  return (
    <section className="mb-[24px] flex grow gap-[8px] tablet:mb-[40px] tablet:gap-[16px]">
      <input
        type="text"
        placeholder="할 일을 입력해주세요"
        className="h-[52.5px] w-full rounded-[24px] border-[2px] border-slate-900 p-[24px_17px] font-nanumsquare-regular text-16px shadow-2px-slate-900 outline-none placeholder:text-slate-500"
      />

      <ActionBtn onClick={() => {}} type="add" />
    </section>
  );
};

export default AddInput;
