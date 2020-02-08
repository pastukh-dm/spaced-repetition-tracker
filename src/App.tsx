import React from 'react';
// import './App.scss';
import { Container, TableContainer, Paper, TableHead, TableCell, Table, Button, TableBody, TableRow } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { addEntry } from './store/entries/entriesSlice';
import { RootState } from './store/RootState';
import { Entry } from './store/entries/entriesState';
// import moment from 'moment';

const App = () => {
  const dispatch = useDispatch();
  const entries = useSelector<RootState, Entry[]>(state => state.entries.list);
  return (
    <div className="App">
      <Container>
        <h1>Spaced Repetition Tracker</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(addEntry('New entry'))}
        >
          Add
          </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Learned at</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                entries.map(entry =>
                  <TableRow key={entry.id}>
                    <TableCell>{entry.title}</TableCell>
                  
                    <TableCell>{entry.learnedAt}</TableCell>
                  </TableRow>
                )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default App;
