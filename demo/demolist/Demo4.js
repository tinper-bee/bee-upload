/**
 * @title 图片列表`Upload`
 * @description 图片文件列表以图片的形式展示。关键参数 `listType:picture`。
 */

const demo4props = {
  action: '/upload.do',
  listType: 'picture',
  defaultFileList: [{
    uid: -1,
    name: 'xxx.png',
    status: 'done',
    url: 'http://design.yyuap.com/logos/logox.png',
    thumbUrl: 'http://design.yyuap.com/logos/logox.png',
  }, {
    uid: -2,
    name: 'yyy.png',
    status: 'done',
    url: 'http://design.yyuap.com/logos/logox.png',
    thumbUrl: 'http://design.yyuap.com/logos/logox.png',
  }],
};

class Demo4 extends Component {
  render(){
    return( 
      <div>
        <Upload {...demo4props}>
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