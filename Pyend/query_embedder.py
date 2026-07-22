from fastapi import FastAPI
from embedder import model

app = FastAPI()

@app.get("/embed")
def embed(query : str):
    embedding = model.encode(query)
    return {
        "embedding" : embedding.tolist()
    }