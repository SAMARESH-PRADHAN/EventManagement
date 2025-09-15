# from fastapi import FastAPI
# from .models import Base
# from .database import engine
# from .routes import user_routes, login_routes  

# # Create tables
# Base.metadata.create_all(bind=engine)

# app = FastAPI()

# # Include user routes
# app.include_router(user_routes.router)
# app.include_router(login_routes.router) 

# @app.get("/")
# def home():
#     return {"message": "Welcome to Event Management API"}


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Backend import models, database
from Backend.routes import user_routes, login_routes, event_routes
from fastapi.staticfiles import StaticFiles


app = FastAPI()

# Serve images
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# create tables
models.Base.metadata.create_all(bind=database.engine)

# Include routes
app.include_router(user_routes.router)
app.include_router(login_routes.router)
app.include_router(event_routes.router)

# CORS settings
origins = [
    "http://localhost:5173",  # your React app
    "http://localhost:3000",  # optional, in case another port
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] to allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Welcome to Event Management API"}
