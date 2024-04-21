import "./App.css";
import React, { Component } from "react";
import TOC from "./components/TOC";
import Subject from "./components/Subject";
import Control from "./components/Control";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";

class App extends Component {
  // constructor
  constructor(props) {
    super(props);
    // state
    this.max_content_id = 3;
    this.state = {
      mode: "Create",
      selected_content_id: 2,
      subject: { title: "WEB", sub: "World Wide Web!" },
      welcome: { title: "Welcome", desc: "Hello, React!!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
      ],
    };
  }
  render() {
    // re-rendering
    var _title,
      _desc,
      _article = null;
    if (this.state.mode === "Welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "Read") {
      // 선택한 content에 맞는 데이터 출력하기
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];

        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }

        i = i + 1;
      }
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode == "Create") {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            // add content to this.state.contetns
            this.max_content_id = this.max_content_id + 1;
            // this.state.contents.push({
            //   id: this.max_content_id,
            //   title: _title,
            //   desc: _desc,
            // });
            var _contents = this.state.contents.concat({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            var newContents = Array.from(this.state.contents);
            newContents.push({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            this.setState({
              contents: newContents,
            });
          }.bind(this)}
        ></CreateContent>
      );
    }

    return (
      <div className="App">
        <Subject
          // props
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({
              mode: "Welcome",
            });
          }.bind(this)}
        ></Subject>
        <TOC
          onChangePage={function (id) {
            this.setState({
              mode: "Read",
              selected_content_id: Number(id),
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>
        <Control
          onChangeMode={function (_mode) {
            this.setState({
              mode: _mode,
            });
          }.bind(this)}
        ></Control>
        {_article}
      </div>
    );
  }
}

export default App;
