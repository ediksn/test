import React from 'react';
import './App.css';
import {api} from './environment'

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      message: '',
      response: ''
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  sendMessage(){
    fetch(`${api}/send`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({message:this.state.message})
    })
    .then(res=>res.json()
      .then(resp=>{
        this.setState({
          message:'',
          response: resp
        })
      })
    )
  }
  render(){
    return (
      <div className="App">
        <div className="App-header">
          <input type='text' name="message" onChange={evnt => this.setState({message:evnt.target.value})} value={this.state.message}/>
          <label>{this.state.response}</label>
          <button onClick={this.sendMessage}>Enviar texto</button>
        </div>
      </div>
    );
  }
}

export default App;
