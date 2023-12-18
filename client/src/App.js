// src/App.js
import AppRouter from './components/AppRouter';
import React, { useEffect, useState } from 'react'

function App(){


const [backendData, setBackendData] = useState([{}])

useEffect(()=> {
  fetch("/api").then(
    response=>response.json()
  ).then(
    data =>{
      setBackendData(data)
    }
  )
})

  return (
    <div className="App ">


 
    

      <AppRouter />
    </div>
  );
 }


export default App;
