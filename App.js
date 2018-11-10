import React, { Component } from 'react';
import './App.css';
var data = require('./data.json');
var populate = require('./populate.json');
const colortype = data.keys.filter(x => x.key_id == 1 );
const desctype = data.keys.filter(x => x.key_id == 3 );


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      countries: [],
      colors: []
    }
  }
  componentWillMount(){
    this.setState({
      countries: populate.infos.filter(x => x.type === "2"),
      //the above line sets the state of country to an object which contains all the elements
      //from the infos element in populate where "type = 2"
      // i.e. it basically sorts out the object with value India  Singapore and Sri Lanka
      colors:  populate.infos.filter(x => x.type === "3")
      //the above line sets the state of colors to an object which contains all the elements
      //from the infos element in populate where "type = 3"
      // i.e. it basically sorts out the object with value Red Green and Blue
    })
  }
  
  render() {
    if(data.code === 200){
      console.log(data.message)
    };
    
    
    return (
      <div className="App">
        <div>
          {/* here i have given two props to the component Dropdown. 
          title will be the default value for the dropdown 
          and list is equal to the state dropdown defined in the constructor */}

          <Dropdown title = "Select location"
                    list = {this.state.dropdown}
          />
        {/* <select> */}
        {/* In the line below .map() is going through each of the item in the array 'countries' which is defined above. And for each of the item in the array, it is making
        an option tag with the name of the country as defined in the json */}
        {/* {this.state.countries.map(popu => <option key={popu.id}>{popu.value}</option>)} 
        </select> */}
        </div>


        {/* In the line below .map() is going through each of the item in the array 'colors' which is defined above. And for each of the item in the array, it is making
        a div tag with an input element of type checkbox for multi-select*/}
        <div>
          {this.state.colors.map(name => <div key={name.id}><input type={colortype[0].type == 3 ? 'checkbox': 'text'}/><p>{name.value}</p></div>)}
        </div>
        
        <input type={desctype[0].type == 1 ? 'text': 'checkbox'} placeholder={data.keys[2].key}/>
        
        
      </div>
    );
  }
}

class Dropdown extends Component {
  constructor(props){
    super(props);
    this.state = {
      dropdown: populate.infos.filter(x => x.type === "2"),
      listOpen: false,
      headerTitle: this.props.title
    }
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.toggleList = this.toggleList.bind(this);
  }  
  handleClickOutside(){
    this.setState({
      listOpen: false
    })
  }
  toggleList(){
    this.setState(prevState => ({
      listOpen: !prevState.listOpen
    }))
  }
  toggleSelected(id, key){
    let temp = this.state[key]
    temp[id].selected = !temp[id].selected
    this.setState({
      [key]: temp
    })
  }
  
  render() {
    const{list} = this.props
    const{listOpen, headerTitle, dropdown} = this.state
    // const ulStyle={
    //     margin: 0,
    //     padding: 0,
    //     top:'45px',
    //     right:'0px',
    //     width: '200px',
    //     backgroundColor: 'white',
    //     fontWeight:'bold',
    //     position: 'relative',
    //     boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    //     top: '-px',
    //     zIndex: 1,
    //     border: '2px solid black'

    // }
    
    
     return (
      // {this.state.colors.map(name => <div key={name.id}><input type={colortype[0].type == 3 ? 'checkbox': 'text'}/><p>{name.value}</p></div>)}
      <div className="wrapper">
    <select className="header" onClick={() => this.toggleList()}>
        
        <option className="header-title">{headerTitle}</option>
    
    
      {listOpen && <optgroup className="list" label="Available countries">
        {dropdown.map((item) => (
          <option 
            className="list-item" key={item.id} >{item.value}
          </option>
        ))}
      </optgroup>}  
      </select>
    </div>
    );
  }
}
export default App;

