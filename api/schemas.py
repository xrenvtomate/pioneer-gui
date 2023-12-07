from pydantic import BaseModel

class DroneIP(BaseModel):
    drone_ip: str

class GoTo(BaseModel):
    x: int
    y: int
    z: int