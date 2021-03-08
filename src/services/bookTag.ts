import { request } from 'umi';
import api from '@/utils/config';

// 查询所有书籍标签
export async function queryAllBookTag() {
  return request(`${api.bookTagUrl}query_all_book_tag`);
}
