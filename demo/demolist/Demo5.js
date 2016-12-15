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