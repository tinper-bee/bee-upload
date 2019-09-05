/**
 * @title 图片列表`Upload`
 * @description 图片文件列表以图片的形式展示。关键参数 `listType:picture`。
 */

import React, { Component } from 'react';
import Icon from 'bee-icon';
import Button from 'bee-button';
import Modal from 'bee-modal'
import Upload from '../../src';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
const demo4props = {
  action: '/upload.do',
  listType: 'picture-card',
  defaultFileList: [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'https://p0.ssl.qhimgs4.com/t01f7d55ce57edb3d46.jpg',
    thumbUrl: 'https://p0.ssl.qhimgs4.com/t01f7d55ce57edb3d46.jpg',
  }, {
    uid: -2,
    name: 'zzz.png',
    status: 'done',
    url: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',
    thumbUrl: 'https://p0.ssl.qhimgs4.com/t010e11ecf2cbfe5fd2.png',
  }],
};

class Demo3 extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
  }
  handleCancel = () => this.setState({ previewVisible: false })
  handlePreview = file => {
    var displayPreview = ()=>{
      this.setState({
        previewImage: file.url || file.preview,
        previewVisible: true,
      });
    }
    if (!file.url && !file.preview) {
      getBase64(file.originFileObj).then(displayPreview)
    }else {
      displayPreview()
    }


  }
  render(){
    const { previewVisible, previewImage } = this.state
    return(
      <div>
        <Upload {...demo4props} onPreview={this.handlePreview}>
          <Button type="primary" shape="border">
            <Icon type="uf-upload" /> upload
          </Button>
        </Upload>
        <Modal show={previewVisible} onHide={this.handleCancel}>
          <Modal.Header closeButton>
            <Modal.Title>大图预览</Modal.Title>
          </Modal.Header >
          <Modal.Body>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}

export default Demo3;
