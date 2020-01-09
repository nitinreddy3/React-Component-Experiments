import React, { Component } from "react";
import { ControlPointOutlined, RemoveCircleOutlineOutlined } from '@material-ui/icons'
import PropTypes from "prop-types";
import "./Card.css";

export default class Card extends Component {
  render = () => {
    const { item, onCollapse, onExpand } = this.props;
    return (
      <div className={`card-outer`}>
        <div
          className={`card-inner`}
          onClick={() => (item.isExpanded ? onCollapse() : onExpand())}
        >
          {/* {item.hasChildren && ( */}
          <span style={{ marginRight: 5, display: 'inline-block', float: 'left' }}>{item.isExpanded ? <RemoveCircleOutlineOutlined/> : <ControlPointOutlined/> }</span>
          {/*  )} */}
          <span style={{ marginTop: 3, display: 'inline-block' }}>{item.data.name}</span>
        </div>
      </div>
    );
  };
}
