import psycopg
from database import connection
from embedder import model
import time


BATCH_SIZE = 500

with connection.cursor() as cursor:
    cursor.execute('''
        SELECT id, name, summary, storyline
        FROM games
        WHERE embedding IS NULL
    ''')
    
    
    total = 0
    start = time.time()
    
    while True:
        rows = cursor.fetchmany(BATCH_SIZE)
        
        if not rows:
            break
        
        texts = []
        
        for game_id, name, summary, storyline in rows:
            separator = " "
            text = separator.join(filter(None, [name, summary, storyline]))
            texts.append(text)
        
        embeddings = model.encode(texts)
        
        with connection.cursor() as update_cursor:
            for (game_id, *_), embedding in zip(rows, embeddings):
                result = update_cursor.execute('''
                    UPDATE games
                    SET embedding = %s
                    WHERE id = %s
                ''', (embedding.tolist(), game_id))
                
                print(result.rowcount)
            
        connection.commit()
        
        total += len(rows)
        
        elapsed = time.time() - start
        rate = total / elapsed
        print(f"Embedded {total} games "f"({rate:.2f} games/sec)")       

print("Done!")
connection.close()