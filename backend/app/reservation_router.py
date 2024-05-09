from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from session import get_db
from datetime import date
from sqlalchemy          import select

router = APIRouter()

@router.post("/reserve")
def existing_reservation(date: date):
    query = 