from os import stat_result
from fastapi import APIRouter, status, Request
from fastapi.encoders import jsonable_encoder
from fastapi.params import Body
from fastapi.responses import JSONResponse

from models import customer
from db.database import database
from models.customer import Customer

collection = database.customer

router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "Not found"}},
)

@router.get('/')
async def get_all_users():
    customers = []
    cursor = collection.find()
    async for doc in cursor:
        customers.append(customer.Customer(**doc))
    return customers

async def check_user_exists(email: str):
    email = await  collection.find_one({"email" : email})
    return email

@router.post('/sign-up', response_model=Customer)
async def add_new_user(request: Request, user: Customer = Body(...)):
    user = jsonable_encoder(user)
    response = {
        'exists': False,
    }
    if (existing_user := await check_user_exists(user["email"])) is None:
        new_user = await collection.insert_one(user)
        created_user = await collection.find_one(
            { "_id": new_user.inserted_id }
        )
        response["created_user"] = created_user
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=response)
    
    if (existing_user) is not None:
        response["exists"] = True
        return JSONResponse(status_code=status.HTTP_200_OK, content=response)


@router.post('/log-in', response_model=Customer)
async def validate_user_login(request: Request, user: Customer = Body(...)):
    user = jsonable_encoder(user)
    response = {
        'exists': False,
    }
    if (existing_user := await check_user_exists(user["email"])) is not None:
        response["user"] = existing_user
        response["exists"] = True
        return JSONResponse(status_code=status.HTTP_200_OK, content=response)
    
    if (existing_user) is None:
        return JSONResponse(status_code=status.HTTP_200_OK, content=response)