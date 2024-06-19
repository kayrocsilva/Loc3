import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase/config';
import { FaSearch } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SearchBar.module.css'; // Importe o arquivo de estilo CSS do módulo

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setQuery(value);
    fetchOptions(value);
  };

  const handleSearch = () => {
    // Navegar para a página de resultados
    window.location.href = `/search-results?q=${query}`;
  };

  const fetchOptions = async (value) => {
    const querySnapshot = await db.collection('medicamentos').where('nome', '>=', value).where('nome', '<=', value + '\uf8ff').get();
    const options = querySnapshot.docs.map(doc => doc.data().nome);
    setOptions(options);
  };

  return (
    <div className={`input-group ${styles.searchContainer}`}> 
      <input
        type="text"
        placeholder="Digite sua busca..."
        value={query}
        onChange={handleInputChange}
        className={`form-control ${styles.searchInput}`} 
      />
      <div className={`input-group-append ${styles.searchButtonContainer}`}> 
        <button onClick={handleSearch} className={`btn btn-primary ${styles.searchButton}`}>
          <FaSearch />
        </button>
      </div>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <Link to={`/search-results?q=${option}`}>{option}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
