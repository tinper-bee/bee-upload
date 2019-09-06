/**
 * @title 图片列表`Upload`
 * @description 图片文件列表以图片的形式展示。关键参数 `listType:picture`。
 */

import React, { Component } from 'react';
import Icon from 'bee-icon';
import Button from 'bee-button';
import Upload from '../../src';

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
  render(){
    return(
      <div>
        <Upload {...demo4props}>
          <Button type="primary" shape="border">
            <Icon type="uf-upload" /> upload
          </Button>
        </Upload>
      </div>
    )
  }
}

export default Demo3;
