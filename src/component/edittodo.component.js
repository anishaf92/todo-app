

import React, { Component } from 'react';
import axios from 'axios';
import { useParams, useSearchParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getValue } from '@testing-library/user-event/dist/utils';

     

export default function EditTodo(){
    const { id } = useParams();
    const [todo_description, setTodo_description] = useState('');
    const [todo_responsible, setTodo_responsible] = useState('');
    const [todo_priority, setTodo_priority] = useState('');
    const [todo_completed, setTodo_completed] = useState(false);
    useEffect(()=> {
    
    axios.get('http://localhost:5000/'+id)
            .then(response => {
                    setTodo_description(response.data.todo_description);
                    setTodo_responsible(response.data.todo_responsible);
                    setTodo_priority(response.data.todo_priority);
                    setTodo_completed(response.data.todo_completed);
                    console.log(response);
                })   
            .catch(function (error) {
                console.log(error);
            })
        });
        function handleTodoDescription(e) {
        
            setTodo_description(e);
            
            console.log(todo_description)
            
          };
      function handleTodoResponsible(e) {
        setTodo_responsible(e.target.value);
      };
      const handleTodoPriority = e => {
        setTodo_priority(e.target.value);

      };
      const handleTodoCompleted = e => {
        setTodo_completed(e.target.value);
      };
      const navigate=useNavigate();
      const onSubmit = (e) => {
        
        e.preventDefault();
        
        const obj ={
            "todo_description":todo_description,
            "todo_responsible":todo_responsible,
            "todo_priority":todo_priority,
            "todo_completed":todo_completed
        }
        console.log(obj)
        axios.post('http://localhost:5000/update/'+id, obj)
           .then(res => console.log(res.data));
        
           navigate("/");
         

      };
    
    
        return (
            <div>
            <h3 align="center">Update Todo</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group"> 
                    <label>Description: </label>
                    <input  type="text"
                            className="form-control"
                            defaultValue={todo_description}

                            onChange={handleTodoDescription=(e)=>{setTodo_description(e.target.value);}}
                            />
                </div>
                <div className="form-group">
                    <label>Responsible: </label>
                    <input 
                            type="text" 
                            className="form-control"
                            contentEditable={true}
                            value={todo_responsible}
                            onChange={handleTodoResponsible}
                            />
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input  className="form-check-input" 
                                type="radio" 
                                name="priorityOptions" 
                                id="priorityLow" 
                                value="Low"
                                defaultChecked={todo_priority==='Low'} 
                                onChange={handleTodoPriority}
                                />
                        <label className="form-check-label">Low</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input  className="form-check-input" 
                                type="radio" 
                                name="priorityOptions" 
                                id="priorityMedium" 
                                value="Medium" 
                                defaultChecked={todo_priority==='Medium'} 
                                onChange={handleTodoPriority}
                                />
                        <label className="form-check-label">Medium</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input  className="form-check-input" 
                                type="radio" 
                                name="priorityOptions" 
                                id="priorityHigh" 
                                value="High" 
                                defaultChecked={todo_priority==='High'} 
                                onChange={handleTodoPriority}
                                />
                        <label className="form-check-label">High</label>
                    </div>
                </div>
                <div className="form-check">
                    <input  className="form-check-input"
                            id="completedCheckbox"
                            type="checkbox"
                            name="completedCheckbox"
                            onChange={handleTodoCompleted}
                            defaultChecked={todo_completed}
                            value={todo_completed}
                            />
                    <label className="form-check-label" htmlFor="completedCheckbox">
                        Completed
                    </label>                        
                </div>

                <br />

                <div className="form-group">
                    <input type="submit" value="Update Todo" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}


