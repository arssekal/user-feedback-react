import '../App.css'
import React, { useReducer } from 'react'
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import { useTodos } from '../contexts/todosContext';
import { useAlert } from '../contexts/alertContext';
import '../styleComponents/todoStyle.css'


 
function ToDo({todo, showDeleteAlert, showUpdateAlert}) {
  // const {todos, setTodos} = useContext(TodosContext) 
  const {dispatch} = useTodos()
  const {showHideTostAlert} = useAlert()

  function handleDoneClick() {
    dispatch({type: "done", payload: todo})
    showHideTostAlert("task done successfully!")
  }

  function handleDeleteClick() {
    showDeleteAlert(todo)
  }
  function handleUpdateClick() {
    showUpdateAlert(todo)
  }

  return (
    <>
    <Card sx={{ minWidth: 300, backgroundColor: todo.isCompleted ? "#cecece" :  "#283593", color: "white", padding: '10px', marginBottom: "20px"}} className='taskCard'>
        <Grid container spacing={2} alignItems='center' style={{width: "100%"}}>
            <Grid size={8}>
                <Typography gutterBottom  variant='h5' style={{textDecoration: todo.isCompleted ? 'line-through': null}}>
                    {todo.title}
                </Typography>
                <Typography gutterBottom  variant='h6'>
                    {todo.description}
                </Typography>
            </Grid>
            <Grid size={4} display='flex' justifyContent='space-between' className="icons">
                {/* buttons */}
                <IconButton className='iconButton' aria-label="done" style={{color: todo.isCompleted ? 'white':'#76ff03', backgroundColor:  todo.isCompleted ? '#76ff03': 'white', border: '2px solid #76ff03'}}
                onClick={() => {
                    handleDoneClick()
                }}
                ><DoneIcon/>
                </IconButton>

                <IconButton className='iconButton' aria-label="delete" style={{color: 'red', backgroundColor: '#eee', border: '2px solid red'}}
                onClick={() => {
                    handleDeleteClick()
                }}
                >
                    <DeleteIcon />
                </IconButton>

                <IconButton className='iconButton' aria-label="update" style={{color: 'blue', backgroundColor: '#eee', border: '2px solid blue'}}
                onClick={() => {
                    handleUpdateClick()
                }}
                ><EditIcon/>
                </IconButton>
            </Grid>
        </Grid>
    </Card>
    </>
  )
}

export default ToDo