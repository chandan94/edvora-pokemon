from fastapi import FastAPI
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware


from routers import users, pokemon

origins = ["*"] # This will eventually be changed to only the origins you will use once it's deployed, to secure the app a bit more.

middleware = [ Middleware(
        CORSMiddleware,
         allow_origins=origins, 
         allow_credentials=True, 
         allow_methods=['*'], 
         allow_headers=['*'])]


app = FastAPI(middleware=middleware)


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"]
# )

app.include_router(users.router)
app.include_router(pokemon.router)

@app.get('/')
def get_root():
    return {"Ping": "Pong"}
