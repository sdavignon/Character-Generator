import React, { Component } from 'react';
import { connect } from 'react-redux';
import map from 'lodash/map';
import fromPairs from 'lodash/fromPairs';
import { changeProfileAssetTypeStyle, changeProfileAssetTypeSortOrder } from '../actions/profile';
import assetsConfig from '../configs/assets';

const getStyle = (assetItem, type, profile, assets) => {
  const color = profile[assetItem.id].color;
  const typeItem = assets.items[assetItem.id].types[type];
  const availableColor = typeItem.colors[color] ? color : Object.keys(typeItem.colors)[0];
  const file = typeItem.colors[availableColor].files[0];
  return {
    left: file.style.left,
    top: file.style.top
  };
};

const keydownHandler = dispatch => e => {
  if ( ! [37, 38, 39, 40].includes(e.which)) return;

  e.preventDefault();

  if (e.metaKey) {
    dispatch(changeProfileAssetTypeSortOrder(e.which, e.shiftKey));
  } else {
    dispatch(changeProfileAssetTypeStyle(e.which, e.shiftKey));
  }
};

class AssetsConfig extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.keydownHandler = keydownHandler(dispatch);
    document.addEventListener('keydown', this.keydownHandler);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.keydownHandler);
  }

  render() {
    const { dispatch, profile, assets } = this.props;

    if ( ! assets.items) return <div />;


    const updatedAssetsConfig = map(assetsConfig, assetItem => ({
      ...assetItem,
      styles: fromPairs(map(assets.items[assetItem.id].types, type => [type.id, getStyle(assetItem, type.id, profile, assets)])),
      sortOrder: assets.items[assetItem.id].sortOrder
    }));

    const json = JSON.stringify(updatedAssetsConfig, null, '  ').replace(/'/g, '\\\'').replace(/\"/g, '\'').replace(/'([a-z]\w+)':/g, '\$1:');

    return (
      <div className="positions">
        <textarea value={`import keyBy from 'lodash/keyBy';\n\nexport default keyBy(${json}, 'id');\n`} onChange={() => {}} />
      </div>
    );
  }
}

export default connect(({ profile, assets }) => ({ profile, assets }))(AssetsConfig);
