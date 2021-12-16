from pydantic import BaseModel, Field
from models.pyObjectId import PyObjectId
from bson import ObjectId
from typing import Optional

class Customer(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    email: str
    password: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
        }