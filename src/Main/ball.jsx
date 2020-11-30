import React, { Component } from "react";
import "./cssForBall.css";

class Ball extends Component {
  state = {
    // isBurst: this.props.isBurst,
    toDisplay: true,
    //  myId ={{this.props.count}}
  };
  myId = "hi" + this.props.uniqueId;
  render() {
    // console.log("in ball col = ", this.props.col);
    // console.log(this.myId, this.props.uniqueId);
    if (!this.state.toDisplay) return "";
    if (this.props.isHover != -1) this.hover();
    return (
      <span
        id={this.myId}
        className="circleBall"
        onPointerEnter={() => {
          this.props.hovered(this.props.uniqueId, 1);
          // this.hover();
        }}
        onPointerLeave={() => {
          // console.log(4);
          this.props.hovered(this.props.uniqueId, 0);
        }}
        onClick={() => {
          // this.setState({ isBurst: true });
          this.props.bursted(this.props.uniqueId);
        }}
        style={{}}
      >
        {this.createAndBurst()}
      </span>
    );
  }
  hover = () => {
    // const sleep = (milliseconds) => {
    //   return new Promise((resolve) => setTimeout(resolve, milliseconds));
    // };
    // async function demo(thi) {
    //   // document.querySelector("#" + thi.myId).style.padding = `20px`;
    //   // document.querySelector("#" + this.myId).style.transform = `scale(2,2)`;
    //   // await sleep(1000);
    //   // console.log("in hover");
    //   while (thi.props.isHover && thi.state.toDisplay) {
    //     document.querySelector("#" + thi.myId).style.padding = `20px`;
    //     return;
    //     document.querySelector(
    //       "#" + thi.myId
    //     ).style.transform = `rotateY(360deg)`;
    //     await sleep(1000);
    //     if (!thi.state.toDisplay) break;
    //     document.querySelector(
    //       "#" + thi.myId
    //     ).style.transform = `rotateY(0deg)`;
    //     await sleep(1000);
    //     break;
    //   }
    //   // document.querySelector(".circleBall").style.color = `black`;
    // }
    // if (this.props.isHover)
    if (this.props.isHover)
      document.querySelector("#" + this.myId).style.transform = `scale(2,2)`;
    // document.querySelector("#" + this.myId).style.padding = `15px`;
    else document.querySelector("#" + this.myId).style.transform = `None`;
    // document.querySelector("#" + this.myId).style.padding = `0px`;
    // demo(this);
  };
  createAndBurst = () => {
    // console.log("In create");
    if (this.props.isBurst) {
      const sleep = (milliseconds) => {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
      };
      async function demo(thi) {
        // document.querySelector("#" + thi.myId).style.padding = `20px`;
        document.querySelector("#" + thi.myId).style.transform = `none`;
        // console.log("FROM: BALL");
        await sleep(1000);
        if (!thi.state.toDisplay) return "";
        document.querySelector(
          "#" + thi.myId
        ).style.transform = `rotateY(720deg)`;
        await sleep(2000);
        // console.log("FROM: BALL");
        thi.setState({ toDisplay: false });
        // document.querySelector(".circleBall").style.color = `black`;
      }
      demo(this);
    }
    return this.props.count;
  };
}

export default Ball;
