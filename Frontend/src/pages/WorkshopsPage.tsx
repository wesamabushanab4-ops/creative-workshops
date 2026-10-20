import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../api";
import type { Instructor, Workshop } from "../types";

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function duration(start: string, end: string): string {
  const minutes = Math.max(0, Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60_000));
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  if (hours && remainder) return `${hours} hr ${remainder} min`;
  if (hours) return `${hours} ${hours === 1 ? "hour" : "hours"}`;
  return `${remainder} min`;
}

export default function WorkshopsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedInstructor = searchParams.get("instructor") ?? "";
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loadingInstructors, setLoadingInstructors] = useState(true);
  const [loadingWorkshops, setLoadingWorkshops] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    api.getInstructors()
      .then(setInstructors)
      .catch((cause: Error) => setError(cause.message))
      .finally(() => setLoadingInstructors(false));
  }, []);

  useEffect(() => {
    if (!selectedInstructor) {
      setWorkshops([]);
      return;
    }
    let active = true;
    setLoadingWorkshops(true);
    setError("");
    api.getWorkshops(selectedInstructor)
      .then((items) => { if (active) setWorkshops(items); })
      .catch((cause: Error) => { if (active) setError(cause.message); })
      .finally(() => { if (active) setLoadingWorkshops(false); });
    return () => { active = false; };
  }, [selectedInstructor]);

  async function removeWorkshop(workshop: Workshop) {
    if (!window.confirm(`Delete the "${workshop.topic}" workshop?`)) return;
    setError("");
    setNotice("");
    try {
      await api.deleteWorkshop(workshop._id);
      setWorkshops((current) => current.filter((item) => item._id !== workshop._id));
      setNotice("Workshop deleted successfully.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not delete the workshop.");
    }
  }

  return (
    <div className="page inner-page">
      <div className="page-heading workshops-heading">
        <div>
          <span className="eyebrow"><span className="eyebrow-dot" /> WORKSHOP CALENDAR</span>
          <h1>What will you make today?</h1>
          <p>Choose an instructor to see upcoming and past workshops.</p>
        </div>
        <Link className="button button-dark" to="/workshops/new"><span>+</span> Add a workshop</Link>
      </div>

      <section className="filter-panel">
        <label htmlFor="instructor-select">Choose an instructor</label>
        <select
          id="instructor-select"
          value={selectedInstructor}
          disabled={loadingInstructors}
          onChange={(event) => setSearchParams(event.target.value ? { instructor: event.target.value } : {})}
        >
          <option value="">{loadingInstructors ? "Loading instructors..." : "Select an instructor"}</option>
          {instructors.map((instructor) => (
            <option key={instructor._id} value={instructor._id}>{instructor.name}</option>
          ))}
        </select>
        <span className="filter-note">Instructor list loaded from the server</span>
      </section>

      {error && <div className="alert alert-error" role="alert">{error}</div>}
      {notice && <div className="alert alert-success" role="status">{notice}</div>}
      {!selectedInstructor ? (
        <div className="empty-state"><span className="empty-icon">↗</span><h2>Start by choosing an instructor</h2><p>Select an instructor from the list to explore their workshops.</p></div>
      ) : loadingWorkshops ? (
        <div className="empty-state"><span className="loading-dot" /><p>Loading workshops...</p></div>
      ) : workshops.length === 0 ? (
        <div className="empty-state"><span className="empty-icon">✳</span><h2>No workshops yet</h2><p>Add a workshop for the instructor you selected.</p><Link className="text-link" to="/workshops/new">Add a workshop <span>→</span></Link></div>
      ) : (
        <div className="workshop-grid">
          {workshops.map((workshop) => {
            const upcoming = new Date(workshop.startAt).getTime() > Date.now();
            return (
              <article className={`workshop-card ${upcoming ? "upcoming" : "past"}`} key={workshop._id}>
                <div className="workshop-card-top">
                  <span className="status-tag"><span />{upcoming ? "Upcoming" : "Completed"}</span>
                  <span className="workshop-symbol" aria-hidden="true">✳</span>
                </div>
                <h2>{workshop.topic}</h2>
                <div className="workshop-details">
                  <span><i>⌂</i>{workshop.room}</span>
                  <span><i>◷</i>{formatDate(workshop.startAt)}</span>
                  <span><i>↳</i>Ends {formatDate(workshop.endAt)}</span>
                </div>
                <div className="workshop-card-bottom">
                  <span className="duration-label">DURATION <b>{duration(workshop.startAt, workshop.endAt)}</b></span>
                  <div className="card-actions">
                    <Link to={`/workshops/${workshop._id}/edit`} aria-label={`Edit ${workshop.topic}`}>Edit</Link>
                    <button type="button" onClick={() => void removeWorkshop(workshop)} aria-label={`Delete ${workshop.topic}`}>Delete</button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
