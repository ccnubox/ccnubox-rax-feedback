import {createElement, Component} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import styles from './App.css';
import TextInput from 'rax-textinput';
import Touchable from 'rax-touchable';
import feedbackService from './services/index';
import Toast from 'universal-toast';
// const native = require("@weex-module/test");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact: "",
      content: ""
    }
  }
  sendFeedback = () => {
    let data = {
      "contact": this.state.contact,
      "feedback": this.state.content
    }
    feedbackService.postFeedback(data).then(res => {
      Toast.show('反馈成功', Toast.SHORT)
    })
  };
  onContactChange = () => {
    this.setState({
      contact: event.nativeEvent.text
    })
  };
  onContentChange = () => {
    this.setState({
      content: event.nativeEvent.text
    })
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
            />
          </View>
          <TextInput
            placeholder="您的意见"
            value={this.state.content}
            onChange={this.onContentChange}
            multiline={true}
            ref="input"
            style={[styles.inputContent, styles.fontSize]}
            />
          <Touchable onPress={this.sendFeedback} style={[styles.submitBox, styles.center]}>
            <Text style={[styles.fontSize, styles.sendText]}>发送</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

export default App;
