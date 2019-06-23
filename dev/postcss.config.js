module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-plugin-px2rem":{
      rootValue: 37.5,
      // to leave 1px alone.
      minPixelValue: 1.01
    }
  }
};
