import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createEntry, deleteEntry, updateEntry } from './store/entries/entriesSlice';
import { RootState } from './store/RootState';
import { Entry } from './store/entries/entriesState';
import { MdDelete } from 'react-icons/md';
import './App.scss';
import { Container, Button, Table, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import moment from 'moment';
import en from "date-fns/locale/en-GB";

const App = () => {
  const dispatch = useDispatch();
  const entries = useSelector<RootState, Entry[]>(state => state.entries.list);

  const handleAddEntry = () => dispatch(createEntry('New entry'))
  const handleDeleteEntry = (entry: Entry) => dispatch(deleteEntry(entry.id))
  const handleUpdateEntry = (entry: Entry) => dispatch(updateEntry(entry))

  return (
    <div className="App">
      <Container>
        <br />
        <h1>Spaced Repetition Tracker</h1>
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
      </Container>
    </div>
  );
}

const EntryRow = ({ entry, onDelete, onUpdate }: EntryRowProps) => {
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(moment(entry.learnedAt, 'DD.MM.YYYY').toDate());

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleDelete = () => {
    onDelete(entry);
    setShow(false);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.which === 13) {
      e.preventDefault();
    }
  }
  const handleTitleChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const nextTitle = e.target.value || entry.title;
    if (nextTitle !== entry.title) {
      onUpdate({ ...entry, title: nextTitle });
    }
  }
  const handleLearnedAtChange = (date: Date) => {
    const nextLearnedAt = moment(date).format('DD.MM.YYYY');
    if (nextLearnedAt !== entry.learnedAt) {
      onUpdate({ ...entry, learnedAt: nextLearnedAt });
    }
    setStartDate(date);
  }

  return (
    <tr key={entry.id}>
      <td>
        <input
          type="text"
          defaultValue={entry.title}
          onKeyDown={handleKeyDown}
          onBlur={handleTitleChange}
        />
      </td>
      <td>
        <DatePicker
          selected={startDate}
          onChange={handleLearnedAtChange}
          locale={en}
          dateFormat="dd.MM.yyyy"
          todayButton="Today"
        />
      </td>
      <td>
        <button
          className="text-danger"
          onClick={handleShow}
        >
          <MdDelete />
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You are going to delete entry: "{entry.title}"
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </td>
    </tr>
  )
}
interface EntryRowProps {
  entry: Entry,
  onDelete: (entry: Entry) => void
  onUpdate: (entry: Entry) => void
}

export default App;
