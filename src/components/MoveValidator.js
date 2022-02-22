import React from 'react';
import { useSelector } from 'react-redux';
import { wsMssgPlayfen } from '../actions/serverActions';
import { makeStyles } from '@mui/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import Movetext from '../utils/Movetext.js';

const useStyles = makeStyles({
  table: {
    marginTop: 10,
    maxHeight: 300,
    display: 'flex',
    flexDirection: 'column-reverse'
  },
});

const MoveValidator = ({props}) => {
  const classes = useStyles();
  const state = useSelector(state => state);

  if (state.board.fen) {
    wsMssgPlayfen(state);
  }

  return (
    <div>
      <TableContainer component={Paper} className={classes.table}>
        <Table stickyHeader aria-label="simple table">
          <TableBody>
            {
              Movetext.toRows(state.board.movetext).map((row, i) => (
                <TableRow key={i}>
                  <TableCell align="right">{i + 1}</TableCell>
                  <TableCell align="right">{row.w}</TableCell>
                  <TableCell align="right">{row.b}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        size="small"
        variant="text"
        startIcon={<ContentCopyIcon />}
        onClick={() => {
          state.board.movetext ? navigator.clipboard.writeText(state.board.movetext) : null;
        }}
      >
        Copy
      </Button>
    </div>
  );
}

export default MoveValidator;
