import React, { Component } from "react";

class Chat extends Component {
  state = {
    messages: [],
    message: "",
    newmessages: 0,
  };
  handleMessage = (e) => {
    this.setState({ message: e.target.value });
    console.log(this.state.message);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      messages: [
        ...prevState.messages,
        { sender: "Patient", data: this.state.message },
      ],
    }));
    console.log(this.state.messages);
    this.setState({ message: "", sender: "Patient" });
  };
  render() {
    return (
      <>
        <div>
          {this.state.messages.length > 0 ? (
            this.state.messages.map((item, index) => (
              <div key={index} style={{ textAlign: "left" }}>
                <p style={{ wordBreak: "break-all" }}>
                  <b>{item.sender}</b>: {item.data}
                </p>
              </div>
            ))
          ) : (
            <p>No message yet</p>
          )}
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Message"
            value={this.state.message}
            onChange={(e) => this.handleMessage(e)}></input>
          <input type="submit" />
        </form>
      </>
    );
  }
}
export default Chat;
