import React, { useState } from "react";
import axios from "axios";
const CreateEvents = () => {
  const [createEvents, setEvents] = useState({
    title: "",
    description: "",
    scheduledAt: "",
    venue: "",
  });

  const { title, description, scheduledAt, venue } = createEvents;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvents({ ...createEvents, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventedDefault();
    try {
      await axios
        .post(`${process.env.API_BASE_URL}/create-event`, {
          title,
          description,
          scheduledAt,
          venue,
        })
        .then((response) => {
          console.log("Create Events>> ", JSON.stringify(response));
          window.localStorage.setItem("redux_auth", JSON.stringify(response));
        });
    } catch (err) {
      console.log("Error in Login Page ", err);
    }
  };

  return (
    <div>
      <div className="mt-4 mx-auto text-center">
        <h2>CreateEvents</h2>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-6 offset-3">
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="form-group mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Enter Name"
                  value={title}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Enter Description"
                  value={description}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Scheduled At</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="scheduledAt"
                  placeholder="Enter Scheduled Date and Time"
                  min="2023-02-5T00:00"
                  value={scheduledAt}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Venue</label>
                <select
                  name="venue"
                  className="form-control"
                  value={venue}
                  onChange={handleChange}
                >
                  <option value="null">--SELECT--</option>
                  <option value="Seminar Hall">Seminar Hall</option>
                  <option value="Auditorium">Auditorium</option>
                  <option value="Ground">Ground</option>
                </select>
              </div>

              <button
                disabled={!title || !description || !scheduledAt || venue}
                className="btn btn-purple text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvents;
