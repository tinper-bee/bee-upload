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