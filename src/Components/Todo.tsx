import React, { useState, useEffect } from 'react';
import {
  TextField, Select, MenuItem, List, ListItem, Typography, IconButton, Container, Paper, Box, InputAdornment,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import { IoAddCircle } from "react-icons/io5";
import useShowToast from '../Hooks/Showtoast';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [filter, setFilter] = useState('all');
  const showToast = useShowToast();

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      console.log("Loaded todos from local storage:", JSON.parse(savedTodos));
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      console.log("Saving todos to local storage:", todos);
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === '') return;
    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, newTodoItem]);
    showToast("Todo Added", "Add Successfully");
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, text: string) => {
    setEditingId(id);
    setEditingText(text);
  };

  const saveTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: editingText } : todo
    ));
    setEditingId(null);
    setEditingText('');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #4e9aff, #6fc3df)', py: 5 }}>
      <Container component="main" maxWidth="xs" >
        <Typography variant="h4" align="center" gutterBottom color="white" marginBottom={"5rem"}>
          To-Do List
        </Typography> 
        <Paper elevation={3} sx={{ p: 2, borderRadius: '10px' }}>
          <Box display="flex" alignItems="center" mb={2}>
            <TextField
            
              label="Add a new todo"
              value={newTodo}
              onChange={e => setNewTodo(e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              sx={{ backgroundColor: 'white', borderRadius: '5px', width:'30rem' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IoAddCircle onClick={addTodo} color='red' size={"2rem"} cursor={"pointer"} />
                  </InputAdornment>
                ),
              }}
            />
            <Select
            
              value={filter}
              onChange={e => setFilter(e.target.value)}
             // margin="normal"
              variant="outlined"
              sx={{

                backgroundColor: 'white',
                borderRadius: '5px',
                color: '#ff5722',
                width:'10rem',
                ml: 5,  //This is for margin left !..
                '& .MuiSelect-select': {
                  padding: '10px 30px 10px 10px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ff5722',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ff5722',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#ff5722',
                },
                '& .MuiSelect-icon': {
                  color: '#ff5722',
                },
              }}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="active">Active</MenuItem>
            </Select>
          </Box>
          <List>
            {filteredTodos.map(todo => (
              <ListItem
                key={todo.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 1,
                  backgroundColor: 'white',
                  borderRadius: '5px',
                  padding: '10px',
                }}
              >
                {editingId === todo.id ? (
                  <TextField
                    value={editingText}
                    onChange={e => setEditingText(e.target.value)}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    sx={{ backgroundColor: 'white', borderRadius: '5px' }}
                  />
                ) : (
                  <Typography
                    variant="body1"
                    sx={{ textDecoration: todo.completed ? 'line-through' : 'none', flexGrow: 1 }}
                  >
                    {todo.text}
                  </Typography>
                )}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {editingId === todo.id ? (
                    <IconButton onClick={() => saveTodo(todo.id)} color="primary">
                      <SaveIcon />
                    </IconButton>
                  ) : (
                    <IconButton onClick={() => editTodo(todo.id, todo.text)} color="primary">
                      <EditIcon />
                    </IconButton>
                  )}
                  <IconButton onClick={() => toggleTodo(todo.id)} color={todo.completed ? 'success' : 'default'}>
                    <CheckIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteTodo(todo.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default TodoApp;
