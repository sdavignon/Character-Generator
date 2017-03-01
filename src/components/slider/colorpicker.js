import React, { Component } from 'react';
import { Link } from 'react-router';
import map from 'lodash/map';
import classNames from 'classnames';

const ColorPicker = ({ colors, current, urlPrefix, onClick }) => {
  return (
    Object.keys(colors).length > 1
    ?
    <div className="colorPicker">
      {map(colors, color => {
        const className = classNames('color', color.id, {
          active: current === color.id
        });

        return (
          <Link key={color.id}
            to={`${urlPrefix}${color.id}`}
            className={className} activeClassName="active"
            onClick={() => onClick(color.id)}
          >
          </Link>
        );
      })}
    </div>
    :
    <div/>
  );
}

export default ColorPicker;
