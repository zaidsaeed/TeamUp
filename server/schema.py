# flask_sqlalchemy/schema.py
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import db_session, User as UserModel
import utils
from datetime import datetime


# class Department(SQLAlchemyObjectType):
#     class Meta:
#         model = DepartmentModel
#         interfaces = (relay.Node, )


# class DepartmentConnection(relay.Connection):
#     class Meta:
#         node = Department

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