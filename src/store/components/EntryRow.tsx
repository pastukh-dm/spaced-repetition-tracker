import React from 'react';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { FaBook } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import moment from 'moment';
import en from "date-fns/locale/en-GB";
import { Entry } from '../entries/entriesState';
import { Button, Modal } from 'react-bootstrap';
import { repetitionSchedule, dateFormat } from '../../App';

export const EntryRow = ({ entry, onDelete, onUpdate }: EntryRowProps) => {
  const [show, setShow] = useState(false);
  const [learnedAt, setLearnedAt] = useState(moment(entry.learnedAt, dateFormat).toDate());

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
    const nextLearnedAt = moment(date).format(dateFormat);
    if (nextLearnedAt !== entry.learnedAt) {
      onUpdate({ ...entry, learnedAt: nextLearnedAt });
    }
    setLearnedAt(date);
  }
  const handleRepeat = () => {
    onUpdate({ ...entry, repeatedAt: [...entry.repeatedAt, moment().format(dateFormat)] });
  }

  const repetitions = repetitionSchedule.map(days => moment(learnedAt, dateFormat).add(days, 'days'))


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
          selected={learnedAt}
          onChange={handleLearnedAtChange}
          locale={en}
          dateFormat="dd.MM.yyyy"
          todayButton="Today"
        />
      </td>
      <td>
        {repetitions[entry.repeatedAt.length].format(dateFormat)}
      </td>
      {/* <td>{JSON.stringify(entry.repeatedAt)}</td> */}
      <td><progress value={entry.repeatedAt.length} max={repetitionSchedule.length}/></td>
      {/* <td>
        <ul>
          {
            repetitions.map(date =>
              <li>{date}{date.format(dateFormat) === moment().format(dateFormat) ? ' repeat': null}</li>
            )
          }
        </ul>
      </td> */}
      {/* <td>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleRepeat}
        >
          <FaBook />
        </button>
      </td> */}
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