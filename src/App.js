import './App.css';
import ToDoList from './components/ToDoList';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { TodosContext } from './contexts/todosContext';
import { useState } from 'react';
import MyAlert from './components/MyAlert';
import { AlertContext } from './contexts/alertContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#64dd17',
    },
    secondary: {
      main: '#76ff03',
    },
  }
});

function App() {
  const [todos, setTodos] = useState([])
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("this is a success message");


  function showHideTostAlert(text) {
    setContent(text)
    setOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 3000)
  }

  return (
    <TodosContext.Provider value={{todos, setTodos}}>
      <ThemeProvider theme={theme}>
        <AlertContext.Provider value={{showHideTostAlert}}>
          <div className='body' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
            <MyAlert open={open} content={content}/>
            <ToDoList/>
          </div>
        </AlertContext.Provider>
      </ThemeProvider>
    </TodosContext.Provider>
  );
}

export default App;
