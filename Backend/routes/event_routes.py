import os
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List
from datetime import date, time

from ..database import get_db
from ..models import Event
from ..schemas import EventResponse

router = APIRouter(
    prefix="/events",
    tags=["Events"]
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# ✅ Get all events
@router.get("/", response_model=List[EventResponse])
def get_events(db: Session = Depends(get_db)):
    events = db.query(Event).order_by(Event.id.asc()).all()
    return events


# ✅ Create event with file upload
@router.post("/", response_model=EventResponse)
async def create_event(
    title: str = Form(...),
    description: str = Form(None),
    date: date = Form(...),
    time: time = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    image_url = None
    if file:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())
        image_url = f"/{UPLOAD_DIR}/{file.filename}"

    new_event = Event(
        title=title,
        description=description,
        date=date,
        time=time,
        image_url=image_url
    )
    db.add(new_event)
    db.commit()
    db.refresh(new_event)
    return new_event


# ✅ Update event with file upload
@router.put("/{event_id}", response_model=EventResponse)
async def update_event(
    event_id: int,
    title: str = Form(...),
    description: str = Form(None),
    date: date = Form(...),
    time: time = Form(...),
    file: UploadFile = File(None),
    db: Session = Depends(get_db),
):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    event.title = title
    event.description = description
    event.date = date
    event.time = time

    if file:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as f:
            f.write(await file.read())
        event.image_url = f"/{UPLOAD_DIR}/{file.filename}"

    db.commit()
    db.refresh(event)
    return event


# ✅ Delete event
@router.delete("/{event_id}")
def delete_event(event_id: int, db: Session = Depends(get_db)):
    event = db.query(Event).filter(Event.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    db.delete(event)
    db.commit()
    return {"msg": "Event deleted successfully"}
