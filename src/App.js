import './App.css';
import ToDoList from './components/ToDoList';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { AlertProvider } from './contexts/alertContext';
import TodosProvider from './contexts/todosContext';

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
  return(
      <ThemeProvider theme={theme}>
        <TodosProvider>
          <AlertProvider>
            <div className='body' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
              <ToDoList/>
            </div>
          </AlertProvider>
        </TodosProvider>
      </ThemeProvider>
  );
}

export default App;
