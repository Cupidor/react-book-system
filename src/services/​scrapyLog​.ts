import { request } from 'umi';
import api from '@/utils/config';

// 条件查询爬虫日志，支持后端分页
export async function queryLogByCondition(
  limit: number,
  offset: number,
  sortColumnName: string,
  sortOrderType: string, 
) {
  return request(
    `${api.scrapyLogUrl}query_by_condition?limit=${limit}&offset=${offset}&sortColumnName=${sortColumnName}&sortOrderType=${sortOrderType}`,
  );
}
