const orange = '#ED3D25';

module.exports = {
  replaceAttrValues: {
    '@fill': `{props.color || '${orange}'}`
  }
};
