from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    with open('data.txt', 'r') as f:
        n = int(f.read())
    n += 1
    print(123)
    
    with open('data.txt', 'w') as f:
        f.write(str(n))

    return {"message": f"hello {n}"}
