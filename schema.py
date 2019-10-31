# flask_sqlalchemy/schema.py
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import db_session, Employee as EmployeeModel
import utils
from datetime import datetime


# class Department(SQLAlchemyObjectType):
#     class Meta:
#         model = DepartmentModel
#         interfaces = (relay.Node, )


# class DepartmentConnection(relay.Connection):
#     class Meta:
#         node = Department

class EmployeeAttribute:
    iduser = graphene.Int(description="ID OF USER")
    username = graphene.String(description="UserName of the Student.")
    userpassword = graphene.String(description="Password of the student.")


class Employee(SQLAlchemyObjectType, EmployeeAttribute):
    class Meta:
        model = EmployeeModel
        interfaces = (relay.Node, )



class EmployeeConnection(relay.Connection):
    class Meta:
        node = Employee

class CreateEmployeeInput(graphene.InputObjectType, EmployeeAttribute):
    """Arguments to create a person."""
    pass

class CreateEmployee(graphene.Mutation):
    """Mutation to create a person."""
    employee = graphene.Field(lambda: Employee, description="Person created by this mutation.")

    class Arguments:
        input = CreateEmployeeInput(required=True)

    def mutate(self, info, input):
        data = utils.input_to_dictionary(input)
        # data['created'] = datetime.utcnow()
        # data['edited'] = datetime.utcnow()

        employee = EmployeeModel(**data)
        db_session.add(employee)
        db_session.commit()
        return CreateEmployee(employee=employee)


class Mutation(graphene.ObjectType):
    createEmployee = CreateEmployee.Field()


class Query(graphene.ObjectType):
    node = relay.Node.Field()
    # Allows sorting over multiple columns, by default over the primary key
    all_employees = SQLAlchemyConnectionField(EmployeeConnection)
    employee = graphene.relay.Node.Field(Employee)
    # Disable sorting over this field
    # all_departments = SQLAlchemyConnectionField(DepartmentConnection, sort=None)



schema = graphene.Schema(query=Query, mutation=Mutation)