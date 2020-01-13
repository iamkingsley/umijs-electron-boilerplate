import React, { Component } from 'react'
import { routerRedux } from 'dva/router';
import { connect } from 'dva';

 class II extends Component {
    componentDidMount = () => {
      this.props.dispatch(routerRedux.replace({pathname:"/dashboard"}))
    }
    
  render() {
    return (
     null
    )
  }
}
export default connect()(II)


//product/$id was messing up so we added this as a temp fix