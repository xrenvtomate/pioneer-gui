from pydantic import BaseModel

class DroneIp(BaseModel):
    drone_ip: str

class GoTo(BaseModel):
    x: int
    y: int
    z: int