import React, { PureComponent } from 'react';
import { Row, Descriptions, Typography, Space, Select } from 'antd';
import styles from '../home.less';
import { history } from 'umi';
const { Title } = Typography;

class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '全部',
    };
  }

  render() {
    return (
      <div className={styles.mapContainer}>
        <div className={styles.mapHeader}>
          <Title level={5} className={styles.mapTitle}>
            快捷入口
          </Title>
        </div>
        <div className={styles.mapMain}>
          <Space direction="vertical" size="large">
            <Descriptions title="数据采集" column={2}>
              <Descriptions.Item>
                ♦&nbsp;
                <span
                  className={styles.linkStyle}
                  onClick={() => history.push('/collection/DesignCollection')}
                >
                  设计、建设、验收文件采集
                </span>
              </Descriptions.Item>
              <Descriptions.Item>
                ♦&nbsp;
                <span
                  className={styles.linkStyle}
                  onClick={() => history.push('/collection/OperationCollection')}
                >
                  运行管理体系文件采集
                </span>
              </Descriptions.Item>
              {/*<Descriptions.Item>*/}
              {/*  ♦&nbsp;*/}
              {/*  <span*/}
              {/*    className={styles.linkStyle}*/}
              {/*    onClick={() => history.push('/collection/DeviceOrderCollection')}*/}
              {/*  >*/}
              {/*    设备设施清单基本信息采集*/}
              {/*  </span>*/}
              {/*</Descriptions.Item>*/}
              {/*<Descriptions.Item>*/}
              {/*  ♦&nbsp;*/}
              {/*  <span*/}
              {/*    className={styles.linkStyle}*/}
              {/*    onClick={() => history.push('/collection/EmergencyCollection')}*/}
              {/*  >*/}
              {/*    应急处置基本信息采集*/}
              {/*  </span>*/}
              {/*</Descriptions.Item>*/}
              <Descriptions.Item>
                ♦&nbsp;
                <span
                  className={styles.linkStyle}
                  onClick={() => history.push('/collection/OilAndGasCollection')}
                >
                  运行维护信息采集
                </span>
              </Descriptions.Item>
              <Descriptions.Item>
                ♦&nbsp;
                <span
                  className={styles.linkStyle}
                  onClick={() => history.push('/collection/DailyCollection')}
                >
                  日常巡视检查信息采集
                </span>
              </Descriptions.Item>
              <Descriptions.Item>
                ♦&nbsp;
                <span
                  className={styles.linkStyle}
                  onClick={() => history.push('/collection/MonitorCollection')}
                >
                  人工岛检测数据采集
                </span>
              </Descriptions.Item>
              <Descriptions.Item>
                ♦&nbsp;
                <span
                  className={styles.linkStyle}
                  onClick={() => history.push('/collection/AssessCollection')}
                >
                  人工岛评估报告采集
                </span>
              </Descriptions.Item>
            </Descriptions>
            <Descriptions title="数据管理" column={2}>
              <Descriptions.Item>
                ♦&nbsp;
                <span
                  className={styles.linkStyle}
                  onClick={() => history.push('/management/DesignCollectData')}
                >
                  设计、建设、验收文件管理
                </span>
              </Descriptions.Item>
              <Descriptions.Item>
                ♦&nbsp;
                <span
                  className={styles.linkStyle}
                  onClick={() => history.push('/management/OperationCollectData')}
                >
                  运行管理体系文件管理
                </span>
              </Descriptions.Item>
              {/*<Descriptions.Item>*/}
              {/*  ♦&nbsp;*/}
              {/*  <span*/}
              {/*    className={styles.linkStyle}*/}
              {/*    onClick={() => history.push('/management/DeviceOrderCollectData')}*/}
              {/*  >*/}
              {/*    设备设施清单基本信息管理*/}
              {/*  </span>*/}
              {/*</Descriptions.Item>*/}
              {/*<Descriptions.Item>*/}
              {/*  ♦&nbsp;*/}
              {/*  <span*/}
              {/*    className={styles.linkStyle}*/}
              {/*    onClick={() => history.push('/management/EmergencyCollectData')}*/}
              {/*  >*/}
              {/*    应急处置基本信息管理*/}
              {/*  </span>*/}
              {/*</Descriptions.Item>*/}
              <Descriptions.Item>
                ♦&nbsp;
                <span
                  className={styles.linkStyle}
                  onClick={() => history.push('/management/OilAndGasCollectData')}
                >
                  运行维护信息管理
                </span>
              </Descriptions.Item>
              <Descriptions.Item>
                ♦&nbsp;
                <span
                  className={styles.linkStyle}
                  onClick={() => history.push('/management/DailyCollectData')}
                >
                  日常巡视检查信息管理
                </span>
              </Descriptions.Item>
              <Descriptions.Item>
                ♦&nbsp;
                <span
                  className={styles.linkStyle}
                  onClick={() => history.push('/management/MonitorCollectData')}
                >
                  人工岛检测数据管理
                </span>
              </Descriptions.Item>
              <Descriptions.Item>
                ♦&nbsp;
                <span
                  className={styles.linkStyle}
                  onClick={() => history.push('/management/AssessCollectData')}
                >
                  人工岛评估报告管理
                </span>
              </Descriptions.Item>
            </Descriptions>
            <Descriptions title="数据应用" column={2}>
              <Descriptions.Item>
                ♦&nbsp;
                <span
                  className={styles.linkStyle}
                  onClick={() => history.push('/application/EvaluationApplication')}
                >
                  网上书籍分析及推荐系统
                </span>
              </Descriptions.Item>
            </Descriptions>
          </Space>
        </div>
      </div>
    );
  }
}

export default Map;
