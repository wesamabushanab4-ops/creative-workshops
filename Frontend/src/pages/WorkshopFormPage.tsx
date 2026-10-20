import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../api";
import type { Instructor, WorkshopPayload } from "../types";

function toInputDate(value: string): string {
  const date = new Date(value);
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

function currentInputDate(): string {
  const local = new Date(Date.now() - new Date().getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

export default function WorkshopFormPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [form, setForm] = useState<WorkshopPayload>({
    instructorId: "",
    topic: "",
    room: "",
    startAt: "",
    endAt: "",
  });
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([
      api.getInstructors(),
      isEditing && id ? api.getWorkshop(id) : Promise.resolve(null),
    ])
      .then(([instructorList, workshop]) => {
        if (!active) return;
        setInstructors(instructorList);
        if (workshop) {
          setForm({
            instructorId: workshop.instructorId,
            topic: workshop.topic,
            room: workshop.room,
            startAt: toInputDate(workshop.startAt),
            endAt: toInputDate(workshop.endAt),
          });
        }
      })
      .catch((cause: Error) => { if (active) setError(cause.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id, isEditing]);

  function updateField(field: keyof WorkshopPayload, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!form.instructorId || !form.topic.trim() || !form.room.trim() || !form.startAt || !form.endAt) {
      setError("Please complete every field.");
      return;
    }
    const startTime = new Date(form.startAt).getTime();
    const endTime = new Date(form.endAt).getTime();
    if (Number.isNaN(startTime) || Number.isNaN(endTime)) {
      setError("Enter valid dates and times.");
      return;
    }
    if (startTime > endTime) {
      setError("The start time must be before the end time.");
      return;
    }
    if (!isEditing && startTime <= Date.now()) {
      setError("A new workshop must start in the future. Choose a future date and time.");
      return;
    }

    setSaving(true);
    try {
      const payload = { ...form, topic: form.topic.trim(), room: form.room.trim() };
      if (isEditing && id) {
        await api.updateWorkshop(id, payload);
      } else {
        await api.createWorkshop(payload);
      }
      navigate(`/workshops?instructor=${encodeURIComponent(form.instructorId)}`, {
        replace: true,
      });
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save the workshop.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="page inner-page"><div className="empty-state">Loading workshop details...</div></div>;
  }

  return (
    <div className="page inner-page form-page">
      <Link className="back-link" to="/workshops">← Back to workshops</Link>
      <div className="page-heading">
        <span className="eyebrow"><span className="eyebrow-dot" /> {isEditing ? "EDIT WORKSHOP" : "NEW WORKSHOP"}</span>
        <h1>{isEditing ? "Update the details" : "Plan your next workshop"}</h1>
        <p>{isEditing ? "Edit the workshop details and save your changes." : "Fill in the details to add a workshop to the calendar."}</p>
      </div>
      {error && <div className="alert alert-error" role="alert">{error}</div>}
      <form className="workshop-form" onSubmit={(event) => void handleSubmit(event)} noValidate>
        <div className="form-section-title"><span>01</span><div><b>Workshop details</b><small>What will we make together?</small></div></div>
        <div className="form-grid">
          <label className="field field-full">
            Instructor
            <select required value={form.instructorId} onChange={(event) => updateField("instructorId", event.target.value)}>
              <option value="">Select an instructor</option>
              {instructors.map((instructor) => <option key={instructor._id} value={instructor._id}>{instructor.name}</option>)}
            </select>
          </label>
          <label className="field">
            Workshop topic
            <input required value={form.topic} onChange={(event) => updateField("topic", event.target.value)} placeholder="For example: Pottery Basics" />
          </label>
          <label className="field">
            Room
            <input required value={form.room} onChange={(event) => updateField("room", event.target.value)} placeholder="For example: Studio B" />
          </label>
        </div>
        <div className="form-section-title form-section-spaced"><span>02</span><div><b>When are we meeting?</b><small>Choose a date and time</small></div></div>
        <div className="form-grid">
          <label className="field">
            Start date and time
            <input required type="datetime-local" value={form.startAt} min={!isEditing ? currentInputDate() : undefined} onChange={(event) => updateField("startAt", event.target.value)} />
          </label>
          <label className="field">
            End date and time
            <input required type="datetime-local" value={form.endAt} onChange={(event) => updateField("endAt", event.target.value)} />
          </label>
        </div>
        <div className="form-footer">
          <span>All fields are required</span>
          <div>
            <Link className="cancel-link" to="/workshops">Cancel</Link>
            <button className="button button-dark" type="submit" disabled={saving}>
              {saving ? "Saving..." : isEditing ? "Save changes" : "Add workshop"} <span>→</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
