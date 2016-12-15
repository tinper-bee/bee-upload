
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Upload from '../src';
import Icon from 'bee-icon';


const CARET = <i className="uf uf-chevronarrowdown"></i>;

const CARETUP = <i className="uf uf-chevronarrowup"></i>;


/**
 * @title Checkbox
 * @description `checked` 参数设置是否选中，`disabled`设置是否可用。
 */
const props = {
  name: 'file',
  action: '/upload.do',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  },
};

class Demo1 extends Component {
	render(){
		return( 
			<Upload {...props}>
        <Button type="primary" shape="border">
          <Icon type="upload" /> Click to Upload
        </Button>
      </Upload>
		)
	}
}/**
 * @title 多颜色`Checkbox`
 * @description `colors`参数控制背景色
 */
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    console.log('You can only upload JPG file!');
    //message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    console.log('Image must smaller than 2MB!')
    //message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
class Demo2 extends React.Component {
  state = {};

  handleChange = (info) => {
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
    }
  }

  render() {
    const imageUrl = this.state.imageUrl;
    return (
      <Upload
        className="avatar-uploader"
        name="avatar"
        showUploadList={false}
        action="/upload.do"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {
          imageUrl ?
            <img src={imageUrl} role="presentation" className="avatar" /> :
            <Icon className="avatar-uploader-trigger" type="plus-black-symbol" />
        }
      </Upload>
    );
  }
}
const demo3props = {
  action: '/upload.do',
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file);
      console.log(info.fileList);
    }
  },
  defaultFileList: [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'http://www.baidu.com/xxx.png',
  }, {
    uid: -2,
    name: 'yyy.png',
    status: 'done',
    url: 'http://www.baidu.com/yyy.png',
  }],
};
class Demo3 extends Component {
  render(){
    return( 
      <Upload {...demo3props}>
        <Button type="primary" shape="border">
          <Icon type="upload" /> Click to Upload
        </Button>
      </Upload>
    )
  }
}class Demo4 extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
      }],
    };
  }
  handleChange(info) {
    let fileList = info.fileList;

    // 1. Limit the number of uploaded files
    //    Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    // 3. filter successfully uploaded files according to response from server
    fileList = fileList.filter((file) => {
      if (file.response) {
        return file.response.status === 'success';
      }
      return true;
    });

    this.setState({ fileList });
  }
  render() {
    const props = {
      action: '/upload.do',
      onChange: this.handleChange.bind(this),
      multiple: true,
    };
    return (
      <Upload {...props} fileList={this.state.fileList}>
        <Button colors="primary" shape="border">
          <Icon type="upload" /> upload
        </Button>
      </Upload>
    );
  }
};//列表形式显示图片列表
const demo5props = {
  action: '/upload.do',
  listType: 'picture',
  defaultFileList: [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }, {
    uid: -2,
    name: 'yyy.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }],
};

class Demo5 extends Component {
  render(){
    return( 
      <div>
        <Upload {...demo5props}>
          <Button type="primary" shape="border">
            <Icon type="upload" /> upload
          </Button>
        </Upload>
        <br />
        <br />
        <Upload {...props} className="upload-list-inline">
          <Button type="primary" shape="border">
            <Icon type="upload" /> upload
          </Button>
        </Upload>
      </div>
    )
  }
}const Dragger = Upload.Dragger;

const demo6props = {
  name: 'file',
  multiple: true,
  showUploadList: false,
  action: '/upload.do',
  onChange(info) {
    const status = info.file.status;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {

      console.log(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  },
};


class Demo6 extends Component {
  render(){
    return( 
      <div style={{ marginTop: 16, height: 180 }}>
        <Dragger {...demo6props}>
          <p className="u-upload-drag-icon">
            <Icon type="inbox" className="uf-upload-drag" />
          </p>
          <p className="u-upload-text">Click or drag file to this area to upload</p>
          <p className="u-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
        </Dragger>
      </div>
    )
  }
}var DemoArray = [{"example":<Demo1 />,"title":" Checkbox","code":"/**\n * @title Checkbox\n * @description `checked` 参数设置是否选中，`disabled`设置是否可用。\n */\nconst props = {\n  name: 'file',\n  action: '/upload.do',\n  headers: {\n    authorization: 'authorization-text',\n  },\n  onChange(info) {\n    if (info.file.status !== 'uploading') {\n      console.log(info.file, info.fileList);\n    }\n    if (info.file.status === 'done') {\n      console.log(`${info.file.name} file uploaded successfully`);\n    } else if (info.file.status === 'error') {\n      console.log(`${info.file.name} file upload failed.`);\n    }\n  },\n};\n\nclass Demo1 extends Component {\n\trender(){\n\t\treturn( \n\t\t\t<Upload {...props}>\n        <Button type=\"primary\" shape=\"border\">\n          <Icon type=\"upload\" /> Click to Upload\n        </Button>\n      </Upload>\n\t\t)\n\t}\n}","desc":" `checked` 参数设置是否选中，`disabled`"},{"example":<Demo2 />,"title":" 多颜色`Checkbox`","code":"/**\n * @title 多颜色`Checkbox`\n * @description `colors`参数控制背景色\n */\nfunction getBase64(img, callback) {\n  const reader = new FileReader();\n  reader.addEventListener('load', () => callback(reader.result));\n  reader.readAsDataURL(img);\n}\n\nfunction beforeUpload(file) {\n  const isJPG = file.type === 'image/jpeg';\n  if (!isJPG) {\n    console.log('You can only upload JPG file!');\n    //message.error('You can only upload JPG file!');\n  }\n  const isLt2M = file.size / 1024 / 1024 < 2;\n  if (!isLt2M) {\n    console.log('Image must smaller than 2MB!')\n    //message.error('Image must smaller than 2MB!');\n  }\n  return isJPG && isLt2M;\n}\nclass Demo2 extends React.Component {\n  state = {};\n\n  handleChange = (info) => {\n    if (info.file.status === 'done') {\n      // Get this url from response in real world.\n      getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));\n    }\n  }\n\n  render() {\n    const imageUrl = this.state.imageUrl;\n    return (\n      <Upload\n        className=\"avatar-uploader\"\n        name=\"avatar\"\n        showUploadList={false}\n        action=\"/upload.do\"\n        beforeUpload={beforeUpload}\n        onChange={this.handleChange}\n      >\n        {\n          imageUrl ?\n            <img src={imageUrl} role=\"presentation\" className=\"avatar\" /> :\n            <Icon className=\"avatar-uploader-trigger\" type=\"plus-black-symbol\" />\n        }\n      </Upload>\n    );\n  }\n}\n","desc":" `colors`参数控制背景色"},{"example":<Demo3 />,"title":"Demo3","code":"const demo3props = {\n  action: '/upload.do',\n  onChange(info) {\n    if (info.file.status !== 'uploading') {\n      console.log(info.file);\n      console.log(info.fileList);\n    }\n  },\n  defaultFileList: [{\n    uid: -1,\n    name: 'xxx.png',\n    status: 'done',\n    url: 'http://www.baidu.com/xxx.png',\n  }, {\n    uid: -2,\n    name: 'yyy.png',\n    status: 'done',\n    url: 'http://www.baidu.com/yyy.png',\n  }],\n};\nclass Demo3 extends Component {\n  render(){\n    return( \n      <Upload {...demo3props}>\n        <Button type=\"primary\" shape=\"border\">\n          <Icon type=\"upload\" /> Click to Upload\n        </Button>\n      </Upload>\n    )\n  }\n}","desc":""},{"example":<Demo4 />,"title":"Demo4","code":"class Demo4 extends Component{\n  constructor(props) {\n    super(props);\n    this.state = {\n      fileList: [{\n        uid: -1,\n        name: 'xxx.png',\n        status: 'done',\n        url: 'http://www.baidu.com/xxx.png',\n      }],\n    };\n  }\n  handleChange(info) {\n    let fileList = info.fileList;\n\n    // 1. Limit the number of uploaded files\n    //    Only to show two recent uploaded files, and old ones will be replaced by the new\n    fileList = fileList.slice(-2);\n\n    // 2. read from response and show file link\n    fileList = fileList.map((file) => {\n      if (file.response) {\n        // Component will show file.url as link\n        file.url = file.response.url;\n      }\n      return file;\n    });\n\n    // 3. filter successfully uploaded files according to response from server\n    fileList = fileList.filter((file) => {\n      if (file.response) {\n        return file.response.status === 'success';\n      }\n      return true;\n    });\n\n    this.setState({ fileList });\n  }\n  render() {\n    const props = {\n      action: '/upload.do',\n      onChange: this.handleChange.bind(this),\n      multiple: true,\n    };\n    return (\n      <Upload {...props} fileList={this.state.fileList}>\n        <Button colors=\"primary\" shape=\"border\">\n          <Icon type=\"upload\" /> upload\n        </Button>\n      </Upload>\n    );\n  }\n};","desc":""},{"example":<Demo5 />,"title":"Demo5","code":"//列表形式显示图片列表\nconst demo5props = {\n  action: '/upload.do',\n  listType: 'picture',\n  defaultFileList: [{\n    uid: -1,\n    name: 'xxx.png',\n    status: 'done',\n    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',\n    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',\n  }, {\n    uid: -2,\n    name: 'yyy.png',\n    status: 'done',\n    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',\n    thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',\n  }],\n};\n\nclass Demo5 extends Component {\n  render(){\n    return( \n      <div>\n        <Upload {...demo5props}>\n          <Button type=\"primary\" shape=\"border\">\n            <Icon type=\"upload\" /> upload\n          </Button>\n        </Upload>\n        <br />\n        <br />\n        <Upload {...props} className=\"upload-list-inline\">\n          <Button type=\"primary\" shape=\"border\">\n            <Icon type=\"upload\" /> upload\n          </Button>\n        </Upload>\n      </div>\n    )\n  }\n}","desc":""},{"example":<Demo6 />,"title":"Demo6","code":"const Dragger = Upload.Dragger;\n\nconst demo6props = {\n  name: 'file',\n  multiple: true,\n  showUploadList: false,\n  action: '/upload.do',\n  onChange(info) {\n    const status = info.file.status;\n    if (status !== 'uploading') {\n      console.log(info.file, info.fileList);\n    }\n    if (status === 'done') {\n\n      console.log(`${info.file.name} file uploaded successfully.`);\n    } else if (status === 'error') {\n      console.log(`${info.file.name} file upload failed.`);\n    }\n  },\n};\n\n\nclass Demo6 extends Component {\n  render(){\n    return( \n      <div style={{ marginTop: 16, height: 180 }}>\n        <Dragger {...demo6props}>\n          <p className=\"u-upload-drag-icon\">\n            <Icon type=\"inbox\" className=\"uf-upload-drag\" />\n          </p>\n          <p className=\"u-upload-text\">Click or drag file to this area to upload</p>\n          <p className=\"u-upload-hint\">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>\n        </Dragger>\n      </div>\n    )\n  }\n}","desc":""}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ open: !this.state.open })
    }

    render () {
        const { title, example, code, desc  } = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const footer = (
            <Button shape="block" onClick={ this.handleClick }>
                { caret }
                { text }
            </Button>
        );
        const header = (
            <Row>
                <Col md={11}>
                { example }
                </Col>
                <Col md={1}>
                <Button shape="icon" onClick={ this.handleClick }>
                    { caret }
                </Button>
                </Col>
            </Row>
        );
        return (
            <Col md={10} mdOffset={1} sm={12} smOffset={0}>
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel headerContent collapsible expanded={ this.state.open } colors='bordered' header={ header } footer={footer} footerStyle = {{padding: 0}}>
                    <pre><code className="hljs javascript">{ code }</code></pre>
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props){
        super(props)
    }
    render () {
        return (
                <Row>
                    {DemoArray.map((child,index) => {

                        return (
                            <Demo example= {child.example} title= {child.title} code= {child.code} desc= {child.desc} key= {index}/>
                        )

                    })}
                </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
