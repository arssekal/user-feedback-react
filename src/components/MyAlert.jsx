import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function MyAlert({open, content}) {
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        message={content}
        style={{backgroundColor: "green"}}
      />
    </div>
  );
}
