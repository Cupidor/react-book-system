import React, { PureComponent } from 'react';
import { Space, Typography, message, Modal, Table, Tag, Popconfirm, Rate, Button } from 'antd';
import global from '@/global.less';
import Footer from '@/components/Footer';
import { queryBookByBookTagIds, deleteBook } from '@/services/book';
import { queryAllBookTag } from '@/services/bookTag';
import { queryUser } from '@/services/user';
import { numberDateFormat } from '@/utils/utils';
import { WordCloud } from '@ant-design/charts';

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
      myTags: [],
      data: [],
      selectedTags: [],
    };
  }

  componentDidMount() {
    //this.getAdminDetail();
    this.getAllBookTag();
    window.onresize = () => {
      this.setState({
        show: false,
      });
    };
  }

  // 获取登录的用户信息
  getAdminDetail = async () => {
    let res = await queryUser(localStorage.getItem('userId'));
    console.log(res);
    if (res.code === '0000') {
      this.setState(
        {
          myTags: res.result.book_tags,
        },
        () => {
          const { myTags } = this.state;
          if (myTags.length === 0) {
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
      this.setState({
        data: res.result,
      });
    } else {
      message.error(res.message);
    }
  };

  // 获取所有书籍
  getAllBooks = async () => {
    const { pageSize, currentPage, myTags } = this.state;
    this.setState({
      tableLoading: true,
    });
    let bookTagIds = [];
    for (let item of myTags) {
      bookTagIds.push(item.id);
    }
    let res = await queryBookByBookTagIds(
      bookTagIds.join(),
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

  // 监听图表点击
  listen = (plot) => {
    plot.chart.on('plot:click', (evt) => {
      const { x, y } = evt;
      let { selectedTags } = this.state;
      let res = plot.chart.getTooltipItems({ x, y });
      if (res.length !== 0 && selectedTags.length < 3) {
        if (res[0].data && res[0].data.datum) {
          this.setState({
            show: false,
          });
          let isExist = false;
          for (let item of selectedTags) {
            if (item.id === res[0].data.datum.id) {
              isExist = true;
            }
          }
          if (isExist === false) {
            selectedTags.push(res[0].data.datum);
            this.setState({
              selectedTags: selectedTags,
              show: true,
            });
          }
        }
      }
    });
  };

  // 删除标签
  closeTag = (id) => {
    let { selectedTags } = this.state;
    for (let i = 0; i < selectedTags.length; i++) {
      if (selectedTags[i].id === id) {
        selectedTags.splice(i, 1);
        i--;
      }
    }
    this.setState({
      selectedTags,
    });
  };

  // 获取数据
  getBook = () => {
    const { selectedTags } = this.state;
    if (selectedTags.length === 0) {
      message.warning('请选择书籍标签');
      return;
    }
    this.setState(
      {
        myTags: selectedTags,
      },
      () => {
        this.getAllBooks();
      },
    );
  };

  // 清除选择
  clear = () => {
    this.setState({
      myTags: [],
    });
  };

  render() {
    const { books, myTags, data, selectedTags } = this.state;
    const config = {
      data: data,
      autoFit: true,
      wordField: 'tag_name',
      weightField: 'book_num',
      colorField: 'tag_name',
      wordStyle: {
        fontFamily: 'Verdana',
        fontSize: [8, 32],
        rotation: 0,
      },
      random: function random() {
        return 0.5;
      },
      onReady: (plot) => {
        this.listen(plot);
      },
    };
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
            <Space>
              {myTags.length !== 0 && <Button onClick={this.clear}>返回</Button>}
              <div className={global.MyTitle}>
                <Text style={{ fontSize: 16 }}>书籍推荐</Text>
              </div>
              {/*<Search placeholder="请输入用户名或姓名" onSearch={this.onSearch} enterButton />*/}
            </Space>
          </div>
          <div className={global.MyBody}>
            <div className={global.MyBodyRight}>
              {myTags.length === 0 ? (
                <div style={{ width: '100%', height: '100%', textAlign: 'center', padding: 50 }}>
                  <Space direction="vertical" size="large">
                    <Text style={{ fontSize: 16 }}>
                      选择感兴趣的类型（最多选3个）：
                      {selectedTags.map((item) => {
                        return (
                          <Tag
                            key={item.id}
                            color="orange"
                            closable
                            onClose={this.closeTag.bind(this, item.id)}
                          >
                            {item.tag_name}
                          </Tag>
                        );
                      })}
                    </Text>
                    <Button type="primary" onClick={this.getBook}>
                      获取书籍
                    </Button>
                  </Space>
                  <WordCloud {...config} />
                </div>
              ) : (
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
              )}
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
