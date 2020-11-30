import React, { Component } from "react";
import Ball from "./ball.jsx";

class Pile extends Component {
  state = { col: [], isFirst: true, animation: false };
  render() {
    // console.log(this.props.count);
    this.colCreater();
    console.log("in pile ", this.state.col);
    if (this.state.col.length)
      return this.state.col.map((i) => (
        <div
          style={{
            position: "relative",
            width: 30,
            // float: "left",
            left: this.props.myLeftPadding,
            top: 30,
          }}
        >
          <Ball
            count={i.count}
            col={this.state.col}
            key={i.count}
            isBurst={i.isBurst}
            bursted={this.bursted}
            uniqueId={i.uniqueId}
            isHover={i.isHover}
            hovered={this.hovered}
          ></Ball>
        </div>
      ));
    else return "";
  }

  bursted = (burstedId) => {
    let countToBereduced = 0;
    let newCol = [...this.state.col];
    newCol.map((i) => {
      if (i.uniqueId < burstedId) {
        i.isBurst = true;
        // console.log("from bursted", i);
      } else if (i.uniqueId == burstedId) {
        i.isBurst = true;
        countToBereduced = i.count;
      }
    });
    this.state.animation = true;
    // this.props.logic(this.props.rowId, countToBereduced);
    console.log("nc", newCol);
    this.setState({ col: newCol });
    this.correctNumbers(countToBereduced);
  };
  hovered = (hoveredId, value) => {
    let newCol = [...this.state.col];
    newCol.map((i) => {
      if (i.uniqueId <= hoveredId) {
        i.isHover = value;
        // console.log("from bursted", i);
      }
    });
    // console.log("nc", newCol);
    this.setState({ col: newCol });
  };

  correctNumbers = (countToBereduced) => {
    const sleep = (milliseconds) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };
    async function demo(thi, countToBereduced) {
      // return;
      await sleep(4000);
      console.log("can start");
      let newCol = [...thi.state.col];
      newCol = newCol.filter((i) => !i.isBurst);
      thi.setState({ col: newCol });
      console.log(newCol);
      if (newCol.length === 0) {
        thi.setState({ col: newCol });
        thi.props.logic(thi.props.rowId, countToBereduced);
        thi.state.animation = false;
        return;
      }
      while (newCol[0].count !== 1) {
        newCol.map((i) => i.count--);
        // console.log(newCol);
        await sleep(500);
        thi.setState({ col: newCol });
      }
      thi.props.logic(thi.props.rowId, countToBereduced);
      thi.state.animation = false;
    }
    demo(this, countToBereduced);
  };

  getId = () => {
    return this.props.incrementId();
  };

  colCreater() {
    console.log("ColCreator");
    if (this.state.col.length == this.props.count || this.state.animation)
      return;
    let newCol = [];
    for (let i = 1; i <= this.props.count; i++) {
      newCol = [
        ...newCol,
        { count: i, isBurst: false, uniqueId: this.getId(), isHover: -1 },
      ];
    }
    console.log(newCol);
    // this.setState({ col: newCol });
    // this.state.col = newCol;
    this.setState({ col: newCol });
    this.state.isFirst = false;
    console.log("org", this.state.col);
  }
}

export default Pile;
