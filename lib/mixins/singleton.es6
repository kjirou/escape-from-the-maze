let SingletomMixin = {

  _instance: null,

  getInstance: function getInstance(...args) {
    if (this._instance && this._instance instanceof this) {
      return this._instance;
    }
    this._instance = new this(...args);
    return this._instance;
  },

  clearInstance: function clearInstance() {
    this._instance = null;
  }
};


export default SingletomMixin;
