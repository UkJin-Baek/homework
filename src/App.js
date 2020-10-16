import React, { useState, useCallback } from 'react';
import './App.css';

import Categories from './components/Categories';
import Intro from './pages/Intro'
import Board from './pages/Board'
import ConstructionStatus from './pages/ConstructionStatus'
import PartnerCompany from './pages/PartnerCompany'

const App = () =>{

  const [category, setCategory] = useState('intro');
  const onSelect = useCallback(category => setCategory(category), []);

  return (
      <div className="App">
          <Categories 
          category={category} 
          onSelect={onSelect}
          />
        <header className="App-header">
          {category === 'intro' && <Intro/>}
          {category === 'constructionStatus' && <ConstructionStatus/>}
          {category === 'partnerCompany' && <PartnerCompany/>}
          {category === 'board' && <Board/>}
        </header>
      </div>
  );
}

export default App;