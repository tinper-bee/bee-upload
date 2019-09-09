import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import Button from '../src';



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var Demo3 = require("./demolist/Demo3");var Demo4 = require("./demolist/Demo4");var Demo5 = require("./demolist/Demo5");var Demo6 = require("./demolist/Demo6");var Demo7 = require("./demolist/Demo7");var DemoArray = [{"example":<Demo1 />,"title":" 常用按钮Upload","code":"/**\r\n * @title 常用按钮Upload\r\n * @description 通过定义props，来自定义上传文件和服务地址等信息。在onChange方法的参数info，是上传返回的回调参数。常用的是上传的状态。\r\n */\r\n\r\n\r\nimport React, { Component } from 'react';\nimport { Button, Icon, Upload } from 'tinper-bee';\r\n\n\n\r\n\r\nconst props = {\r\n  name: 'file',\r\n  action: '/upload.do',\r\n  headers: {\r\n    authorization: 'authorization-text',\r\n  },\r\n  onChange(info) {\r\n    if (info.file.status !== 'uploading') {\r\n      console.log(info.file, info.fileList);\r\n    }\r\n    if (info.file.status === 'done') {\r\n      console.log(`${info.file.name} file uploaded successfully`);\r\n    } else if (info.file.status === 'error') {\r\n      console.log(`${info.file.name} file upload failed.`);\r\n    }\r\n  },\r\n};\r\n\r\nclass Demo1 extends Component {\r\n\trender(){\r\n\t\treturn( \r\n\t\t\t<Upload {...props}>\r\n        <Button shape=\"border\">\r\n          <Icon type=\"uf-upload\" /> Click to Upload\r\n        </Button>\r\n      </Upload>\r\n\t\t)\r\n\t}\r\n}\r\n\r\nexport default Demo1;","desc":" 通过定义props，来自定义上传文件和服务地址等信息。在onChange方法的参数info，是上传返回的回调参数。常用的是上传的状态。"},{"example":<Demo2 />,"title":" 列表`Upload`","code":"/**\n * @title 列表`Upload`\n * @description 自定义已上传文件列表。\n */\n\nimport React, { Component } from 'react';\nimport { Button, Icon, Upload } from 'tinper-bee';\n\n\nconst demo2props = {\n  action: '/upload.do',\n  onChange(info) {\n    if (info.file.status !== 'uploading') {\n      console.log(info.file);\n      console.log(info.fileList);\n    }\n  },\n  defaultFileList: [{\n    uid: -1,\n    name: 'xxx.png',\n    status: 'done',\n    url: 'http://www.baidu.com/xxx.png',\n  }, {\n    uid: -2,\n    name: 'yyy.png',\n    status: 'done',\n    url: 'http://www.baidu.com/yyy.png',\n  }],\n};\nclass Demo2 extends Component {\n  render(){\n    return( \n      <Upload {...demo2props}>\n        <Button type=\"primary\" shape=\"border\">\n          <Icon type=\"uf-upload\" /> Click to Upload\n        </Button>\n      </Upload>\n    )\n  }\n}\n\nexport default Demo2;","desc":" 自定义已上传文件列表。"},{"example":<Demo3 />,"title":" 图片列表`Upload`","code":"/**\n * @title 图片列表`Upload`\n * @description 图片文件列表以图片的形式展示。关键参数 `listType:picture`。\n */\n\nimport React, { Component } from 'react';\nimport { Icon, Upload } from 'tinper-bee';\n\n\nconst demo4props = {\n  action: '/upload.do',\n  listType: 'picture-card',\n  defaultFileList: [{\n    uid: -1,\n    name: 'xxx.png',\n    status: 'done',\n    url: 'https://p0.ssl.qhimgs4.com/t01f7d55ce57edb3d46.jpg',\n    thumbUrl: 'https://p0.ssl.qhimgs4.com/t01f7d55ce57edb3d46.jpg',\n  }, {\n    uid: -2,\n    name: 'zzz.png',\n    status: 'done',\n    url: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',\n    thumbUrl: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',\n  }],\n};\n\nclass Demo3 extends Component {\n  render(){\n    return(\n      <div>\n        <Upload {...demo4props}>\n          <Icon type=\"uf-plus\" style={{fontSize:'22px'}}/> \n          <p>Upload</p>\n        </Upload>\n      </div>\n    )\n  }\n}\n\nexport default Demo3;\n","desc":" 图片文件列表以图片的形式展示。关键参数 `listType:picture`。"},{"example":<Demo4 />,"title":" 自定义`Upload`","code":"/**\r\n * @title 自定义`Upload`\r\n * @description 自定义上传文件的数量，且最近上传的文件会替代老文件。\r\n */\r\n\r\nimport React, { Component } from 'react';\nimport { Button, Icon, Upload } from 'tinper-bee';\r\n\n\n\r\n\r\nclass Demo4 extends Component{\r\n  constructor(props) {\r\n    super(props);\r\n    this.state = {\r\n      fileList: [{\r\n        uid: -1,\r\n        name: 'xxx.png',\r\n        status: 'done',\r\n        url: 'http://www.baidu.com/xxx.png',\r\n      }],\r\n    };\r\n  }\r\n  handleChange(info) {\r\n    let fileList = info.fileList;\r\n\r\n    //  自定义上传数量，只显示最近上传的文件   \r\n    fileList = fileList.slice(-2);\r\n\r\n    // 读取返回数据，并显示成文件链接形式\r\n    fileList = fileList.map((file) => {\r\n      if (file.response) {\r\n        //组件会显示文件链接为超链接形式\r\n        file.url = file.response.url;\r\n      }\r\n      return file;\r\n    });\r\n\r\n    // 通过从服务器返回的结果，过滤上传成功的文件\r\n    fileList = fileList.filter((file) => {\r\n      if (file.response) {\r\n        return file.response.status === 'success';\r\n      }\r\n      return true;\r\n    });\r\n\r\n    this.setState({ fileList });\r\n  }\r\n  render() {\r\n    const props = {\r\n      action: '/upload.do',\r\n      onChange: this.handleChange.bind(this),\r\n      multiple: true,\r\n    };\r\n    return (\r\n      <Upload {...props} fileList={this.state.fileList}>\r\n        <Button colors=\"primary\" shape=\"border\">\r\n          <Icon type=\"uf-upload\" /> upload\r\n        </Button>\r\n      </Upload>\r\n    );\r\n  }\r\n};\r\n\r\nexport default Demo4;","desc":" 自定义上传文件的数量，且最近上传的文件会替代老文件。"},{"example":<Demo5 />,"title":" 拖拽`Upload`","code":"/**\r\n * @title 拖拽`Upload`\r\n * @description 文件以拖拽的形式上传。\r\n */\r\n\r\nimport React, { Component } from 'react';\nimport { Button, Icon, Upload } from 'tinper-bee';\r\n\n\n\r\n\r\nconst Dragger = Upload.Dragger;\r\n\r\nconst demo6props = {\r\n  name: 'file',\r\n  multiple: true,\r\n  showUploadList: false,\r\n  action: '/upload.do',\r\n  onChange(info) {\r\n    const status = info.file.status;\r\n    if (status !== 'uploading') {\r\n      console.log(info.file, info.fileList);\r\n    }\r\n    if (status === 'done') {\r\n\r\n      console.log(`${info.file.name} file uploaded successfully.`);\r\n    } else if (status === 'error') {\r\n      console.log(`${info.file.name} file upload failed.`);\r\n    }\r\n  },\r\n};\r\n\r\n\r\nclass Demo5 extends Component {\r\n  render(){\r\n    return( \r\n      <div style={{ marginTop: 16, height: 180 }}>\r\n        <Dragger {...demo6props}>\r\n          <p className=\"u-upload-drag-icon\">\r\n            <Icon type=\"inbox\" className=\"uf-upload\" />\r\n          </p>\r\n          <p className=\"u-upload-text\">Click or drag file to this area to upload</p>\r\n          <p className=\"u-upload-hint\">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>\r\n        </Dragger>\r\n      </div>\r\n    )\r\n  }\r\n}\r\n\r\nexport default Demo5;","desc":" 文件以拖拽的形式上传。"},{"example":<Demo6 />,"title":" 限制文件类型","code":"/**\r\n * @title 限制文件类型\r\n * @description 自定义上传文件的类型。关键参数accept:image/* 所有图片格式  accept:image/png,image/gif  限制个别文件类型\r\n */\r\n\r\nimport React, { Component } from 'react';\nimport { Button, Icon, Upload } from 'tinper-bee';\r\n\n\n\r\n\r\nconst demo6props = {\r\n  name: 'file',\r\n  action: '/upload.do',\r\n  accept:\"image/*\",\r\n  // accept:\"image/png,image/gif\", //限制个别图片类型\r\n  size:300,\r\n  headers: {\r\n    authorization: 'authorization-text',\r\n  }\r\n};\r\n\r\nclass Demo6 extends Component {\r\n\trender(){\r\n\t\treturn( \r\n\t\t\t<Upload {...demo6props}>\r\n        <Button shape=\"border\">\r\n          <Icon type=\"uf-upload\" /> Click to Upload\r\n        </Button>\r\n      </Upload>\r\n\t\t)\r\n\t}\r\n}\r\n\r\nexport default Demo6;","desc":" 自定义上传文件的类型。关键参数accept:image/* 所有图片格式  accept:image/png,image/gif  限制个别文件类型"},{"example":<Demo7 />,"title":" 限制文件大小","code":"/**\r\n * @title 限制文件大小\r\n * @description 限制自定义上传文件的大小。选中文件后触发beforeUpload回调，通过true/false来确定是否继续上传【file.size/1024*100 单位 KB、file.size/1024 单位 M 】\r\n */\r\n\r\nimport React, { Component } from 'react';\nimport { Button, Icon, Upload } from 'tinper-bee';\r\n\n\n\r\n\r\nconst demo7props = {\r\n  name: 'file',\r\n  action: '/upload.do',\r\n  accept:\"image/*\",\r\n  size:300,\r\n  headers: {\r\n    authorization: 'authorization-text',\r\n  },\r\n  beforeUpload(file){\r\n      let maxsize = 3000;\r\n      return (file.size/1024*100)>= maxsize?false:true;\r\n  },\r\n};\r\n\r\nclass Demo7 extends Component {\r\n\trender(){\r\n\t\treturn( \r\n\t\t\t<Upload {...demo7props}>\r\n        <Button shape=\"border\">\r\n          <Icon type=\"uf-upload\" /> Click to Upload\r\n        </Button>\r\n      </Upload>\r\n\t\t)\r\n\t}\r\n}\r\n\r\nexport default Demo7;","desc":" 限制自定义上传文件的大小。选中文件后触发beforeUpload回调，通过true/false来确定是否继续上传【file.size/1024*100 单位 KB、file.size/1024 单位 M 】"}]


class Demo extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    handleClick=()=> {
        this.setState({ open: !this.state.open })
    }
    fCloseDrawer=()=>{
        this.setState({
            open: false
        })
    }

    render () {
        const { title, example, code, desc, scss_code  } = this.props;

        const header = (
            <div>
                <p className='component-title'>{ title }</p>
                <p>{ desc }</p>
                <span className='component-code' onClick={this.handleClick}> 查看源码 <i className='uf uf-arrow-right'/> </span>
            </div>
        );
        return (
            <Col md={12} id={title.trim()} className='component-demo'>
            <Panel header={header}>
                {example}
            </Panel>
           
            <Drawer className='component-drawerc' title={title} show={this.state.open} placement='right' onClose={this.fCloseDrawer}>
            <div className='component-code-copy'> JS代码 
                <Clipboard action="copy" text={code}/>
            </div>
            <pre className="pre-js">
                <code className="hljs javascript">{ code }</code>
            </pre >
            {!!scss_code ?<div className='component-code-copy copy-css'> SCSS代码 
                <Clipboard action="copy" text={scss_code}/>
            </div>:null }
                { !!scss_code ? <pre className="pre-css">
                 <code className="hljs css">{ scss_code }</code>
                 </pre> : null }
            </Drawer>
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
            <Demo example= {child.example} title= {child.title} code= {child.code} scss_code= {child.scss_code} desc= {child.desc} key= {index}/>
    )

    })}
    </Row>
    )
    }
}

ReactDOM.render(<DemoGroup/>, document.getElementById('tinperBeeDemo'));
