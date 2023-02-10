import React from 'react';
import './App.css';
import Menu from './Menu';
import List from './List';

class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      books:[
        {id:0, rating: 4, title: 'Harry Potter y el cáliz de fuego', image: 'libro01.jpg'},
        {id:1, rating: 3, title: 'The shining', image: 'libro02.jpg'},
        {id:2, rating: 5, title: 'Código Da Vinci', image: 'libro03.jpg'},
        {id:3, rating: 5, title: 'El principito', image: 'libro04.jpg'},
        {id:4, rating: 5, title: 'Sobrenatural', image: 'libro05.jpg'}
      ],
      copyBooks: []
    };
  }

  componentDidMount(){
    this.initBooks();
  }

  initBooks(){
    this.setState((state,props) => ({
      copyBooks: [... state.books]
    }));
  }

  onAdd = (item) => {
    var temp = [...this.state.books];
    const id = temp[temp.length-1].id + 1;
    item['id'] = id;
    temp.push(item);
    this.setState({books: [...temp]});
    this.initBooks();
  }

  onSearch = (query) => {
    if(query === ''){
      this.setState({copyBooks: [... this.state.books]});
    }else{
      const temp = [...this.state.books];
      var res = [];
      temp.forEach(item =>{
        if(item.title.toLowerCase().indexOf(query) > -1){
          res.push(item);
        }
      });
    
      this.setState({copyBooks: [...res]});
    }
  }

  onUpdateRating = (item) => {
    var temp = [... this.state.books];
    const index = temp.findIndex(x => x.id === item.id);

    temp[index].title = item.title;
    temp[index].image = item.image;
    temp[index].rating = item.rating;

    this.setState({books: [...temp]});
    this.initBooks();

  }

  onRemove = (id) => {
    var temp = [...this.state.books];
    const res = temp.filter(item => item.id != id);
    this.setState({books: [...res]});
    this.initBooks();
  }

  render(){
    return (
      <div className="app">
        <Menu title="AmazonJR" onsearch={this.onSearch} onadd={this.onAdd}/>
        <List className="list" items={this.state.copyBooks} onupdaterating={this.onUpdateRating} onremove={this.onRemove}/>
      </div>
    );
  }
}

export default App;