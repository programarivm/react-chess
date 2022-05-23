import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import playOnlineDialogActionTypes from '../../constants/dialog/playOnlineDialogActionTypes';
import modeActionTypes from '../../constants/modeActionTypes';
import WsAction from '../../ws/WsAction';

const PlayOnlineTable = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      WsAction.onlineGames(state);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePlay = (hash) => {
    WsAction.quit(state).then(() => {
      dispatch({ type: modeActionTypes.SET_ANALYSIS });
      WsAction.accept(state, hash).then(() => {
        dispatch({ type: playOnlineDialogActionTypes.CLOSE });
      });
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Minutes</TableCell>
            <TableCell align="right">Increment</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {state.playOnlineDialog.rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell align="left">Anonymous</TableCell>
              <TableCell align="right">{row.color}</TableCell>
              <TableCell align="right">{row.min}</TableCell>
              <TableCell align="right">{row.increment}</TableCell>
              <TableCell align="right">
                <Button
                  disabled={state.mode.play.hash === row.hash ? true : false}
                  variant="outlined"
                  startIcon={<PlayArrowIcon />}
                  onClick={() => handlePlay(row.hash)}
                >
                  Play
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayOnlineTable;