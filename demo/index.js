import {Col, Row} from 'bee-layout';
import {Panel} from 'bee-panel';
import Button from 'bee-button';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var Demo3 = require("./demolist/Demo3");var Demo4 = require("./demolist/Demo4");var Demo5 = require("./demolist/Demo5");var Demo6 = require("./demolist/Demo6");var Demo7 = require("./demolist/Demo7");var DemoArray = [{"example":<Demo1 />,"title":" 常用按钮Upload","code":"/**\r\n * @title 常用按钮Upload\r\n * @description 通过定义props，来自定义上传文件和服务地址等信息。在onChange方法的参数info，是上传返回的回调参数。常用的是上传的状态。\r\n */\r\n\r\n\r\nimport React, { Component } from 'react';\r\n\n\nimport { Upload, Button, Icon } from 'tinper-bee';\r\n\r\nconst props = {\r\n  name: 'file',\r\n  action: '/upload.do',\r\n  headers: {\r\n    authorization: 'authorization-text',\r\n  },\r\n  onChange(info) {\r\n    if (info.file.status !== 'uploading') {\r\n      console.log(info.file, info.fileList);\r\n    }\r\n    if (info.file.status === 'done') {\r\n      console.log(`${info.file.name} file uploaded successfully`);\r\n    } else if (info.file.status === 'error') {\r\n      console.log(`${info.file.name} file upload failed.`);\r\n    }\r\n  },\r\n};\r\n\r\nclass Demo1 extends Component {\r\n\trender(){\r\n\t\treturn( \r\n\t\t\t<Upload {...props}>\r\n        <Button shape=\"border\">\r\n          <Icon type=\"uf-upload\" /> Click to Upload\r\n        </Button>\r\n      </Upload>\r\n\t\t)\r\n\t}\r\n}\r\n\r\n","desc":" 通过定义props，来自定义上传文件和服务地址等信息。在onChange方法的参数info，是上传返回的回调参数。常用的是上传的状态。"},{"example":<Demo2 />,"title":" 列表`Upload`","code":"/**\r\n * @title 列表`Upload`\r\n * @description 自定义已上传文件列表。\r\n */\r\n\r\nimport React, { Component } from 'react';\r\n\n\nimport { Upload, Button, Icon } from 'tinper-bee';\r\n\r\nconst demo2props = {\r\n  action: '/upload.do',\r\n  onChange(info) {\r\n    if (info.file.status !== 'uploading') {\r\n      console.log(info.file);\r\n      console.log(info.fileList);\r\n    }\r\n  },\r\n  defaultFileList: [{\r\n    uid: -1,\r\n    name: 'xxx.png',\r\n    status: 'done',\r\n    url: 'http://www.baidu.com/xxx.png',\r\n  }, {\r\n    uid: -2,\r\n    name: 'yyy.png',\r\n    status: 'done',\r\n    url: 'http://www.baidu.com/yyy.png',\r\n  }],\r\n};\r\nclass Demo2 extends Component {\r\n  render(){\r\n    return( \r\n      <Upload {...demo2props}>\r\n        <Button type=\"primary\" shape=\"border\">\r\n          <Icon type=\"uf-upload\" /> Click to Upload\r\n        </Button>\r\n      </Upload>\r\n    )\r\n  }\r\n}\r\n\r\n","desc":" 自定义已上传文件列表。"},{"example":<Demo3 />,"title":" 图片列表`Upload`","code":"/**\r\n * @title 图片列表`Upload`\r\n * @description 图片文件列表以图片的形式展示。关键参数 `listType:picture`。\r\n */\r\n\r\nimport React, { Component } from 'react';\r\n\n\nimport { Upload, Button, Icon } from 'tinper-bee';\r\n\r\nconst demo4props = {\r\n  action: '/upload.do',\r\n  listType: 'picture',\r\n  defaultFileList: [{\r\n    uid: -1,\r\n    name: 'xxx.png',\r\n    status: 'done',\r\n    url: 'http://design.yyuap.com/images/icon1.png',\r\n    thumbUrl: 'http://design.yyuap.com/images/icon1.png',\r\n  }, {\r\n    uid: -2,\r\n    name: 'yyy.png',\r\n    status: 'done',\r\n    url: 'http://design.yyuap.com/images/icon1.png',\r\n    thumbUrl: 'http://design.yyuap.com/images/icon1.png',\r\n  }],\r\n};\r\n\r\nclass Demo3 extends Component {\r\n  render(){\r\n    return( \r\n      <div>\r\n        <Upload {...demo4props}>\r\n          <Button type=\"primary\" shape=\"border\">\r\n            <Icon type=\"uf-upload\" /> upload\r\n          </Button>\r\n        </Upload>\r\n      </div>\r\n    )\r\n  }\r\n}\r\n\r\n","desc":" 图片文件列表以图片的形式展示。关键参数 `listType:picture`。"},{"example":<Demo4 />,"title":" 自定义`Upload`","code":"/**\r\n * @title 自定义`Upload`\r\n * @description 自定义上传文件的数量，且最近上传的文件会替代老文件。\r\n */\r\n\r\nimport React, { Component } from 'react';\r\n\n\nimport { Upload, Button, Icon } from 'tinper-bee';\r\n\r\nclass Demo4 extends Component{\r\n  constructor(props) {\r\n    super(props);\r\n    this.state = {\r\n      fileList: [{\r\n        uid: -1,\r\n        name: 'xxx.png',\r\n        status: 'done',\r\n        url: 'http://www.baidu.com/xxx.png',\r\n      }],\r\n    };\r\n  }\r\n  handleChange(info) {\r\n    let fileList = info.fileList;\r\n\r\n    //  自定义上传数量，只显示最近上传的文件   \r\n    fileList = fileList.slice(-2);\r\n\r\n    // 读取返回数据，并显示成文件链接形式\r\n    fileList = fileList.map((file) => {\r\n      if (file.response) {\r\n        //组件会显示文件链接为超链接形式\r\n        file.url = file.response.url;\r\n      }\r\n      return file;\r\n    });\r\n\r\n    // 通过从服务器返回的结果，过滤上传成功的文件\r\n    fileList = fileList.filter((file) => {\r\n      if (file.response) {\r\n        return file.response.status === 'success';\r\n      }\r\n      return true;\r\n    });\r\n\r\n    this.setState({ fileList });\r\n  }\r\n  render() {\r\n    const props = {\r\n      action: '/upload.do',\r\n      onChange: this.handleChange.bind(this),\r\n      multiple: true,\r\n    };\r\n    return (\r\n      <Upload {...props} fileList={this.state.fileList}>\r\n        <Button colors=\"primary\" shape=\"border\">\r\n          <Icon type=\"uf-upload\" /> upload\r\n        </Button>\r\n      </Upload>\r\n    );\r\n  }\r\n};\r\n\r\n","desc":" 自定义上传文件的数量，且最近上传的文件会替代老文件。"},{"example":<Demo5 />,"title":" 拖拽`Upload`","code":"/**\r\n * @title 拖拽`Upload`\r\n * @description 文件以拖拽的形式上传。\r\n */\r\n\r\nimport React, { Component } from 'react';\r\n\n\nimport { Upload, Button, Icon } from 'tinper-bee';\r\n\r\nconst Dragger = Upload.Dragger;\r\n\r\nconst demo6props = {\r\n  name: 'file',\r\n  multiple: true,\r\n  showUploadList: false,\r\n  action: '/upload.do',\r\n  onChange(info) {\r\n    const status = info.file.status;\r\n    if (status !== 'uploading') {\r\n      console.log(info.file, info.fileList);\r\n    }\r\n    if (status === 'done') {\r\n\r\n      console.log(`${info.file.name} file uploaded successfully.`);\r\n    } else if (status === 'error') {\r\n      console.log(`${info.file.name} file upload failed.`);\r\n    }\r\n  },\r\n};\r\n\r\n\r\nclass Demo5 extends Component {\r\n  render(){\r\n    return( \r\n      <div style={{ marginTop: 16, height: 180 }}>\r\n        <Dragger {...demo6props}>\r\n          <p className=\"u-upload-drag-icon\">\r\n            <Icon type=\"inbox\" className=\"uf-upload\" />\r\n          </p>\r\n          <p className=\"u-upload-text\">Click or drag file to this area to upload</p>\r\n          <p className=\"u-upload-hint\">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>\r\n        </Dragger>\r\n      </div>\r\n    )\r\n  }\r\n}\r\n\r\n","desc":" 文件以拖拽的形式上传。"},{"example":<Demo6 />,"title":" 限制文件类型","code":"/**\r\n * @title 限制文件类型\r\n * @description 自定义上传文件的类型。关键参数accept:image/* 所有图片格式  accept:image/png,image/gif  限制个别文件类型\r\n */\r\n\r\nimport React, { Component } from 'react';\r\n\n\nimport { Upload, Button, Icon } from 'tinper-bee';\r\n\r\nconst demo6props = {\r\n  name: 'file',\r\n  action: '/upload.do',\r\n  accept:\"image/*\",\r\n  // accept:\"image/png,image/gif\", //限制个别图片类型\r\n  size:300,\r\n  headers: {\r\n    authorization: 'authorization-text',\r\n  }\r\n};\r\n\r\nclass Demo6 extends Component {\r\n\trender(){\r\n\t\treturn( \r\n\t\t\t<Upload {...demo6props}>\r\n        <Button shape=\"border\">\r\n          <Icon type=\"uf-upload\" /> Click to Upload\r\n        </Button>\r\n      </Upload>\r\n\t\t)\r\n\t}\r\n}\r\n\r\n","desc":" 自定义上传文件的类型。关键参数accept:image/* 所有图片格式  accept:image/png,image/gif  限制个别文件类型"},{"example":<Demo7 />,"title":" 限制文件大小","code":"/**\r\n * @title 限制文件大小\r\n * @description 限制自定义上传文件的大小。选中文件后触发beforeUpload回调，通过true/false来确定是否继续上传【file.size/1024*100 单位 KB、file.size/1024 单位 M 】\r\n */\r\n\r\nimport React, { Component } from 'react';\r\n\n\nimport { Upload, Button, Icon } from 'tinper-bee';\r\n\r\nconst demo7props = {\r\n  name: 'file',\r\n  action: '/upload.do',\r\n  accept:\"image/*\",\r\n  size:300,\r\n  headers: {\r\n    authorization: 'authorization-text',\r\n  },\r\n  beforeUpload(file){\r\n      let maxsize = 3000;\r\n      return (file.size/1024*100)>= maxsize?false:true;\r\n  },\r\n};\r\n\r\nclass Demo7 extends Component {\r\n\trender(){\r\n\t\treturn( \r\n\t\t\t<Upload {...demo7props}>\r\n        <Button shape=\"border\">\r\n          <Icon type=\"uf-upload\" /> Click to Upload\r\n        </Button>\r\n      </Upload>\r\n\t\t)\r\n\t}\r\n}\r\n\r\n","desc":" 限制自定义上传文件的大小。选中文件后触发beforeUpload回调，通过true/false来确定是否继续上传【file.size/1024*100 单位 KB、file.size/1024 单位 M 】"}]


class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({open: !this.state.open})
    }

    render() {
        const {title, example, code, desc, scss_code} = this.props;
        let caret = this.state.open ? CARETUP : CARET;
        let text = this.state.open ? "隐藏代码" : "查看代码";

        const header = (
            <div>
                {example}
                <Button style={{"marginTop": "10px"}} shape="block" onClick={this.handleClick}>
                    {caret}
                    {text}
                </Button>
            </div>
        );
        return (
            <Col md={12}>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div style={{ padding: '10px 15px', backgroundColor: '#fff', borderTop: '1px solid #e9e9e9', borderLeft: '1px solid #e9e9e9', borderRight: '1px solid #e9e9e9', borderRadius: 4}}>
                    { header }
                </div>
                <Panel collapsible headerContent expanded={this.state.open} colors='bordered'
                       footerStyle={{padding: 0}}>
                    <pre><code className="hljs javascript">{code}</code></pre>
                    {!!scss_code ? <pre><code className="hljs css">{scss_code}</code></pre> : null}
                </Panel>
            </Col>
        )
    }
}

class DemoGroup extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Row>
                {DemoArray.map((child, index) => {

                    return (
                        <Demo example={child.example} title={child.title} code={child.code} scss_code={child.scss_code}
                              desc={child.desc} key={index}/>
                    )

                })}
            </Row>
        )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
