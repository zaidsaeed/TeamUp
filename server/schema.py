# flask_sqlalchemy/schema.py
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import db_session, User as UserModel
from schemas.UserSchema import User, UserConnection, CreateUser
import utils
from datetime import datetime

class Mutation(graphene.ObjectType):
    createUser = CreateUser.Field()


class Query(graphene.ObjectType):
    node = relay.Node.Field()
    # Allows sorting over multiple columns, by default over the primary key
    all_users = SQLAlchemyConnectionField(UserConnection)
    user = graphene.relay.Node.Field(User)
    # Disable sorting over this field
    # all_departments = SQLAlchemyConnectionField(DepartmentConnection, sort=None)



schema = graphene.Schema(query=Query, mutation=Mutation)