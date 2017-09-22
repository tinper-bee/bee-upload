
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Button from 'bee-button';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Upload from '../src';
import Icon from 'bee-icon';


const CARET = <i className="uf uf-arrow-down"></i>;

const CARETUP = <i className="uf uf-arrow-up"></i>;


var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var Demo3 = require("./demolist/Demo3");var Demo4 = require("./demolist/Demo4");var Demo5 = require("./demolist/Demo5");var DemoArray = [{"example":<Demo1 />,"title":" 常用按钮Upload","code":"/**\n * @title 常用按钮Upload\n * @description 通过定义props，来自定义上传文件和服务地址等信息。在onChange方法的参数info，是上传返回的回调参数。常用的是上传的状态。\n */\n\n\nimport React, { Component } from 'react';\nimport Icon from 'bee-icon';\nimport Button from 'bee-button';\nimport Upload from 'bee-upload';\n\nconst props = {\n  name: 'file',\n  action: '/upload.do',\n  headers: {\n    authorization: 'authorization-text',\n  },\n  onChange(info) {\n    if (info.file.status !== 'uploading') {\n      console.log(info.file, info.fileList);\n    }\n    if (info.file.status === 'done') {\n      console.log(`${info.file.name} file uploaded successfully`);\n    } else if (info.file.status === 'error') {\n      console.log(`${info.file.name} file upload failed.`);\n    }\n  },\n};\n\nclass Demo1 extends Component {\n\trender(){\n\t\treturn( \n\t\t\t<Upload {...props}>\n        <Button shape=\"border\">\n          <Icon type=\"uf-upload\" /> Click to Upload\n        </Button>\n      </Upload>\n\t\t)\n\t}\n}\n\n","desc":" 通过定义props，来自定义上传文件和服务地址等信息。在onChange方法的参数info，是上传返回的回调参数。常用的是上传的状态。"},{"example":<Demo2 />,"title":" 列表`Upload`","code":"/**\n * @title 列表`Upload`\n * @description 自定义已上传文件列表。\n */\n\nimport React, { Component } from 'react';\nimport Icon from 'bee-icon';\nimport Button from 'bee-button';\nimport Upload from 'bee-upload';\n\nconst demo2props = {\n  action: '/upload.do',\n  onChange(info) {\n    if (info.file.status !== 'uploading') {\n      console.log(info.file);\n      console.log(info.fileList);\n    }\n  },\n  defaultFileList: [{\n    uid: -1,\n    name: 'xxx.png',\n    status: 'done',\n    url: 'http://www.baidu.com/xxx.png',\n  }, {\n    uid: -2,\n    name: 'yyy.png',\n    status: 'done',\n    url: 'http://www.baidu.com/yyy.png',\n  }],\n};\nclass Demo2 extends Component {\n  render(){\n    return( \n      <Upload {...demo2props}>\n        <Button type=\"primary\" shape=\"border\">\n          <Icon type=\"uf-upload\" /> Click to Upload\n        </Button>\n      </Upload>\n    )\n  }\n}\n\n","desc":" 自定义已上传文件列表。"},{"example":<Demo3 />,"title":" 图片列表`Upload`","code":"/**\n * @title 图片列表`Upload`\n * @description 图片文件列表以图片的形式展示。关键参数 `listType:picture`。\n */\n\nimport React, { Component } from 'react';\nimport Icon from 'bee-icon';\nimport Button from 'bee-button';\nimport Upload from 'bee-upload';\n\nconst demo4props = {\n  action: '/upload.do',\n  listType: 'picture',\n  defaultFileList: [{\n    uid: -1,\n    name: 'xxx.png',\n    status: 'done',\n    url: 'http://design.yyuap.com/images/icon1.png',\n    thumbUrl: 'http://design.yyuap.com/images/icon1.png',\n  }, {\n    uid: -2,\n    name: 'yyy.png',\n    status: 'done',\n    url: 'http://design.yyuap.com/images/icon1.png',\n    thumbUrl: 'http://design.yyuap.com/images/icon1.png',\n  }],\n};\n\nclass Demo3 extends Component {\n  render(){\n    return( \n      <div>\n        <Upload {...demo4props}>\n          <Button type=\"primary\" shape=\"border\">\n            <Icon type=\"uf-upload\" /> upload\n          </Button>\n        </Upload>\n      </div>\n    )\n  }\n}\n\n","desc":" 图片文件列表以图片的形式展示。关键参数 `listType:picture`。"},{"example":<Demo4 />,"title":" 自定义`Upload`","code":"/**\n * @title 自定义`Upload`\n * @description 自定义上传文件的数量，且最近上传的文件会替代老文件。\n */\n\nimport React, { Component } from 'react';\nimport Icon from 'bee-icon';\nimport Button from 'bee-button';\nimport Upload from 'bee-upload';\n\nclass Demo4 extends Component{\n  constructor(props) {\n    super(props);\n    this.state = {\n      fileList: [{\n        uid: -1,\n        name: 'xxx.png',\n        status: 'done',\n        url: 'http://www.baidu.com/xxx.png',\n      }],\n    };\n  }\n  handleChange(info) {\n    let fileList = info.fileList;\n\n    //  自定义上传数量，只显示最近上传的文件   \n    fileList = fileList.slice(-2);\n\n    // 读取返回数据，并显示成文件链接形式\n    fileList = fileList.map((file) => {\n      if (file.response) {\n        //组件会显示文件链接为超链接形式\n        file.url = file.response.url;\n      }\n      return file;\n    });\n\n    // 通过从服务器返回的结果，过滤上传成功的文件\n    fileList = fileList.filter((file) => {\n      if (file.response) {\n        return file.response.status === 'success';\n      }\n      return true;\n    });\n\n    this.setState({ fileList });\n  }\n  render() {\n    const props = {\n      action: '/upload.do',\n      onChange: this.handleChange.bind(this),\n      multiple: true,\n    };\n    return (\n      <Upload {...props} fileList={this.state.fileList}>\n        <Button colors=\"primary\" shape=\"border\">\n          <Icon type=\"uf-upload\" /> upload\n        </Button>\n      </Upload>\n    );\n  }\n};\n\n","desc":" 自定义上传文件的数量，且最近上传的文件会替代老文件。"},{"example":<Demo5 />,"title":" 拖拽`Upload`","code":"/**\n * @title 拖拽`Upload`\n * @description 文件以拖拽的形式上传。\n */\n\nimport React, { Component } from 'react';\nimport Icon from 'bee-icon';\nimport Button from 'bee-button';\nimport Upload from 'bee-upload';\n\nconst Dragger = Upload.Dragger;\n\nconst demo6props = {\n  name: 'file',\n  multiple: true,\n  showUploadList: false,\n  action: '/upload.do',\n  onChange(info) {\n    const status = info.file.status;\n    if (status !== 'uploading') {\n      console.log(info.file, info.fileList);\n    }\n    if (status === 'done') {\n\n      console.log(`${info.file.name} file uploaded successfully.`);\n    } else if (status === 'error') {\n      console.log(`${info.file.name} file upload failed.`);\n    }\n  },\n};\n\n\nclass Demo5 extends Component {\n  render(){\n    return( \n      <div style={{ marginTop: 16, height: 180 }}>\n        <Dragger {...demo6props}>\n          <p className=\"u-upload-drag-icon\">\n            <Icon type=\"inbox\" className=\"uf-upload\" />\n          </p>\n          <p className=\"u-upload-text\">Click or drag file to this area to upload</p>\n          <p className=\"u-upload-hint\">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>\n        </Dragger>\n      </div>\n    )\n  }\n}\n\n","desc":" 文件以拖拽的形式上传。"}]


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
        return (
            <Col md={12}>
                <h3>{ title }</h3>
                <p>{ desc }</p>
                <Panel collapsible expanded={ this.state.open } colors='bordered' header={ example } footer={footer} footerStyle = {{padding: 0,borderColor: "transparent"}} >
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
