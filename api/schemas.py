from pydantic import BaseModel


class DroneIp(BaseModel):
    drone_ip: str


class GoTo(BaseModel):
    x: float
    y: float
    z: float
