import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepository] = useState([]);

  useEffect( () => {
    api.get('/repositories').then( response => {
      setRepository(response.data);
      console.log(response);
    });
  }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio Node.js - ${Date.now()}`,
      url: "https://github.com/renatoao",
      techs: [
        "Node.js",
        "MongoDB",
        "ReactJs",
        "GraphQL",
        "React Native"
      ]
    });
    const repository = response.data;
    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`); 
    setRepository(repositories.filter( repository => repository.id !== id ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
          { repositories.map( repo => {
            return(
              <li key={repo.id}>              
                {repo.title}
                
                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
            );

          } ) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
