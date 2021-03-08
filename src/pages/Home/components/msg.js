import React, { PureComponent } from 'react';
import { Row, Col, Typography, Space, Select, List, Avatar } from 'antd';
import styles from '../home.less';
const { Title, Text } = Typography;
const { Option } = Select;

class Msg extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '全部',
    };
  }

  componentDidMount() {}

  handleChange = (value) => {
    this.setState({
      value,
    });
  };

  render() {
    const { value } = this.state;
    const data = [
      {
        title: '2021-01-29 13:22:00',
        desc: 'admin上传了一条巡检采集记录，请及时查看！',
      },
      {
        title: '2021-01-27 15:22:00',
        desc: 'admin上传了一条巡检采集记录，请及时查看！',
      },
      {
        title: '2021-01-10 13:10:00',
        desc: '距离下一次生产设施专项评估上传还有7天，请及时上传！',
      },
      {
        title: '2021-01-10 13:10:00',
        desc: '距离下一次生产设施专项评估上传还有7天，请及时上传！',
      },
      {
        title: '2021-01-27 15:22:00',
        desc: 'admin上传了一条巡检采集记录，请及时查看！',
      },
      {
        title: '2021-01-10 13:10:00',
        desc: '距离下一次生产设施专项评估上传还有7天，请及时上传！',
      },
      {
        title: '2021-01-10 13:10:00',
        desc: '距离下一次生产设施专项评估上传还有7天，请及时上传！',
      },
    ];
    return (
      <div className={styles.mapContainer}>
        <div className={styles.msgHeader}>
          <Title level={5} className={styles.msgTitle}>
            消息通知
          </Title>
          <Text style={{ fontSize: 16 }}>
            未读（<span style={{ color: '#FF9900' }}>6</span>）
          </Text>
        </div>
        <div className={styles.msgMain}>
          <List
            size="small"
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={require('../../../assets/image/icon_msg.png')} />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={item.desc}
                />
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default Msg;
