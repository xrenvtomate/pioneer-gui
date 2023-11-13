from pydantic import BaseModel

class DroneIP(BaseModel):
    ip: str