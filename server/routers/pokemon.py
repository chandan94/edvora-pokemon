from bson.objectid import ObjectId
from fastapi import APIRouter, Request, status
from fastapi.params import Body
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from models import pokemon
from db.database import database
from models.pokemon import Pokemon

collection = database.fav_pokemon

router = APIRouter(
    prefix="/fav-pokemon",
    tags=["pokemon"],
    responses={404: {"description": "Not found"}},
)

@router.post("/get-fav-list")
async def get_all_fav_pokemon(request: Request, userBody = Body(...)):
    userBody = jsonable_encoder(userBody)
    user = userBody["data"]["user"] 
    pokemon = []
    filter = {}
    if (user) is not None:
        filter["user"] = user
    cursor = collection.find(filter)
    async for doc in cursor:
        doc["_id"] = str(doc["_id"])
        pokemon.append(doc)
    return pokemon
    
@router.post('/', response_model=Pokemon)
async def add_new_fav_pokemon(request: Request, pokemon: Pokemon = Body(...)):
    pokemon = jsonable_encoder(pokemon)
    response = {
        'insert_success': False,
    }
    if (new_pokemon := await collection.insert_one(pokemon)) is not None:
        created_pokemon = await collection.find_one(
            { "_id": new_pokemon.inserted_id }
        )
        response["insert_success"] = True
        response["inserted_pokemon_id"] = created_pokemon["_id"]
        return JSONResponse(status_code=status.HTTP_201_CREATED, content=response)
    
    if (new_pokemon) is None:
        return JSONResponse(status_code=status.HTTP_200_OK, content=response)
    