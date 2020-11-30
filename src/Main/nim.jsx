import React, { Component } from "react";
import Pile from "./pile.jsx";
import "./cssForNim.css";

class Nim extends Component {
  state = {
    welcomeMessage: <h1>Welcome to Game . . . </h1>,
    isHomePage: false,
    isRotated: false,
    isHintShown: false,
    isLoaded: false,
    loadingString: "",
    uniqueId: 1,
    botTurn: false,
    myRow: [],
  };
  render() {
    if (this.state.uniqueId == 1) this.createMyRow();
    if (this.state.botTurn) this.botPlay();
    if (this.state.myRow.length == 0) {
      if (this.state.botTurn) {
        return <h1>YOU WON</h1>;
      }
      return <h1>YOU LOST</h1>;
    }
    return (
      <div>
        <div className="flip-box">
          <div className="flip-box-inner" id="myRot">
            <div className="flip-box-front">{this.frontSide()}</div>
            <div className="flip-box-back">{this.backSide()}</div>
          </div>
        </div>
      </div>
    );
  }
  incrementId = () => {
    const newId = this.state.uniqueId++;
    console.log("id", this.state.uniqueId, newId);
    // this.setState({ uniqueId: uniqueId + 1 });
    // console.log("id", this.state.uniqueId, newId);
    return newId;
    // this.setState({ uniqueId: this.state.uniqueId + 1 });
  };

  rotate = () => {
    if (!this.state.isRotated)
      document.querySelector("#myRot").style.transform = `rotateY(180deg)`;
    else document.querySelector("#myRot").style.transform = `rotateY(360deg)`;
    this.setState({ isRotated: !this.state.isRotated });
  };
  createMyRow = () => {
    let myNewRow = [];
    for (let i = 0; i < 5; i++) {
      myNewRow = [
        ...myNewRow,
        {
          value: 5 + (Math.round(Math.random() * 5) % 5),
          unid: this.incrementId(),
        },
      ];
    }
    this.setState({ myRow: myNewRow });
    console.log("NEWROW: ", myNewRow);
  };
  calculateRes = () => {
    let val = 0;
    // console.log("IN BOT: ");
    this.state.myRow.forEach((i) => {
      val ^= i.value;
    });
    return val;
  };
  botPlay = () => {
    const sleep = (milliseconds) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };
    async function demo(thi) {
      await sleep(2000);
      console.log("IN BOT PLAY");
      let newRow = [...thi.state.myRow],
        res = thi.calculateRes(),
        isChanged = false;
      console.log(newRow, res);
      if (res) {
        newRow.map((i) => {
          if (!isChanged && (i.value ^ res) <= i.value) {
            console.log("changed", i.value);
            i.value ^= res;
            isChanged = true;
          }
        });
      } else {
        newRow[Math.round(Math.random() * 50) % newRow.length].value--;
        console.log("zero res");
      }
      newRow = newRow.filter((i) => {
        return i.value;
      });
      console.log(newRow, res);
      thi.setState({ myRow: newRow });
    }
    if (this.state.botTurn) demo(this);
    this.state.botTurn = false;
    this.setState({ botTurn: false });
  };
  logic = (rowid, count) => {
    console.log("IN LOGIC: ");
    console.log(rowid, count);
    this.state.myRow.map((i) => {
      if (i.unid == rowid) i.value -= count;
    });
    this.state.myRow = this.state.myRow.filter((i) => {
      return i.value;
    });
    // console.log(this.state.myRow);
    this.setState({ myRow: this.state.myRow, botTurn: true });
  };
  frontSide = () => {
    if (this.state.isHomePage) {
      // return (<Pile />);
      // this.setState({ isHomePage: false });
      // this.rotate();
      this.loader();
      return (
        <div>
          <h1>Welcome to the Game</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              this.rotate();
              this.setState({ isHomePage: false });
            }}
          >
            Start
          </button>
          <div
            style={{
              color: "#cc6699",
              position: "absolute",
              bottom: "10vh",
            }}
          >
            {this.state.loadingString}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {this.state.myRow.map((i) => (
            <div style={{ float: "left", paddingLeft: 50 }}>
              <Pile
                count={i.value}
                key={i.unid}
                rowId={i.unid}
                myLeftPadding={5}
                uniqueId={this.state.uniqueId}
                incrementId={this.incrementId}
                logic={this.logic}
              ></Pile>
            </div>
          ))}
          {/* <div style={{ float: "left", paddingLeft: 20 }}>
            <Pile
              count={10}
              myLeftPadding={5}
              uniqueId={this.state.uniqueId}
              incrementId={this.incrementId}
            ></Pile>
          </div>
          <div style={{ float: "left", paddingLeft: 50 }}>
            <Pile
              count={10}
              myLeftPadding={5}
              uniqueId={this.state.uniqueId}
              incrementId={this.incrementId}
            ></Pile>
          </div> */}
        </div>
      );
    }
  };

  backSide = () => {
    if (!this.state.isHintShown) {
      return (
        <div>
          <h1>Rules of the Game</h1>

          <ul>
            <li></li>
          </ul>
          <button onClick={this.rotate}></button>
        </div>
      );
    }
  };

  loader = () => {
    const sleep = (milliseconds) => {
      return new Promise((resolve) => setTimeout(resolve, milliseconds));
    };
    let i = window.innerWidth;
    console.log("WID", i);
    async function demo(thi) {
      for (let i = 300; i < window.innerWidth; i += 10) {
        if (i < 350) await sleep(200);
        else await sleep(10);
        thi.setState({ loadingString: thi.state.loadingString + "█" });
      }
      thi.rotate();
      thi.setState({ isHomePage: false });
    }
    if (!this.state.isLoaded) demo(this);
    this.state.isLoaded = true;
  };
}
export default Nim;
