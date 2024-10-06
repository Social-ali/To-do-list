import React, { useState, useEffect } from 'react';
import './EditNoteModal.css'; // CSS for modal

const EditNoteModal = ({ show, note, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('');
  const [errors, setErrors] = useState({}); // State to store validation errors

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setDescription(note.description);
      setTag(note.tag);
    }
  }, [note]);

  const validateForm = () => {
    const errors = {};
    if (!title.trim()) errors.title = "Title is required";
    if (!description.trim()) errors.description = "Description is required";
    if (!tag.trim()) errors.tag = "Tag is required";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(note._id, title, description, tag);
      onClose();
    }
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" id="editNoteModal" tabIndex="-1" aria-labelledby="editNoteModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editNoteModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="editTitle" className="form-label">Title</label>
                <input
                  type="text"
                  className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                  id="editTitle"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="editDescription" className="form-label">Description</label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  id="editDescription"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {errors.description && <div className="invalid-feedback">{errors.description}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="editTag" className="form-label">Tag</label>
                <input
                  type="text"
                  className={`form-control ${errors.tag ? 'is-invalid' : ''}`}
                  id="editTag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
                {errors.tag && <div className="invalid-feedback">{errors.tag}</div>}
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Close</button>
            <button type="button" className="btn btn-primary" onClick={handleSave}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;
