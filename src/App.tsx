import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createEntry, deleteEntry, updateEntry } from './store/entries/entriesSlice';
import { RootState } from './store/RootState';
import { Entry } from './store/entries/entriesState';
import './App.scss';
import { Container, Button, Table } from 'react-bootstrap';
import { EntryRow } from './store/components/EntryRow';
import moment from 'moment';
import { FaBook } from 'react-icons/fa';

export const repetitionSchedule = [3, 7, 10, 14, 20, 30, 45, 60];
export const dateFormat = 'DD.MM.YYYY';

const App = () => {
  const dispatch = useDispatch();
  const entries = useSelector<RootState, Entry[]>(state => state.entries.list);

  const handleAddEntry = () => dispatch(createEntry('New entry'))
  const handleDeleteEntry = (entry: Entry) => dispatch(deleteEntry(entry.id))
  const handleUpdateEntry = (entry: Entry) => dispatch(updateEntry(entry))

  const handleRepeat = (entry: Entry) => {
    handleUpdateEntry({
      ...entry,
      repeatedAt: [...entry.repeatedAt, getNextRepeatDate(entry)]
    })
  }

  const toRepeat = getEntriesToRepeat(entries);


  return (
    <div className="App">
      <Container>
        <br />
        <h1>Spaced Repetition Tracker</h1>
        <br />
        <div className="card">
          <div className="card-body">
            <h2>Repeat</h2>
            {
              toRepeat.length ?
                <ul>
                  {
                    getEntriesToRepeat(entries).map(entry =>
                      <li key={entry.id}>
                        {entry.title}
                        {' '}
                        ({getPastRepetionDatesByEntry(entry).length - entry.repeatedAt.length})
                <button
                          className="btn text-primary btn-sm"
                          onClick={() => handleRepeat(entry)}
                        >
                          <FaBook />
                        </button>
                      </li>
                    )
                  }
                </ul>
                : 'Nothing to repeat'
            }
          </div>
        </div>
        <br/>
        <div className="card">
          <div className="card-body">
            <h3>Learned</h3>
            <br />
            <Button
              variant="primary"
              onClick={handleAddEntry}
            >
              Add
        </Button>
            <br />
            <br />
            {
              entries.length > 0 ?
                <Table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Learned at</th>
                      <th>Next repetition at</th>
                      <th>Progress</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      entries.map(entry =>
                        <EntryRow
                          key={entry.id}
                          entry={entry}
                          onDelete={handleDeleteEntry}
                          onUpdate={handleUpdateEntry}
                        />
                      )
                    }
                  </tbody>
                </Table>
                : 'No entries'
            }
          </div>
        </div>
      </Container>
    </div>
  );
}

export default App;


const getEntriesToRepeat = (entries: Entry[]): Entry[] => {
  return entries.filter(entry => {
    const repDates = getRepetitionDates(entry.learnedAt);
    const pastReps = getPastRepetionDates(repDates);
    // console.log(entry.title, entry.repeatedAt.length < complReps.length);

    const toRepeat = moment(getNextRepeatDate(entry), dateFormat) <= moment()
      && entry.repeatedAt.length < pastReps.length;
    return toRepeat;
  });
}

const getPastRepetionDates = (dates: string[]): string[] => {
  return dates.filter(repDate => moment(repDate, dateFormat) < moment())
}
const getPastRepetionDatesByEntry = (entry: Entry): string[] => {
  const repDates = getRepetitionDates(entry.learnedAt);
  return repDates.filter(repDate => moment(repDate, dateFormat) < moment())
}

const getRepetitionDates = (learnedAt: string): string[] => {
  return repetitionSchedule
    .map(days => moment(learnedAt, dateFormat).add(days, 'days').format(dateFormat));
}

const getNextRepeatDate = (entry: Entry): string => {
  const repDates = getRepetitionDates(entry.learnedAt)
  return repDates[entry.repeatedAt.length]
}
