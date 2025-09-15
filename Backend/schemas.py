from pydantic import BaseModel, EmailStr
from datetime import date, time, datetime
from typing import Optional



class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    password: Optional[str] = None
    role: Optional[str] = None
    
    
    
    
class EventBase(BaseModel):
    title: str
    description: str | None = None
    date: date
    time: time


class EventCreate(EventBase):
    pass


class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[date] = None
    time: Optional[time] = None

class EventResponse(EventBase):
    id: int
    image_url: str | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None

    class Config:
        from_attributes = True  # ✅ for SQLAlchemy models