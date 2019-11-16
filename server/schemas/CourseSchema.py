# flask_sqlalchemy/schema.py
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import db_session, User as UserModel
from models import db_session, Course as CourseModel
import utils
from datetime import datetime

class CourseAttribute:
    idcourse = graphene.String(description="Course ID")
    idprof = graphene.Int(description = "Course instructor ID")
    deadline = graphene.types.datetime.Date(description = "Team creation deadline")
    minstudents = graphene.Int(description="Minimum students in a group")
    maxstudents = graphene.Int(description="Maximum students in a group")


class Course(SQLAlchemyObjectType, CourseAttribute):
    class Meta:
        model = CourseModel
        interfaces = (relay.Node, )

class CourseConnection(relay.Connection):
    class Meta:
        node = Course

class CreateCourseInput(graphene.InputObjectType, CourseAttribute):
    """Arguments to create a course."""
    pass

class CreateCourse(graphene.Mutation):
    """Mutation to create a course."""
    course = graphene.Field(lambda: Course, description="Course created by this mutation.")

    class Arguments:
        input = CreateCourseInput(required=True)

    def mutate(self, info, input):
        data = utils.input_to_dictionary(input)
        # data['created'] = datetime.utcnow()
        # data['edited'] = datetime.utcnow()

        course = CourseModel(**data)
        db_session.add(course)
        db_session.commit()
        return CreateCourse(course=course)