import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Autorenew from "@material-ui/icons/Autorenew";
import HomeIcon from '@material-ui/icons/Home';

let c = 0, 
  hitCount = 0, 
  res1 = null, 
  res2 = null, 
  min = 1, 
  max = 9;
const initialState = {
  temp: [["", "", ""], ["", "", ""], ["", "", ""]],
  metricArray: new Array(3),
  playWithBot: null,
  selectedUserChoice: null,
  botChoice: null,
  gameWonByPlayerX: 0,
  gameWonByPlayerO: 0,
  gameWinner: null,
  RestartGame: null,
  currentTurn: null,
  disableToken: false
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState
  };

  componentDidMount() {
    const {metricArray} = this.state;
    for(let i=0; i  <3; i++){
      metricArray[i] = new Array(3)
      for(let j=0;j<3;j++){
        metricArray[i][j] = ""
      }
    }
  }

  handleMetricChange = async (p, k, choice, calledFromBot) => {
    
    if(this.state.playWithBot){
      this.setState({
        disableToken: true
      })
    }

    if(calledFromBot !== true){ 
      hitCount = hitCount + 1;
      this.state.metricArray[p][k] = choice;
      this.setState({
        metricArray: this.state.metricArray,
        currentTurn: "O"
      });
    }

    //first horizontal line check eg: [0,0],[0,1],[0,2]
    if(this.state.metricArray[0][0] !== '' && this.state.metricArray[0][0] === this.state.metricArray[0][1] && this.state.metricArray[0][1] === this.state.metricArray[0][2]){
      this.handleGameFinish(this.state.playWithBot === false ? this.state.selectedUserChoice : choice);
    }

    //second horizontal line check eg: [1,0],[1,1],[1,2]
    else if(this.state.metricArray[1][0] !== '' && this.state.metricArray[1][0] === this.state.metricArray[1][1] && this.state.metricArray[1][1] === this.state.metricArray[1][2]){
      this.handleGameFinish(this.state.playWithBot === false ? this.state.selectedUserChoice : choice);
    }

    //third horizontal line check eg: [2,0],[2,1],[2,2]
    else if (this.state.metricArray[2][0] !== '' && this.state.metricArray[2][0] === this.state.metricArray[2][1] && this.state.metricArray[2][1] === this.state.metricArray[2][2]){
      this.handleGameFinish(this.state.playWithBot === false ? this.state.selectedUserChoice : choice);
    }

    //first verticle line check eg: [0,0],[1,0],[2,0]
    else if (this.state.metricArray[0][0] !== '' && this.state.metricArray[0][0] === this.state.metricArray[1][0] && this.state.metricArray[1][0] === this.state.metricArray[2][0]){
      this.handleGameFinish(this.state.playWithBot === false ? this.state.selectedUserChoice : choice);
    }

    //second verticle line check eg: [0,1],[1,1],[2,1]
    else if (this.state.metricArray[0][1] !== '' && this.state.metricArray[0][1] === this.state.metricArray[1][1] && this.state.metricArray[1][1] === this.state.metricArray[2][1]){
      this.handleGameFinish(this.state.playWithBot === false ? this.state.selectedUserChoice : choice);
    }

    //third verticle line check eg: [0,2],[1,2],[2,2]
    else if (this.state.metricArray[0][2] !== '' && this.state.metricArray[0][2] === this.state.metricArray[1][2] && this.state.metricArray[1][2] === this.state.metricArray[2][2]){
      this.handleGameFinish(this.state.playWithBot === false ? this.state.selectedUserChoice : choice);
    }

    //right way diagonal line check "\" eg: [0,0],[1,1],[2,2]
    else if (this.state.metricArray[0][0] !== '' && this.state.metricArray[0][0] === this.state.metricArray[1][1] && this.state.metricArray[1][1] === this.state.metricArray[2][2]){
      this.handleGameFinish(this.state.playWithBot === false ? this.state.selectedUserChoice : choice);
    }

    //left way diagonal line check "/" eg: [2,2],[1,1],[0,0]
    else if (this.state.metricArray[2][0] !== '' && this.state.metricArray[2][0] === this.state.metricArray[1][1] && this.state.metricArray[1][1] === this.state.metricArray[0][2]){
      this.handleGameFinish(this.state.playWithBot === false ? this.state.selectedUserChoice : choice);
    }
    else {
      if(hitCount === 9 && this.state.playWithBot === false) {
        this.setState({
          selectedUserChoice: "draw"
        });
      } else if(this.state.playWithBot === false) {
          this.setState({
            selectedUserChoice: this.state.selectedUserChoice === "O" ? "X" : "O",
            currentTurn: this.state.currentTurn === "O" ? "X" : "O"
          });
      } else if(hitCount < 5 && this.state.playWithBot === true && calledFromBot !== true) {
        return this.handleBotChanges(p, k)
      } else if(hitCount === 5 && this.state.playWithBot === true) {
        this.setState({
          selectedUserChoice: "draw"
        });
        return ;
      }
      this.setState({
        disableToken: false
      })
    }
  }

  handleBotChanges = async (p, k) => {
    const { metricArray } = this.state;
    let temp = null
    if(metricArray[0][0] === "O" && metricArray[0][1] === "O" && temp === null) {
      temp = [0, 2]
    }
    
    else if (metricArray[0][0] === "O" && metricArray[0][2] === "O" && metricArray[0][1] === "" && temp === null) {
      temp = [0, 1]
    }

    else if (metricArray[0][1] === "O" && metricArray[0][2] === "O" && metricArray[0][0] === ""  && temp === null) {
      temp = [0, 0]
    }

    else if (metricArray[1][0] === "O" && metricArray[1][1] === "O" && metricArray[1][2] === ""  && temp === null) {
      temp = [1, 2]
    }

    else if (metricArray[1][0] === "O" && metricArray[1][2] === "O" && metricArray[1][1] === ""  && temp === null) {
      temp = [1, 1]
    }
    
    else if (metricArray[1][2] === "O" && metricArray[1][1] === "O" && metricArray[1][0] === ""  && temp === null) {
      temp = [1, 0]
    }

    else if (metricArray[2][0] === "O" && metricArray[2][1] === "O" && metricArray[1][2] === ""   && temp === null) {
      temp = [2, 2]
    }

    else if (metricArray[2][0] === "O" && metricArray[2][2] === "O" && metricArray[2][1] === ""   && temp === null) {
      temp = [2, 1]
    }
    
    else if (metricArray[2][2] === "O" && metricArray[2][1] === "O" && metricArray[2][0] === ""   && temp === null) {
      temp = [2, 0]
    }

    //vertical check
    else if (metricArray[0][0] === "O" && metricArray[1][0] === "O" && metricArray[2][0] === ""   && temp === null) {
      temp = [2, 0]
    }
    
    else if (metricArray[1][0] === "O" && metricArray[2][0] === "O" && metricArray[0][0] === ""  && temp === null) {
      temp = [0, 0]
    }

    else if (metricArray[0][0] === "O" && metricArray[2][0] === "O" && metricArray[1][0] === "" && temp === null) {
      temp = [1, 0]
    }

    else if (metricArray[0][1] === "O" && metricArray[1][1] === "O" && metricArray[2][1] === "" && temp === null) {
      temp = [2, 1]
    }

    else if (metricArray[1][1] === "O" && metricArray[2][1] === "O" && metricArray[0][1] === "" && temp === null) {
      temp = [0, 1]
    }
    
    else if (metricArray[0][1] === "O" && metricArray[2][1] === "O" && metricArray[1][1] === "" && temp === null) {
      temp = [1, 1]
    }

    else if (metricArray[0][2] === "O" && metricArray[1][2] === "O" && metricArray[2][2] === "" && temp === null) {
      temp = [2, 2]
    }

    else if (metricArray[0][2] === "O" && metricArray[2][2] === "O" && metricArray[1][2] === "" && temp === null) {
      temp = [1, 2]
    }
    
    else if (metricArray[2][2] === "O" && metricArray[1][2] === "O" && metricArray[0][2] === "" && temp === null) {
      temp = [0, 2]
    }

    //Check for diagonal forward
    else if (metricArray[0][0] === "O" && metricArray[1][1] === "O" && temp === null) {
      temp = [2, 2]
    }

    else if (metricArray[0][0] === "O" && metricArray[2][2] === "O" && temp === null) {
      temp = [1, 1]
    }
    
    else if (metricArray[2][2] === "O" && metricArray[1][1] === "O" && temp === null) {
      temp = [0, 0]
    }

    //check for diagonal backward
    else if (metricArray[0][2] === "O" && metricArray[1][1] === "O" && temp === null) {
      temp = [2, 0]
    }

    else if (metricArray[0][2] === "O" && metricArray[2][0] === "O" && temp === null) {
      temp = [1, 1]
    }
    
    else if (metricArray[2][0] === "O" && metricArray[1][1] === "O" && temp === null) {
      temp = [0, 2]
    }

    if(temp !== null && metricArray[temp[0]][temp[1]] === "") {
      res1 = temp[0];
      res2 = temp[1];
    } else {

      if(metricArray[0][0] === "X" && metricArray[0][1] === "X" && temp === null) {
        temp = [0, 2]
      }
      
      else if (metricArray[0][0] === "X" && metricArray[0][2] === "X" && metricArray[0][1] === "" && temp === null) {
        temp = [0, 1]
      }
  
      else if (metricArray[0][1] === "X" && metricArray[0][2] === "X" && metricArray[0][0] === ""  && temp === null) {
        temp = [0, 0]
      }
  
      else if (metricArray[1][0] === "X" && metricArray[1][1] === "X" && metricArray[1][2] === ""  && temp === null) {
        temp = [1, 2]
      }
  
      else if (metricArray[1][0] === "X" && metricArray[1][2] === "X" && metricArray[1][1] === ""  && temp === null) {
        temp = [1, 1]
      }
      
      else if (metricArray[1][2] === "X" && metricArray[1][1] === "X" && metricArray[1][0] === ""  && temp === null) {
        temp = [1, 0]
      }
  
      else if (metricArray[2][0] === "X" && metricArray[2][1] === "X" && metricArray[1][2] === ""   && temp === null) {
        temp = [2, 2]
      }
  
      else if (metricArray[2][0] === "X" && metricArray[2][2] === "X" && metricArray[2][1] === ""   && temp === null) {
        temp = [2, 1]
      }
      
      else if (metricArray[2][2] === "X" && metricArray[2][1] === "X" && metricArray[2][0] === ""   && temp === null) {
        temp = [2, 0]
      }
  
      //vertical check
      else if (metricArray[0][0] === "X" && metricArray[1][0] === "X" && metricArray[2][0] === ""   && temp === null) {
        temp = [2, 0]
      }
      
      else if (metricArray[1][0] === "X" && metricArray[2][0] === "X" && metricArray[0][0] === ""  && temp === null) {
        temp = [0, 0]
      }
  
      else if (metricArray[0][0] === "X" && metricArray[2][0] === "X" && metricArray[1][0] === "" && temp === null) {
        temp = [1, 0]
      }
  
      else if (metricArray[0][1] === "X" && metricArray[1][1] === "X" && metricArray[2][1] === "" && temp === null) {
        temp = [2, 1]
      }
  
      else if (metricArray[1][1] === "X" && metricArray[2][1] === "X" && metricArray[0][1] === "" && temp === null) {
        temp = [0, 1]
      }
      
      else if (metricArray[0][1] === "X" && metricArray[2][1] === "X" && metricArray[1][1] === "" && temp === null) {
        temp = [1, 1]
      }
  
      else if (metricArray[0][2] === "X" && metricArray[1][2] === "X" && metricArray[2][2] === "" && temp === null) {
        temp = [2, 2]
      }
  
      else if (metricArray[0][2] === "X" && metricArray[2][2] === "X" && metricArray[1][2] === "" && temp === null) {
        temp = [1, 2]
      }
      
      else if (metricArray[2][2] === "X" && metricArray[1][2] === "X" && metricArray[0][2] === "" && temp === null) {
        temp = [0, 2]
      }
  
      //Check fXr diagXnal fXrward
      else if (metricArray[0][0] === "X" && metricArray[1][1] === "X" && temp === null) {
        temp = [2, 2]
      }
  
      else if (metricArray[0][0] === "X" && metricArray[2][2] === "X" && temp === null) {
        temp = [1, 1]
      }
      
      else if (metricArray[2][2] === "X" && metricArray[1][1] === "X" && temp === null) {
        temp = [0, 0]
      }
  
      //check fXr diagXnal backward
      else if (metricArray[0][2] === "X" && metricArray[1][1] === "X" && temp === null) {
        temp = [2, 0]
      }
  
      else if (metricArray[0][2] === "X" && metricArray[2][0] === "X" && temp === null) {
        temp = [1, 1]
      }
      
      else if (metricArray[2][0] === "X" && metricArray[1][1] === "X" && temp === null) {
        temp = [0, 2]
      }

      if(temp !== null && metricArray[temp[0]][temp[1]] === "") {
        res1 = temp[0];
        res2 = temp[1];
      } else {
        res1 = Math.floor(Math.random()*(max-min+1)+min) % 3;
        res2 = Math.floor(Math.random()*(max-min+1)+min) % 3;
      }
    }

    if(metricArray[res1][res2] === "") { 
      this.setBotChoiceToMetric(res1, res2);
    } else {
      this.handleBotChanges(p, k);
    }
  }

  setBotChoiceToMetric = () => {
    setTimeout(() => {
        this.state.metricArray[res1][res2] = this.state.botChoice;
        this.setState({
          metricArray: this.state.metricArray,
          currentTurn: "X"
        }, () => {
              this.handleMetricChange(res1, res2, this.state.botChoice, true)
              this.setState({
                disableToken: false
              })
        }) 
      }, 800);
  }

  handleGameFinish = async (gameWinner) => {
    hitCount = 0;
    setTimeout(() => {
      this.setState({
        metricArray: [["", "", ""], ["", "", ""], ["", "", ""]],
        selectedUserChoice: this.state.playWithBot === true ? this.state.selectedUserChoice : null,
        gameWinner: gameWinner,
        RestartGame: true,
        gameWonByPlayerX: gameWinner === "X" ? this.state.gameWonByPlayerX + 1 : this.state.gameWonByPlayerX,
        gameWonByPlayerO: gameWinner === "O" ? this.state.gameWonByPlayerO + 1 : this.state.gameWonByPlayerO,
        currentTurn: this.state.playWithBot === true ? "X" : null
      })
    }, 500);
  }

  selectChoice = (selectedUserChoice) => {
    hitCount = 0;
    setTimeout(() => {
      this.setState({
        selectedUserChoice: selectedUserChoice,
        currentTurn: selectedUserChoice
      })
    }, 500);
  }

  handleGameRestart = () => {
    hitCount = 0;
    this.setState({
      RestartGame: null,
      metricArray: [["", "", ""], ["", "", ""], ["", "", ""]],
      selectedUserChoice: this.state.playWithBot === true ? "X" : null, 
      gameWinner: null,
      currentTurn: this.state.playWithBot === true ? "X" : null,
      disableToken: false
    });
  }

  selectGameType = (type) => {
    if(type === 1) {
      this.setState({
        playWithBot: true ,
        selectedUserChoice: "X",
        botChoice: "O",
        currentTurn: "X"
      });
    } else {
      this.setState({
        playWithBot: false
      })
    }
  }

  // clearState = () => {
  //   this.setState(initialState);
  // }

  render(){
    const {metricArray, selectedUserChoice, botChoice, RestartGame, playWithBot, disableToken } = this.state;
    if(c === 0) {
      for(let i=0; i  <3; i++){
        metricArray[i] = new Array(3)
        for(let j=0;j<3;j++){
          metricArray[i][j] = ""
        }
      }
      c++;
    }

    return (
      <div className="App" style={{margin: 50}}>
        <br/><br/><br/>
        {`X: ${this.state.gameWonByPlayerX}`}{` O: ${this.state.gameWonByPlayerO} `}
        <br/>
        <br/>
        {RestartGame === true ? 
          <div id="start">
            {this.state.gameWinner !== null ? `Player  ${this.state.gameWinner} won the game` : null}
            <br/>
            <br/>
            <Button variant="contained"  color={ "secondary" } style={{ height: 40}} onClick={(e) => this.handleGameRestart() } >
              <Autorenew /> 
              RESTART
            </Button>
          </div>
        : 
          <div>
            {selectedUserChoice !== null ?
              <>
              {/* <div>
                <Button variant="contained" color="primary" onClick={() => this.clearState()}>
                  <HomeIcon/> 
                  {"  Home  "}
                </Button>
              </div>
              <br/>
              <br/> */}
              <div id="start">
                <Button disabled={ !metricArray[0][0] && disableToken} variant="contained"  color={ !metricArray[0][0] ? 'default' : metricArray[0][0] === "X" ? "primary" : "secondary" } style={{ width: 30, height: 30}} onClick={(e) => !metricArray[0][0] && this.handleMetricChange(0, 0, this.state.selectedUserChoice)} >
                  {
                    metricArray[0][0]
                  }
                </Button>
                <Button disabled={ !metricArray[0][1] && disableToken} variant="contained"  color={ !metricArray[0][1] ? "default" : metricArray[0][1] === "X" ? "primary" : "secondary" } style={{ width: 30, height: 30, marginLeft: 5}} onClick={(e) => !metricArray[0][1] && this.handleMetricChange(0, 1, this.state.selectedUserChoice)} >
                  {
                    metricArray[0][1]
                  }
                </Button>
                <Button disabled={ !metricArray[0][2] && disableToken} variant="contained"  color={ !metricArray[0][2] ? "default" : metricArray[0][2] === "X" ? "primary" : "secondary"  } style={{ width: 30, height: 30, marginLeft: 5}} onClick={(e) => !metricArray[0][2] && this.handleMetricChange(0, 2, this.state.selectedUserChoice)} >
                  {
                    metricArray[0][2]
                  }
                </Button>
                <br/>

                <Button disabled={ !metricArray[1][0] && disableToken} variant="contained"  color={ !metricArray[1][0] ? 'default' : metricArray[1][0] === "X" ? "primary" : "secondary"  } style={{ width: 30, height: 30, marginTop: 5}} onClick={(e) => !metricArray[1][0] && this.handleMetricChange(1, 0, this.state.selectedUserChoice)} >
                  {
                    metricArray[1][0]
                  }
                </Button>
                <Button disabled={ !metricArray[1][1] && disableToken} variant="contained"  color={ !metricArray[1][1] ? "default" : metricArray[1][1] === "X" ? "primary" : "secondary"  } style={{ width: 30, height: 30, marginLeft: 5, marginTop: 5}} onClick={(e) => !metricArray[1][1] && this.handleMetricChange(1, 1, this.state.selectedUserChoice)} >
                  {
                    metricArray[1][1]
                  }
                </Button>
                <Button disabled={ !metricArray[1][2] && disableToken} variant="contained"  color={ !metricArray[1][2] ? "default" : metricArray[1][2] === "X" ? "primary" : "secondary"  } style={{ width: 30, height: 30, marginLeft: 5, marginTop: 5}} onClick={(e) => !metricArray[1][2] && this.handleMetricChange(1, 2, this.state.selectedUserChoice)} >
                  {
                    metricArray[1][2]
                  }
                </Button>
                <br/>

                <Button disabled={ !metricArray[2][0] && disableToken} variant="contained"  color={ !metricArray[2][0] ? 'default' : metricArray[2][0] === "X" ? "primary" : "secondary"  } style={{ width: 30, height: 30, marginTop: 5}} onClick={(e) => !metricArray[2][0] && this.handleMetricChange(2, 0, this.state.selectedUserChoice)} >
                  {
                    metricArray[2][0]
                  }
                </Button>
                <Button disabled={ !metricArray[2][1] && disableToken} variant="contained"  color={ !metricArray[2][1] ? "default" : metricArray[2][1] === "X" ? "primary" : "secondary"  } style={{ width: 30, height: 30, marginLeft: 5,marginTop: 5}} onClick={(e) => !metricArray[2][1] && this.handleMetricChange(2, 1, this.state.selectedUserChoice)} >
                  {
                    metricArray[2][1]
                  }
                </Button>
                <Button disabled={ !metricArray[2][2] && disableToken} variant="contained"  color={ !metricArray[2][2] ? "default" : metricArray[2][2] === "X" ? "primary" : "secondary"  } style={{ width: 30, height: 30, marginLeft: 5,marginTop: 5}} onClick={(e) => !metricArray[2][2] && this.handleMetricChange(2, 2, this.state.selectedUserChoice)} >
                  {
                    metricArray[2][2]
                  }
                </Button>
                <br/>
                <br/>
                <br/>
                <div > {this.state.selectedUserChoice !== "draw" ? `${this.state.currentTurn} turn` :  <div id="start"> 
                          it's a Draw 
                          <br/>
                          <br/>
                          <Button variant="contained"  color={ "secondary" } style={{ height: 40}} onClick={(e) => this.handleGameRestart() } >
                            <Autorenew /> 
                            REPLAY
                          </Button>
                        </div>
                      } </div>
                <br/>
              </div>
              </>
              :
              <div id="start">
                {this.state.playWithBot === null ?
                  <div>
                    {"Select your choice:"} 
                    <br/>
                    <Button variant="contained" color="secondary" style={{ height: 30, marginLeft: 5,marginTop: 15 }} onClick={(e) => {this.selectGameType(1)}}> {"single Player"} </Button>
                    <Button variant="contained" color="secondary" style={{ height: 30, marginLeft: 15,marginTop: 15}} onClick={(e) => this.selectGameType(0)}> {"Multi Player"} </Button>
                    <br/>
                  </div>
                  :
                  <div>
                    {this.state.playWithBot === false && 
                      <div>
                        {"Select your choice:"}
                        <br/>
                        <Button variant="contained" color="secondary" style={{ width: 30, height: 30, marginLeft: 5,marginTop: 15 }} onClick={(e) => {this.selectChoice("X")}}> {"X"} </Button>
                        <Button variant="contained" color="secondary" style={{ width: 30, height: 30, marginLeft: 15,marginTop: 15}} onClick={(e) => this.selectChoice("O")}> {"O"} </Button>
                        <br/>
                      </div>
                    }
                  </div>
                }
              </div>
              }
          </div>
        }
      </div>
    );
  }
}

export default App;
