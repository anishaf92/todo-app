import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./component/createtodo.component";
import EditTodo from "./component/edittodo.component";
import TodosList from "./component/todolist.component";
var cors = require('cors')

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
           
            <Link to="/" className="navbar-brand">MERN-Stack Todo App</Link>
            
                  <Link to="/" className="nav-link">Todos</Link>
                
                  <Link to="/create" className="nav-link">Create Todo</Link>
               
              
            
          </nav>
          <br/>
          <Routes>
          <Route path="/" exact element={<TodosList />}/>
          <Route path="/edit/:id" exact element={<EditTodo />} />
          <Route path="/create" element={<CreateTodo />} />
          </Routes>
        </div>
        
      </Router>
    );
  }
}

export default App;