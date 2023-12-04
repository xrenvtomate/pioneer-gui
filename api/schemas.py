from pydantic import BaseModel

class DroneIP(BaseModel):
    ip: str

class GoTo(BaseModel):
    x: int
    y: int
    z: int