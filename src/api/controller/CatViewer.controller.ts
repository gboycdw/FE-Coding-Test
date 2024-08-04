import { api_ } from "@api";

export const getCatImages = async ({ limit, page }: { limit: number; page?: number }) => {
  try {
    return await api_.get(`/search?limit=${limit}${page ? `&page=${page}` : ""}`);
  } catch (e) {
    throw new Error("이미지 로딩에 실패하였습니다");
  }
};
