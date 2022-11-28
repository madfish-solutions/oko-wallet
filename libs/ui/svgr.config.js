const orange = '#ED3D25';
const gray = '#868993';
const lightGray = '#B4B6BC';

module.exports = {
  replaceAttrValues: {
    [orange]: `{props.color || '${orange}'}`,
    [gray]: `{props.color || '${gray}'}`,
    [lightGray]: `{props.color || '${lightGray}'}`
  }
};
