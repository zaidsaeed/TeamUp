# flask_sqlalchemy/schema.py
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import db_session, User as UserModel
from schemas.UserSchema import User, UserConnection, CreateUser
from schemas.CourseSchema import Course, CourseConnection, CreateCourse
from schemas.TeamSchema import Team , TeamConnection , CreateTeam
import utils
from datetime import datetime

class Mutation(graphene.ObjectType):
    createCourse = CreateCourse.Field()
    createUser = CreateUser.Field()
    createTeam= CreateTeam.Field()
	


class Query(graphene.ObjectType):
    node = relay.Node.Field()
    # Allows sorting over multiple columns, by default over the primary key
    all_users = SQLAlchemyConnectionField(UserConnection)
    user = graphene.relay.Node.Field(User)
    all_courses = SQLAlchemyConnectionField(CourseConnection)
    course = graphene.relay.Node.Field(Course)
    # Disable sorting over this field
    # all_departments = SQLAlchemyConnectionField(DepartmentConnection, sort=None)
    all_teams = SQLAlchemyConnectionField(TeamConnection)
    team = graphene.relay.Node.Field(Team)


schema = graphene.Schema(query=Query, mutation=Mutation)