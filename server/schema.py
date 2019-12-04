# flask_sqlalchemy/schema.py
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import db_session, User as UserModel
from schemas.UserSchema import UserSchema, UserConnection, CreateUser
from schemas.CourseSchema import Course, CourseConnection, CreateCourse
from schemas.TeamSchema import TeamSchema , TeamConnection , CreateTeam
from schemas.JoinRequestSchema import Request, RequestConnection, CreateRequest, DeleteRequest
from schemas.Email import Email, EmailConnection, CreateEmail
from schemas.TeamMemberSchema import Member, MemberConnection, CreateMember
from schemas.JoinRequestSchema import Request, RequestConnection, CreateRequest
import utils
from datetime import datetime

def SendEmail(email):
   raise Exception('The value of email was: {}'.format(email))

class Mutation(graphene.ObjectType):
    createCourse = CreateCourse.Field()
    createUser = CreateUser.Field()
    createTeam= CreateTeam.Field()
    createRequest = CreateRequest.Field()
    createEmail = CreateEmail.Field()
    createMember = CreateMember.Field()
    deleteRequest = DeleteRequest.Field()



class Query(graphene.ObjectType):
    node = relay.Node.Field()
    # Allows sorting over multiple columns, by default over the primary key
    all_users = SQLAlchemyConnectionField(UserConnection)
    user = graphene.relay.Node.Field(UserSchema)
    all_courses = SQLAlchemyConnectionField(CourseConnection)
    course = graphene.relay.Node.Field(Course)
    # Disable sorting over this field
    # all_departments = SQLAlchemyConnectionField(DepartmentConnection, sort=None)
    all_teams = SQLAlchemyConnectionField(TeamConnection)
    team = graphene.relay.Node.Field(TeamSchema)
    all_requests = SQLAlchemyConnectionField(RequestConnection)
    request = graphene.relay.Node.Field(Request)


schema = graphene.Schema(query=Query, mutation=Mutation)