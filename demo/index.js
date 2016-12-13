//import Demo from './UploadDemo';
import Upload from '../src';
import Button from 'bee-button';
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import Icon from 'bee-icon';

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
}

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
}

//限制显示的上传文件数量 根据服务器返回的结果显示上传的文件

class Demo4 extends Component{
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
};

//列表形式显示图片列表
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
}

const Dragger = Upload.Dragger;

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
}


ReactDOM.render(<Demo1 />, document.getElementById('ReactUploadDemo1'));
ReactDOM.render(<Demo2 />, document.getElementById('ReactUploadDemo2'));
ReactDOM.render(<Demo3 />, document.getElementById('ReactUploadDemo3'));
ReactDOM.render(<Demo4 />, document.getElementById('ReactUploadDemo4'));
ReactDOM.render(<Demo5 />, document.getElementById('ReactUploadDemo5'));
ReactDOM.render(<Demo6 />, document.getElementById('ReactUploadDemo6'));
