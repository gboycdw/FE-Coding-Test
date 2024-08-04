import { api_ } from "@api";

export const getCatImages = async ({ limit, page }: { limit: number; page?: number }) => {
  return await api_.get(`/search?limit=${limit}${page ? `&page=${page}` : ""}`);
};
