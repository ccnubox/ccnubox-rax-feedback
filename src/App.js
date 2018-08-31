import { createElement, Component } from "rax";
import View from "rax-view";
import Text from "rax-text";
import styles from "./App.css";
import TextInput from "rax-textinput";
import Touchable from "rax-touchable";
import feedbackService from "./services/index";
import Toast from "universal-toast";
const native = require("@weex-module/test");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: "",
      content: ""
    };
  }
  sendFeedback = () => {
    if (this.state.contact === "" || this.state.content === "") {
      alert("请填写完整您的联系方式和反馈信息");
      return;
    }
    let data = {
      contact: this.state.contact,
      content: this.state.content
    };
    feedbackService.postFeedback(data).then(res => {
      Toast.show("反馈成功，感谢您的配合", Toast.SHORT);
      native.back();
    }).catch(e => {
      alert(JSON.stringify(e))
    })
  };
  onContactChange = (event) => {
    this.setState({
      contact: event.nativeEvent.text
    });
  };
  onContentChange = (event) => {
    this.setState({
      content: event.nativeEvent.text
    });
  };

  render() {
    return (
      <View style={styles.app}>
        <View style={styles.box}>
          <View style={[styles.contactBox]}>
            <View style={[styles.contactTip, styles.center]}>
              <Text style={[styles.tipText, styles.fontSize]}>联系方式</Text>
            </View>
            <TextInput
              value={this.state.contact}
              ref="input"
              style={[styles.contactInput, styles.fontSize]}
              onChange={this.onContactChange}
              placeholder="请填写您联系方式（电话/QQ）"
            />
          </View>
          <TextInput
            placeholder="请填写您的意见，欢迎加入华师匣子交流群 576225292 反馈您的问题"
            value={this.state.content}
            onChange={this.onContentChange}
            multiline={true}
            ref="input"
            style={[styles.inputContent, styles.fontSize]}
          />
          <Touchable
            onPress={this.sendFeedback}
            style={[styles.submitBox, styles.center]}
          >
            <Text style={[styles.fontSize, styles.sendText]}>发送</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

export default App;
