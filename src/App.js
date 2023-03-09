import { useState, useEffect } from 'react';

import SearchBox from './components/search-box/search-box.component';
import CardList from './components/card-list/card-list.component';

import './App.css';

const App = () => {
   
  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  const [title, setTitle] = useState('');


  useEffect( () => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => setMonsters( users));
  }, [])

  useEffect( () => {
    const newFilteredMonsters = monsters.filter( (monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField])

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };

  const onTitleChange = (event) => {
    const titleChangeString = event.target.value;
    setTitle(titleChangeString);
  }


  return (
    <div className="App">
      <h1 className='app-title'>{title}</h1>
      <SearchBox 
        className = 'monsters-search-box'
        onChangeHandler = { onSearchChange } 
        placeholder ='search monsers'
        
      />
      <br />
      <SearchBox 
        className = 'title-box'
        onChangeHandler = { onTitleChange } 
        placeholder ='change-title'
        
      />
      <CardList monsters = { filteredMonsters }/>
    </div>
  )
}


export default App;
