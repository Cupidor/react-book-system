import React, { PureComponent } from 'react';
import { Space, Typography, message, Modal, Table, Tag, Popconfirm, Rate } from 'antd';
import global from '@/global.less';
import Footer from '@/components/Footer';
import { queryBookByBookTagIds, deleteBook } from '@/services/book';
import { queryAllBookTag } from '@/services/bookTag';
import { queryAdminDetail, queryUser } from '@/services/user';
import { numberDateFormat } from '@/utils/utils';

const { Text, Title } = Typography;
const { confirm } = Modal;

class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      tableLoading: false,
      book_tags: [],
    };
  }

  componentDidMount() {
    this.getAllBooks();
    this.getAdminDetail();
    //this.getAllBookTag();
  }

  // 获取登录的用户信息
  getAdminDetail = async () => {
    let res = await queryUser(localStorage.getItem('userId'));
    console.log(res);
    if (res.code === '0000') {
      this.setState(
        {
          book_tags: res.result.book_tags,
        },
        () => {
          const { book_tags } = this.state;
          console.log(book_tags);
          if (book_tags.length === 0) {
            this.getAllBookTag();
          } else {
            this.getAllBooks();
          }
        },
      );
    } else {
      message.error(res.message);
    }
  };

  // 获取所有书籍标签
  getAllBookTag = async () => {
    let res = await queryAllBookTag();
    if (res.code === '0000') {
      console.log(res);
    } else {
      message.error(res.message);
    }
  };

  // 获取所有书籍
  getAllBooks = async () => {
    const { pageSize, currentPage, book_tags } = this.state;
    this.setState({
      tableLoading: true,
    });
    let bookTagIds = [];
    for (let item of book_tags) {
      bookTagIds.push(item.id);
    }
    let res = await queryBookByBookTagIds(
      bookTagIds,
      pageSize,
      pageSize * (currentPage - 1),
      'create_time',
      'desc',
    );
    if (res.code === '0000') {
      let books = [];
      let n = 0;
      for (let item of res.result) {
        let obj = Object.create(null);
        //obj.key = item.id;
        obj.key = n;
        obj.bookId = item.id;
        obj.createTime = item.create_time;
        obj.latest_update_time = item.latest_update_time;
        obj.name = item.name;
        obj.db_code = item.db_code;
        obj.content = item.content;
        obj.author = item.author;
        obj.bookTags = item.book_tags;
        obj.score = item.score;
        books.push(obj);
        n++;
      }
      this.setState({
        books,
        total: res.total_num,
        tableLoading: false,
      });
    } else {
      message.error(res.message);
    }
  };

  // 分页页面跳转
  onPageChange = (page, pageSize) => {
    this.setState(
      {
        currentPage: page,
      },
      () => {
        this.getAllBooks();
      },
    );
  };

  // 删除书籍
  deleteBook = async (id) => {
    let res = await deleteBook({ bookId: id });
    if (res.code === '0000') {
      message.success('删除书籍成功');
      this.getAllBooks();
    } else {
      message.error(res.message);
    }
  };

  // 查看简介
  showDetail = (content) => {
    Modal.success({
      title: '内容简介',
      content: content,
    });
  };

  render() {
    const { books } = this.state;
    const columns = [
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text) => <span>{numberDateFormat(text, 'yyyy-MM-dd HH:mm')}</span>,
      },
      {
        title: '书名',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => (
          <a href={record.db_code} target="_blank">
            {text}
          </a>
        ),
      },
      {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
      },
      /*{
        title: '简介',
        dataIndex: 'content',
        key: 'content',
      },*/
      {
        title: '标签',
        key: 'bookTags',
        dataIndex: 'bookTags',
        render: (text) => (
          <div>
            {text.map((item, index) => {
              return (
                <Tag key={index} color={'geekblue'}>
                  {item.tag_name}
                </Tag>
              );
            })}
          </div>
        ),
      },
      {
        title: '评分',
        key: 'score',
        dataIndex: 'score',
        render: (text) => (
          <span style={{ display: 'flex', alignItems: 'flex-end' }}>
            <Rate allowHalf disabled tooltips={text} defaultValue={text / 2} />
            <Text type="warning" style={{ fontSize: 18, marginLeft: 15 }}>
              {text}
            </Text>
          </span>
        ),
      },

      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a style={{ color: 'green' }} onClick={this.showDetail.bind(this, record.content)}>
              查看简介
            </a>
            {record.is_manager !== true && (
              <Popconfirm
                title="确定删除该书籍?"
                onConfirm={this.deleteBook.bind(this, record.bookId)}
              >
                <a style={{ color: 'red' }}>删除</a>
              </Popconfirm>
            )}
          </Space>
        ),
      },
    ];
    return (
      <div className={global.MyMain}>
        <div className={global.MyContent}>
          <div className={global.MyHeader}>
            <div className={global.MyTitle}>
              <Text style={{ fontSize: 16 }}>书籍推荐</Text>
            </div>
            <Space>
              {/*<Search placeholder="请输入用户名或姓名" onSearch={this.onSearch} enterButton />*/}
            </Space>
          </div>
          <div className={global.MyBody}>
            <div className={global.MyBodyRight}>
              <Table
                loading={this.state.tableLoading}
                columns={columns}
                dataSource={books}
                pagination={{
                  hideOnSinglePage: true,
                  showQuickJumper: true,
                  showSizeChanger: false,
                  current: this.state.currentPage,
                  pageSize: this.state.pageSize,
                  total: this.state.total,
                  onChange: (page, pageSize) => this.onPageChange(page, pageSize),
                }}
              />
            </div>
          </div>
        </div>
        <div className={global.MyFooter}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Index;
