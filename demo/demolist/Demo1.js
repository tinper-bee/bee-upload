/**
 * @title Checkbox
 * @description `checked` 参数设置是否选中，`disabled`设置是否可用。
 */
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