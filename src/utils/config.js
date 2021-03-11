const config = {};
const version = 'prod';
if (version === 'prod') {
  config.host = 'http://127.0.0.1:8011';
} else if (version === 'test') {
  config.host = 'http://wcxweb.51vip.biz';
}
// 系统登录接口
config.loginUrl = config.host + '/login/';
// 用户资源
config.userUrl = config.host + '/user/';
// 爬虫日志
config.scrapyLogUrl = config.host + '/scrapy_log/';
// 图书
config.bookUrl = config.host + '/book/';
// 图书
config.bookTagUrl = config.host + '/book_tag/';
export default config;
