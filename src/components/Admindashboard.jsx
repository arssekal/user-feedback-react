import React, { useEffect, useMemo, useState } from 'react'
import '../styleComponents/adminDashbord.css';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import LanguageIcon from '@mui/icons-material/Language';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import DownloadIcon from '@mui/icons-material/Download';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

import { listUserFeedbacks } from '../services/userFeedbackService';

// function createData(name, email, phone, feedback, source, date) {
//     return { name, email, phone, feedback, source, date };
// }
  
// const rows = [
//     createData(
//       'Youssef Benali',
//       'youssef.benali@gmail.com',
//       '+212 661-923456',
//       'liked',
//       'Facebook',
//       '2025-07-06'
//     ),
//     createData(
//       'Fatima Zahra El Idrissi',
//       'fatima.elidrissi@outlook.com',
//       '+212 662-874521',
//       'not liked',
//       'Instagram',
//       '2025-07-07'
//     ),
//     createData(
//       'Omar El Haddad',
//       'omar.haddad@domain.ma',
//       '+212 663-784512',
//       'liked',
//       'Google Ads',
//       '2025-07-08'
//     ),
//     createData(
//       'Imane Bensalem',
//       'imane.bensalem@yahoo.fr',
//       '+212 664-897532',
//       'not liked',
//       'Website',
//       '2025-07-09'
//     ),
//     createData(
//       'Anas Amrani',
//       'anas.amrani@gmail.com',
//       '+212 665-345987',
//       'liked',
//       'TikTok',
//       '2025-07-10'
//     )
//   ];

  

function Admindashboard() {

  const [type, setType] = useState('all'); // liked - not liked
  const [isLogOut, setisLogOut] = useState(false)
  const [allFeedbacks, setAllFeedbacks] = useState([])

  useEffect(() => {
    getAllFeedbacks();
  }, [])

  function getAllFeedbacks() {
    listUserFeedbacks().then((response) => {
        console.log(response.data)
        const feedbackClients = response.data.reverse();
        setAllFeedbacks(feedbackClients)
    }).catch((error) => {
        console.log(error)
    })
  }

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const filteredFeedback = () => {
    if(type === "all") return allFeedbacks;
    return allFeedbacks.filter((data) => {
        if(type === "liked") {
            return data.satisfaction === "Very Satisfying" || data.satisfaction === "Good" || data.satisfaction === "Neutral"
        } else {
            return data.satisfaction === "Not what I expected" || data.satisfaction === "Terrible"
        }
    })
  }

  const [all, positive, negative, sourceNumber] = useMemo(()=> {
    let tous = allFeedbacks.length;
    let pos = 0, neg = 0;
    let countSources = []
    for(const row of allFeedbacks) {
        if(row.satisfaction === "Very Satisfying" || row.satisfaction === "Good" || row.satisfaction === "Neutral") pos = pos +1;
        if(!countSources.includes(row.heardAbout)) {
            countSources.push(row.heardAbout);
        }
    }
    neg = tous - pos
    return [tous, pos, neg, countSources.length]
  }, [allFeedbacks])

  const navigate = useNavigate();

  function handleLogOut() {
    navigate("/")
  }

  // export csv logic
  function exportToCSV(data) {
    if (!data || !data.length) {
      alert("No data to export");
      return;
    }
  
    const headers = ["name", "email", "phone", "satisfaction", "heardAbout", "date"];
    const csvRows = [];
  
    // Add CSV header
    csvRows.push(headers.join(';'));
  
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header] ?? ''; // Use empty string if value is undefined
        const escaped = ('' + value).replace(/"/g, '\\"');
        return `"${escaped}"`;
      });
      csvRows.push(values.join(';'));
    }
  
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'customer_feedback.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
   }  
  
  

  return (
    <div className='holder'>
        <Container maxWidth="lg" className='dashboard-header'>
            <h2>Feedback Dashboard</h2>
            <Stack style={{backgroundColor: isLogOut ? "#e5e7eb": null}} spacing={2} className='stack-admin' direction="row"
            onClick={() => {
                setisLogOut(!isLogOut)
            }}
            >
                <AccountCircleIcon className='admin-icon'/>
                <h3>Admin</h3>
                {isLogOut? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                {isLogOut && 
                <div className='log-out'>
                    <div onClick={handleLogOut}>
                        <LogoutIcon/> Log Out
                    </div>
                </div>
                }
            </Stack>
        </Container>
        <Container maxWidth="lg" className='cardholder'>
            <div className='welcome'>
                {/* change */}
                <h1>Welcome back, Admin! <span className="wave">👋</span></h1>
                <p>Here's what's happening with your customer feedback today.</p>
            </div>
            <div className='cards'>
                {/*  */}
                <div className='card'>
                    <div>
                        <h4>Total Feedback</h4>
                        <span>{all}</span>
                    </div>
                    <ChatBubbleOutlineIcon className='icon'/>
                </div>
                {/*  */}
                <div className='card'>
                    <div>
                        <h4>Positive</h4>
                        <span>{positive}</span>
                    </div>
                    <ThumbUpOffAltIcon className='icon'/>
                </div>
                {/*  */}
                <div className='card'>
                    <div>
                        <h4>Negative</h4>
                        <span>{negative}</span>
                    </div>
                    <ThumbDownOffAltIcon className='icon'/>
                </div>
                {/*  */}
                <div className='card'>
                    <div>
                        <h4>Sources</h4>
                        <span>{sourceNumber}</span>
                    </div>
                    <LanguageIcon className='icon'/>
                </div>
            </div>
        </Container>
        <Container maxWidth="lg" className='customers'>
            {/* change */}
            <div className='customer-feedback'>
                <h2>Customer Feedback</h2>
                <div>
                <FormControl className='formControll' 
                 sx={{
                    m: 1,
                    width: {
                      xs: 130, // fit content on extra-small (mobile) screens
                      sm: 160,           // fixed width on small and up
                    },
                    minWidth: 0,          // override default minWidth behavior on small screens
                  }}
                >
                    <InputLabel id="demo-simple-select-label">
                        <FilterAltIcon sx={{ mr: 1 }} />
                    </InputLabel>
                    
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="type"
                        onChange={handleChange}
                    >
                        <MenuItem value="all">all</MenuItem>
                        <MenuItem value="liked">Positive</MenuItem>
                        <MenuItem value="not liked">Negative</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined" startIcon={<DownloadIcon />}
                onClick={() => exportToCSV(filteredFeedback())}
                >
                    Export CSV
                </Button>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>name</TableCell>
                            <TableCell align="left">email</TableCell>
                            <TableCell align="left">phone</TableCell>
                            <TableCell align="left">feedback</TableCell>
                            <TableCell align="left">source</TableCell>
                            <TableCell align="left">date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {filteredFeedback().map((row) => (
                        <TableRow
                        className='table-row'
                        key={row.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">{row.name}</TableCell>
                            <TableCell align="left">{row.email}</TableCell>
                            <TableCell align="left">{row.phone}</TableCell>
                            <TableCell align="left" className='feedback'>
                                <span
                                style={
                                    row.satisfaction === "Very Satisfying" || row.satisfaction === "Good" || row.satisfaction === "Neutral"
                                    ? {backgroundColor: "#dcfce7", color: "#166534"}
                                    : {backgroundColor: "#fee2e2", color: "#a61b1b"}}
                                >{row.satisfaction}</span>
                            </TableCell>
                            <TableCell align="left">{row.heardAbout}</TableCell>
                            {/* <TableCell align="left">{row.date}</TableCell> */}
                            <TableCell align="left">
                            <>
                                <div>{new Date(row.date).toLocaleDateString()}</div>
                                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                {new Date(row.date).toLocaleTimeString()}
                                </div>
                            </>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    </div>
  )
}

export default Admindashboard