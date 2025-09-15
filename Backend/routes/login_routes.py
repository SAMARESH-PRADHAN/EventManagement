from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from Backend.database import get_db
from Backend.models import User
from Backend.schemas import UserLogin

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

@router.post("/login")
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    # Check role
    if db_user.role == "admin":
        panel = "admin panel"
    else:
        panel = "user panel"

    return {
        "msg": f"Login successful! Redirect to {panel}",
        "user_id": db_user.id,
        "name": db_user.name,
        "role": db_user.role
    }
