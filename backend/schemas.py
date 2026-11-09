
from pydantic import BaseModel, ConfigDict


class UserCreate(BaseModel):
    name: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


class ProductCreate(BaseModel):
    name: str
    price: int
    category: str
    image: str


class ProductResponse(BaseModel):
    id: int
    name: str
    price: int
    category: str
    image: str

    model_config = ConfigDict(from_attributes=True)


class OrderCreate(BaseModel):
    customer_name: str
    email: str
    phone: str
    address: str
    city: str
    pin_code: str
    items: str
    total: int


class ContactCreate(BaseModel):
    name: str
    email: str
    message: str
