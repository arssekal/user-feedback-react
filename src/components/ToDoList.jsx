import * as React from 'react';
// material ui elements
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToDo from './ToDo';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// context
import { useState , useEffect, useMemo } from 'react';
import { useTodos } from '../contexts/todosContext';
import { useAlert } from '../contexts/alertContext';

export default function ToDoList() {
  // reducer
  const {todos, dispatch} = useTodos()

  const {showHideTostAlert} = useAlert()

  const [titleInput, setTitleInput] = useState("")
  const [whatToShow, setWhatToShow] = useState("all") // "all" "done" "notDone"
  
  // 
  const [showDeleteAlert, setShowDeleteAlert] = useState(false) 
  const [showUpdateAlert, setShowUpdateAlert] = useState(false) 
  const [todoDeleted, setTodoDeleted] = useState(null) 
  const [updateTask, setUpdateTask] = useState(
    { 
     title: "",
     description: ""
    }
  ) 
 

  // filterd todo lost
  // this will not be called in evry render 
  // unless one of the two dependncies change
  const filterdTodos = useMemo(() => {
    return todos.filter((task) => {
      if(whatToShow === "all") {
        return true
      } 
      else if(whatToShow === "done") {
        return task.isCompleted
      } 
      return !task.isCompleted
    })
  }, [todos, whatToShow]);

  const todosList = filterdTodos.map((task) => {
    return (
      <ToDo key={task.id} todo={task} showDeleteAlert={showDeleteDialog} showUpdateAlert={showUpdateDialog}/>
    )
  })

  useEffect(() => {
    dispatch({type: "refrech"})
  }, [])

  const togllButtonStyle = {
    backgroundColor: "#76ff03",
    color: "black"
  }

  // handlers
  function handleAddClick() {
    dispatch({type: "add",payload: {title: titleInput}})
    setTitleInput("")
    showHideTostAlert("task added succesfully")
  }

  function handleDeleteDialogClick() {
    setShowDeleteAlert(false)
  }
  function handleClose() {
    setShowUpdateAlert(false)
  }
  // take the todo that will be deleted from todo component
  function showDeleteDialog(todo) {
    setTodoDeleted(todo)
    setShowDeleteAlert(true)
  }
  // take the todo that will be updated from todo component
  function showUpdateDialog(todo) {
    setUpdateTask(todo)
    setShowUpdateAlert(true)
  }
  // her i have to show an alert of deletion done successfully
  function handleDeleteConfirm() {
    dispatch({type: "delete",payload: todoDeleted})
    setShowDeleteAlert(false)
    showHideTostAlert("task deleted successfully!")
  }
  // her i have to show an alert of deletion done successfully
  function handleUpdateClick() {
    dispatch({type: "update",payload: updateTask})
    setShowUpdateAlert(false)
    showHideTostAlert("task updated successfully!")
  }

  return (
  <>
  {/* dialog form for updating a task */}
    <Dialog open={showUpdateAlert} onClose={handleClose}>
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <TextField
            required
            autoFocus
            margin="dense"
            label="new task's title"
            type="text"
            fullWidth
            variant="standard"
            value={updateTask.title}
            onChange={(e)=> {
              setUpdateTask({...updateTask, title: e.target.value})
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="task description"
            type="text"
            fullWidth
            variant="standard"
            value={updateTask.description}
            onChange={(e)=> {
                setUpdateTask({...updateTask, description: e.target.value})
            }}
          />
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={()=> {
              handleUpdateClick()
            }}>update</Button>
          </DialogActions>
        </DialogContent>
    </Dialog>
    {/* dialog alert for updating a task */}
    {/* dialog alert for deleting a task */}
    <Dialog
        open={showDeleteAlert}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle>Are you sure you want to delete this task</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           by clicking agree this will delte the the task and it cann't be retrieval
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> {
              handleDeleteDialogClick()
            }}>Disagree</Button>
          <Button style={{color: "red"}}
          onClick={()=> {
            handleDeleteConfirm()
          }}>Agree</Button>
        </DialogActions>
    </Dialog>
    {/* dialog alert for deleting a task */}
  <Container maxWidth="sm" style={{margin: "50px"}}>
    <Card sx={{ minWidth: 275 }} style={{maxHeight: "80vh", overflow: 'scroll'}}>
      <CardContent>
        <Typography gutterBottom  variant='h3' style={{fontWeight: "bold"}}>
          My tasks
        </Typography>
        <Divider /> 

        {/* switch buttons */}
        <ToggleButtonGroup
        exclusive
        aria-label="text alignment"
        style={{marginTop: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'center'}}
        >
          <ToggleButton style={whatToShow === "all" ? togllButtonStyle: null} value="all" aria-label="left aligned"
          onClick={() => {
            setWhatToShow("all")
          }}
          >
            all
          </ToggleButton>
          <ToggleButton style={whatToShow === "done" ? togllButtonStyle: null} value="done" aria-label="centered"
          onClick={() => {
            setWhatToShow("done")
          }}
          >
            done
          </ToggleButton>
          <ToggleButton style={whatToShow === "notDone" ? togllButtonStyle: null} value="notDone" aria-label="right aligned"
          onClick={() => {
            setWhatToShow("notDone")
          }}
          >
            not done
          </ToggleButton>
        </ToggleButtonGroup>
        {/* switch buttons */}

        {/* my todos */}
        {todosList}
        {/* my todos */}

        <Grid container spacing={2}  alignItems="center">
          <Grid size={3} >
            <Button style={{backgroundColor: titleInput.trim() === "" ? "#bdbdbd" : "green",color: 'white', padding: "10px 25px", width: '100%'}} 
            disabled={titleInput.trim() === ""}
            variant="contained"
            onClick={() => {
              handleAddClick()
            }}
            >
            add</Button>
          </Grid>
          <Grid size={9} display='flex' justifyContent='space-between'>
            <TextField style={{width: "100%"}} id="filled-basic" label="add task" variant="filled" 
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onKeyDown={(e)=> {
              if(e.key ==="Enter") {
                handleAddClick()
              }
            }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Container>
  </>
  );
}
