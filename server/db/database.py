import motor.motor_asyncio
from dotenv import dotenv_values
import os

config = dotenv_values(".env")
DATABASE_URI = config.get("DB_URI")
#ensures that if we have a system environment variable, it uses that instead

client = motor.motor_asyncio.AsyncIOMotorClient(DATABASE_URI)
database = client.edvora