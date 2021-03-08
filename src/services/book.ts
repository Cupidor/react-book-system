import { request } from 'umi';
import api from '@/utils/config';

// 条件查询书籍，支持后端分页
export async function queryBookByCondition(
  limit: number,
  offset: number,
  sortColumnName: string,
  sortOrderType: string,
) {
  return request(
    `${api.bookUrl}query_by_condition?limit=${limit}&offset=${offset}&sortColumnName=${sortColumnName}&sortOrderType=${sortOrderType}`,
  );
}

// 删除书籍
export async function deleteBook(params: any) {
  return request(`${api.bookUrl}delete_book`, {
    method: 'DELETE',
    requestType: 'form',
    data: params,
  });
}

// 条件查询书籍，支持后端分页
export async function queryBookByBookTagIds(
  bookTagIds: string,
  limit: number,
  offset: number,
  sortColumnName: string,
  sortOrderType: string,
) {
  return request(
    `${api.bookUrl}query_by_condition?bookTagIds=${bookTagIds}&limit=${limit}&offset=${offset}&sortColumnName=${sortColumnName}&sortOrderType=${sortOrderType}`,
  );
}
