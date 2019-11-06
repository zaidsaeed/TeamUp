# flask_sqlalchemy/schema.py
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import db_session, User as UserModel
import utils
from datetime import datetime

class UserAttribute:
    iduser = graphene.Int(description="ID OF USER")
    username = graphene.String(description="UserName of the Student.")
    userpassword = graphene.String(description="Password of the student.")


class User(SQLAlchemyObjectType, UserAttribute):
    class Meta:
        model = UserModel
        interfaces = (relay.Node, )

class UserConnection(relay.Connection):
    class Meta:
        node = User

class CreateUserInput(graphene.InputObjectType, UserAttribute):
    """Arguments to create a person."""
    pass

class CreateUser(graphene.Mutation):
    """Mutation to create a person."""
    user = graphene.Field(lambda: User, description="Person created by this mutation.")

    class Arguments:
        input = CreateUserInput(required=True)

    def mutate(self, info, input):
        data = utils.input_to_dictionary(input)
        # data['created'] = datetime.utcnow()
        # data['edited'] = datetime.utcnow()

        user = UserModel(**data)
        db_session.add(user)
        db_session.commit()
        return CreateUser(user=user)