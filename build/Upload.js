'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AjaxUploader = require('./AjaxUploader');

var _AjaxUploader2 = _interopRequireDefault(_AjaxUploader);

var _IframeUploader = require('./IframeUploader');

var _IframeUploader2 = _interopRequireDefault(_IframeUploader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

function empty() {}

var propTypes = {
  component: _react.PropTypes.string,
  style: _react.PropTypes.object,
  clsPrefix: _react.PropTypes.string,
  action: _react.PropTypes.string,
  name: _react.PropTypes.string,
  multipart: _react.PropTypes.bool,
  onError: _react.PropTypes.func,
  onSuccess: _react.PropTypes.func,
  onProgress: _react.PropTypes.func,
  onStart: _react.PropTypes.func,
  data: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.func]),
  headers: _react.PropTypes.object,
  accept: _react.PropTypes.string,
  multiple: _react.PropTypes.bool,
  disabled: _react.PropTypes.bool,
  beforeUpload: _react.PropTypes.func,
  customRequest: _react.PropTypes.func,
  onReady: _react.PropTypes.func,
  withCredentials: _react.PropTypes.bool,
  supportServerRender: _react.PropTypes.bool
};
var defaultProps = {
  component: 'span',
  clsPrefix: 'u-upload',
  data: {},
  headers: {},
  name: 'file',
  multipart: false,
  onProgress: empty,
  onReady: empty,
  onStart: empty,
  onError: empty,
  onSuccess: empty,
  supportServerRender: false,
  multiple: false,
  beforeUpload: null,
  customRequest: null,
  withCredentials: false
};

var Upload = function (_Component) {
  _inherits(Upload, _Component);

  function Upload(props) {
    _classCallCheck(this, Upload);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      Component: null
    };
    _this.getComponent = _this.getComponent.bind(_this);
    _this.abort = _this.abort.bind(_this);
    return _this;
  }

  Upload.prototype.componentDidMount = function componentDidMount() {
    if (this.props.supportServerRender) {
      /* eslint react/no-did-mount-set-state:0 */
      this.setState({
        Component: this.getComponent()
      }, this.props.onReady);
    }
  };

  Upload.prototype.getComponent = function getComponent() {
    return typeof FormData !== 'undefined' ? _AjaxUploader2["default"] : _IframeUploader2["default"];
  };

  Upload.prototype.abort = function abort(file) {
    this.refs.inner.abort(file);
  };

  Upload.prototype.render = function render() {
    if (this.props.supportServerRender) {
      var _Component2 = this.state.Component;

      if (_Component2) {
        return _react2["default"].createElement(_Component2, _extends({}, this.props, { ref: 'inner' }));
      }
      return null;
    }
    var Component = this.getComponent();
    return _react2["default"].createElement(Component, _extends({}, this.props, { ref: 'inner' }));
  };

  return Upload;
}(_react.Component);

;

Upload.propTypes = propTypes;
Upload.defaultProps = defaultProps;
exports["default"] = Upload;
module.exports = exports['default'];