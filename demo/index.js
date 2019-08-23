import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Con, Row, Col } from 'bee-layout';
import { Panel } from 'bee-panel';
import Drawer from 'bee-drawer';
import Clipboard from 'bee-clipboard'; 
import Button from '../src';



var Demo1 = require("./demolist/Demo1");var Demo2 = require("./demolist/Demo2");var Demo3 = require("./demolist/Demo3");var Demo4 = require("./demolist/Demo4");var Demo5 = require("./demolist/Demo5");var Demo6 = require("./demolist/Demo6");var Demo7 = require("./demolist/Demo7");var DemoArray = [{"example":<Demo1 />,"title":" 常用按钮Upload","code":"/**\n * @title 常用按钮Upload\n * @description 通过定义props，来自定义上传文件和服务地址等信息。在onChange方法的参数info，是上传返回的回调参数。常用的是上传的状态。\n */\n\n\nimport React, { Component } from 'react';\nimport { Button, Icon, Upload } from 'tinper-bee';\n\n\nconst props = {\n  name: 'file',\n  action: '/upload.do',\n  headers: {\n    authorization: 'authorization-text',\n  },\n  onChange(info) {\n    if (info.file.status !== 'uploading') {\n      console.log(info.file, info.fileList);\n    }\n    if (info.file.status === 'done') {\n      console.log(`${info.file.name} file uploaded successfully`);\n    } else if (info.file.status === 'error') {\n      console.log(`${info.file.name} file upload failed.`);\n    }\n  },\n};\n\nclass Demo1 extends Component {\n\trender(){\n\t\treturn( \n\t\t\t<Upload {...props}>\n        <Button shape=\"border\">\n          <Icon type=\"uf-upload\" /> Click to Upload\n        </Button>\n      </Upload>\n\t\t)\n\t}\n}\n\nexport default Demo1;","desc":" 通过定义props，来自定义上传文件和服务地址等信息。在onChange方法的参数info，是上传返回的回调参数。常用的是上传的状态。"},{"example":<Demo2 />,"title":" 列表`Upload`","code":"/**\n * @title 列表`Upload`\n * @description 自定义已上传文件列表。\n */\n\nimport React, { Component } from 'react';\nimport { Button, Icon, Upload } from 'tinper-bee';\n\n\nconst demo2props = {\n  action: '/upload.do',\n  onChange(info) {\n    if (info.file.status !== 'uploading') {\n      console.log(info.file);\n      console.log(info.fileList);\n    }\n  },\n  defaultFileList: [{\n    uid: -1,\n    name: 'xxx.png',\n    status: 'done',\n    url: 'http://www.baidu.com/xxx.png',\n  }, {\n    uid: -2,\n    name: 'yyy.png',\n    status: 'done',\n    url: 'http://www.baidu.com/yyy.png',\n  }],\n};\nclass Demo2 extends Component {\n  render(){\n    return( \n      <Upload {...demo2props}>\n        <Button type=\"primary\" shape=\"border\">\n          <Icon type=\"uf-upload\" /> Click to Upload\n        </Button>\n      </Upload>\n    )\n  }\n}\n\nexport default Demo2;","desc":" 自定义已上传文件列表。"},{"example":<Demo3 />,"title":" 图片列表`Upload`","code":"/**\n * @title 图片列表`Upload`\n * @description 图片文件列表以图片的形式展示。关键参数 `listType:picture`。\n */\n\nimport React, { Component } from 'react';\nimport { Button, Icon, Upload } from 'tinper-bee';\n\n\nconst demo4props = {\n  action: '/upload.do',\n  listType: 'picture',\n  defaultFileList: [{\n    uid: -1,\n    name: 'xxx.png',\n    status: 'done',\n    url: 'http://design.yyuap.com/images/icon1.png',\n    thumbUrl: 'http://design.yyuap.com/images/icon1.png',\n  }, {\n    uid: -2,\n    name: 'yyy.png',\n    status: 'done',\n    url: 'http://design.yyuap.com/images/icon1.png',\n    thumbUrl: 'http://design.yyuap.com/images/icon1.png',\n  }],\n};\n\nclass Demo3 extends Component {\n  render(){\n    return( \n      <div>\n        <Upload {...demo4props}>\n          <Button type=\"primary\" shape=\"border\">\n            <Icon type=\"uf-upload\" /> upload\n          </Button>\n        </Upload>\n      </div>\n    )\n  }\n}\n\nexport default Demo3;","desc":" 图片文件列表以图片的形式展示。关键参数 `listType:picture`。"},{"example":<Demo4 />,"title":" 自定义`Upload`","code":"/**\n * @title 自定义`Upload`\n * @description 自定义上传文件的数量，且最近上传的文件会替代老文件。\n */\n\nimport React, { Component } from 'react';\nimport { Button, Icon, Upload } from 'tinper-bee';\n\n\nclass Demo4 extends Component{\n  constructor(props) {\n    super(props);\n    this.state = {\n      fileList: [{\n        uid: -1,\n        name: 'xxx.png',\n        status: 'done',\n        url: 'http://www.baidu.com/xxx.png',\n      }],\n    };\n  }\n  handleChange(info) {\n    let fileList = info.fileList;\n\n    //  自定义上传数量，只显示最近上传的文件   \n    fileList = fileList.slice(-2);\n\n    // 读取返回数据，并显示成文件链接形式\n    fileList = fileList.map((file) => {\n      if (file.response) {\n        //组件会显示文件链接为超链接形式\n        file.url = file.response.url;\n      }\n      return file;\n    });\n\n    // 通过从服务器返回的结果，过滤上传成功的文件\n    fileList = fileList.filter((file) => {\n      if (file.response) {\n        return file.response.status === 'success';\n      }\n      return true;\n    });\n\n    this.setState({ fileList });\n  }\n  render() {\n    const props = {\n      action: '/upload.do',\n      onChange: this.handleChange.bind(this),\n      multiple: true,\n    };\n    return (\n      <Upload {...props} fileList={this.state.fileList}>\n        <Button colors=\"primary\" shape=\"border\">\n          <Icon type=\"uf-upload\" /> upload\n        </Button>\n      </Upload>\n    );\n  }\n};\n\nexport default Demo4;","desc":" 自定义上传文件的数量，且最近上传的文件会替代老文件。"},{"example":<Demo5 />,"title":" 拖拽`Upload`","code":"/**\n * @title 拖拽`Upload`\n * @description 文件以拖拽的形式上传。\n */\n\nimport React, { Component } from 'react';\nimport { Button, Icon, Upload } from 'tinper-bee';\n\n\nconst Dragger = Upload.Dragger;\n\nconst demo6props = {\n  name: 'file',\n  multiple: true,\n  showUploadList: false,\n  action: '/upload.do',\n  onChange(info) {\n    const status = info.file.status;\n    if (status !== 'uploading') {\n      console.log(info.file, info.fileList);\n    }\n    if (status === 'done') {\n\n      console.log(`${info.file.name} file uploaded successfully.`);\n    } else if (status === 'error') {\n      console.log(`${info.file.name} file upload failed.`);\n    }\n  },\n};\n\n\nclass Demo5 extends Component {\n  render(){\n    return( \n      <div style={{ marginTop: 16, height: 180 }}>\n        <Dragger {...demo6props}>\n          <p className=\"u-upload-drag-icon\">\n            <Icon type=\"inbox\" className=\"uf-upload\" />\n          </p>\n          <p className=\"u-upload-text\">Click or drag file to this area to upload</p>\n          <p className=\"u-upload-hint\">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>\n        </Dragger>\n      </div>\n    )\n  }\n}\n\nexport default Demo5;","desc":" 文件以拖拽的形式上传。"},{"example":<Demo6 />,"title":" 限制文件类型","code":"/**\n * @title 限制文件类型\n * @description 自定义上传文件的类型。关键参数accept:image/* 所有图片格式  accept:image/png,image/gif  限制个别文件类型\n */\n\nimport React, { Component } from 'react';\nimport { Button, Icon, Upload } from 'tinper-bee';\n\n\nconst demo6props = {\n  name: 'file',\n  action: '/upload.do',\n  accept:\"image/*\",\n  // accept:\"image/png,image/gif\", //限制个别图片类型\n  size:300,\n  headers: {\n    authorization: 'authorization-text',\n  }\n};\n\nclass Demo6 extends Component {\n\trender(){\n\t\treturn( \n\t\t\t<Upload {...demo6props}>\n        <Button shape=\"border\">\n          <Icon type=\"uf-upload\" /> Click to Upload\n        </Button>\n      </Upload>\n\t\t)\n\t}\n}\n\nexport default Demo6;","desc":" 自定义上传文件的类型。关键参数accept:image/* 所有图片格式  accept:image/png,image/gif  限制个别文件类型"},{"example":<Demo7 />,"title":" 限制文件大小","code":"/**\n * @title 限制文件大小\n * @description 限制自定义上传文件的大小。选中文件后触发beforeUpload回调，通过true/false来确定是否继续上传【file.size/1024*100 单位 KB、file.size/1024 单位 M 】\n */\n\nimport React, { Component } from 'react';\nimport { Button, Icon, Upload } from 'tinper-bee';\n\n\nconst demo7props = {\n  name: 'file',\n  action: '/upload.do',\n  accept:\"image/*\",\n  size:300,\n  headers: {\n    authorization: 'authorization-text',\n  },\n  beforeUpload(file){\n      let maxsize = 3000;\n      return (file.size/1024*100)>= maxsize?false:true;\n  },\n};\n\nclass Demo7 extends Component {\n\trender(){\n\t\treturn( \n\t\t\t<Upload {...demo7props}>\n        <Button shape=\"border\">\n          <Icon type=\"uf-upload\" /> Click to Upload\n        </Button>\n      </Upload>\n\t\t)\n\t}\n}\n\nexport default Demo7;","desc":" 限制自定义上传文件的大小。选中文件后触发beforeUpload回调，通过true/false来确定是否继续上传【file.size/1024*100 单位 KB、file.size/1024 单位 M 】"}]


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
