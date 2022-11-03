const orange = '#ED3D25';
const gray = '#868993';

module.exports = {
  replaceAttrValues: {
    [orange]: `{props.color || '${orange}'}`,
    [gray]: `{props.color || '${gray}'}`
  }
};
