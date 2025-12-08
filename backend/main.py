import logging
from typing import Optional
from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import or_, func
import models
from db import engine, get_db
from pydantic import BaseModel


# models.Base.metadata.drop_all(bind=engine)
models.Base.metadata.create_all(bind=engine)


class UserCreate(BaseModel):
    name: str
    mail: str
    gmail: str
    server: str
    ammy: str
    any: str


class UserUpdate(BaseModel):
    name: Optional[str] = None
    mail: Optional[str] = None
    gmail: Optional[str] = None
    server: Optional[str] = None
    ammy: Optional[str] = None
    any: Optional[str] = None



app = FastAPI(title="Userhub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=[
        "*",
    ],
    allow_headers=[
        "*",
    ],
)


@app.post("/users/")
async def create_user(user_data: UserCreate, db: Session = Depends(get_db)):
    user = models.Users(
        name=user_data.name,
        mail=user_data.mail,
        gmail=user_data.gmail,
        server=user_data.server,
        ammy=user_data.ammy,
        any=user_data.any,
        
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user.to_dict()


@app.get("/users/")
async def search_users(
    q: str | None = Query(None, description="Поиск"),
    db: Session = Depends(get_db),
):
    query = db.query(models.Users)
    if q:
        like_pattern = f"%{q.lower()}%"
        query = query.filter(
            or_(
                func.lower(models.Users.name).like(like_pattern),
                func.lower(models.Users.mail).like(like_pattern),
                func.lower(models.Users.gmail).like(like_pattern),
                func.lower(models.Users.server).like(like_pattern),
                func.lower(models.Users.ammy).like(like_pattern),
                func.lower(models.Users.any).like(like_pattern),
            )
        )
    return [user.to_dict() for user in query.all()]


@app.put("/users/{user_id}/")
async def update_user(
    user_id: int, user_data: UserUpdate, db: Session = Depends(get_db)
):
    db_user = db.query(models.Users).filter(models.Users.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="No User")

    update_data = user_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)
    return db_user.to_dict()


@app.delete("/users/{user_id}/")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.Users).filter(models.Users.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="No User")

    db.delete(db_user)
    db.commit()
    return {"detail": "User deleted"}
