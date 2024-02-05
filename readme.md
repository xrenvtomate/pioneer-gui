## pioneer mini gui
gui for pioneer sdk

clone repo
```bash
git clone https://github.com/xrenvtomate/pioneer-gui
```

### install fontend dependencies
```bash
cd frontend
npm i
```
### start a frontend dev server
```bash
npm run dev
```

### install backend dependencies
```bash
cd api
pip install fastapi uvicorn websockets
```

### start the backend
```bash
uvicorn main:app --reload 
```
