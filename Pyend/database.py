import psycopg
from pgvector.psycopg import register_vector
from config import *

connection = psycopg.connect(
    dbname = DB_NAME,
    user = DB_USER,
    password = DB_PASSWORD,
    host = DB_HOST,
    port = DB_PORT
) 

register_vector(connection)