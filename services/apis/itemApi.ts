import { Item } from "../../types/ItemType";
import axiosInstance from "../axiosInstance";

// 항목 등록
interface CreateItemProps {
  name: string;
}

export const createItem = async (data: CreateItemProps) => {
  const response = await axiosInstance.post<Item>(`/items`, data);
  return response.data;
};

// 항목 목록 조회
export interface GetItemsResponse {
  name: string;
  id: number;
  isCompleted: boolean;
}

export const getItems = async () => {
  const response = await axiosInstance.get<GetItemsResponse[]>(`/items`);
  return response.data;
};

// 항목 상세 조회
export const getItem = async (itemId: number) => {
  const response = await axiosInstance.get<Item>(`/items/${itemId}`);
  return response.data;
};

// 항목 수정 (이미지 URL로 변환하는 과정 필요)
interface UpdateItemProps {
  name?: string;
  memo?: string;
  imageUrl?: string;
  isCompleted?: boolean;
}

export const updateItem = async (itemId: number, data: UpdateItemProps) => {
  const response = await axiosInstance.patch<Item>(`/items/${itemId}`, data);
  return response.data;
};

// 항목 삭제
interface DeleteItemResponse {
  message: string;
}
export const deleteItem = async (itemId: number) => {
  const response = await axiosInstance.delete<DeleteItemResponse>(
    `/items/${itemId}`,
  );
  return response.data;
};
