/**
 * @title 可视化图片`Upload`
 * @description 自定义上传图片格式，上传成功后以缩略图的形式显示。
 */
 
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
