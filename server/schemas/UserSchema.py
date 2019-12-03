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
    usert = graphene.String(description="Is user student or teacher")


class UserSchema(SQLAlchemyObjectType, UserAttribute):
    class Meta:
        model = UserModel
        interfaces = (relay.Node, )

class UserConnection(relay.Connection):
    class Meta:
        node = UserSchema

class CreateUserInput(graphene.InputObjectType, UserAttribute):
    """Arguments to create a person."""
    pass

class CreateUser(graphene.Mutation):
    """Mutation to create a person."""
    user = graphene.Field(lambda: UserSchema, description="Person created by this mutation.")

    class Arguments:
        input = CreateUserInput(required=True)

    def mutate(self, info, input):
        print("input")
        print(input)
        data = input
        data["id"] = data.iduser
        del data['iduser']
        print(data)
        # data = utils.input_to_dictionary(input)
        # data['created'] = datetime.utcnow()
        # data['edited'] = datetime.utcnow()
        print("data")
        print(data)
        user = UserModel(**data)
        db_session.add(user)
        db_session.commit()
        return CreateUser(user=user)