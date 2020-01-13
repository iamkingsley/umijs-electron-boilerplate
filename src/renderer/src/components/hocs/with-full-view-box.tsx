import React, { Component } from "react";

const withFullViewBox =(WrappedComponent) => {
    return class WMenu extends Component {

    render() {

      return  (
            <div className={layoutStyles.viewBox}>
            <WrappedComponent {...this.props} />
            </div>
      );
    }
  };
};

export default withFullViewBox;
