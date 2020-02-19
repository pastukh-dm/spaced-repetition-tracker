import React, { useState } from 'react';
import { createEntry } from '../store/entries/entriesSlice';
import { Button, Modal, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

export function AddEntry(props: AddEntryProps) {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddEntry = () => {
    setShow(false);
    props.onSubmit({ title, link });
  };


  return (
    <>
      <Button
        variant="primary"
        onClick={handleShow}
      >
        Add
            </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new learned item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              placeholder="Link"
              onChange={(e) => setLink(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
                </Button>
          <Button variant="primary" onClick={handleAddEntry}>
            Save Changes
                </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

interface AddEntryProps {
  onSubmit: (data: { title: string, link?: string }) => void
}