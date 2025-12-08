from sqlalchemy import String, Integer
from sqlalchemy.orm import Mapped, mapped_column
from db import Base


class Users(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=True)
    mail: Mapped[str] = mapped_column(String(100), index=True, nullable=True)
    gmail: Mapped[str] = mapped_column(
        String(100), index=True, nullable=True
    )
    server: Mapped[str] = mapped_column(
        String(100),  index=True, nullable=True
    )
    ammy: Mapped[str] = mapped_column(
        String(100), nullable=True, index=True
    )
    any: Mapped[str] = mapped_column(
        String(100), nullable=True, index=True
    )

    def to_dict(
        self,
    ):
        return {
            "id": self.id,
            "name": self.name,
            "mail": self.mail,
            "gmail": self.gmail,
            "server": self.server,
            "ammy": self.ammy,
            "any": self.any,
        }
