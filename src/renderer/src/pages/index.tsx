import React from 'react';
import styles from '../common/styles/dashboard.less';
import { Row, Col, Card, List } from 'antd';
import { Link } from 'dva/router';
import { connect } from 'dva';
import {CableType } from '@/models/models';
import { Bar, Pie } from '@/components/charts';
import RouteWrapper, { RouteWrapperProps, RouteWrapperState } from '@/utils/route-wrapper';

interface Props extends RouteWrapperProps{
  cable_types: CableType[]
}

interface State extends RouteWrapperState{}

class Dashboard extends RouteWrapper<Props,State> {

  /**
   *
   */
  constructor(props:Props) {
    super(props);
    this.refreshList=["cable_types"]
    this.handleListRefresh();
  }
  render(){
    const lst=[
      {
        x:"Newly Manufactured",
        y:122
      },
      {
        x:"In Stock",
        y:122
      },
      {
        x:"Distributed",
        y:122
      },
      {
        x:"Sold",
        y:122
      },
      
    ];
    const dlist=[
      {
        x:"Active",
        y:11
      },
      {
        x:"Inactive",
        y:6
      },
    ]

    return (
      <div className={styles.dashboard}>
        <div className={styles.megas}>
          <Row gutter={8}>
            <Col md={24}>
              <Card title="Products" extra={<div>Total Created: <span style={{fontWeight:"bold"}}>2000</span></div>}>
                <Row gutter={32}>
                  <Col md={14}>
                    <List 
                      dataSource={lst} 
                      // tslint:disable-next-line:jsx-no-lambda
                      renderItem={(item)=>(
                        <List.Item>
                          <List.Item.Meta title={item.x} />
                            <b>{item.y}</b>
                        </List.Item>
                      )} 
                    />
                  </Col>
                  <Col md={10}>
                    <Pie 
                      data={lst} 
                      height={200}
                      hasLegend={false}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            
          </Row>
        </div>
        <div>

        <div className={styles.megas}>
          <Row gutter={8}>
            <Col md={24}>
              <Card title="Users" >
                <Row gutter={32}>
                  <Col md={14}>
                    <List 
                      dataSource={dlist} 
                      // tslint:disable-next-line:jsx-no-lambda
                      renderItem={(item)=>(
                        <List.Item>
                          <List.Item.Meta title={item.x} />
                            <b>{item.y}</b>
                        </List.Item>
                      )} 
                    />
                  </Col>
                  <Col md={10}>
                    <Pie 
                      data={dlist} 
                      height={100}
                      hasLegend={false}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
            
          </Row>
         </div>
        </div>
      </div>
    );

  }
}

export default connect(({categories,cable_types})=>({categories,cable_types}))(Dashboard);
