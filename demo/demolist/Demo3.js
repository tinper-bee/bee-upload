/**
 * @title 列表`Upload`
 * @description 自定义已上传文件列表。
 */

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
          <Icon type="uf-upload" /> Click to Upload
        </Button>
      </Upload>
    )
  }
}