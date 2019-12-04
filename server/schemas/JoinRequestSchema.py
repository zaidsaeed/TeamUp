import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import db_session, Team_Join_Request as RequestModel
import utils

class RequestAttribute:
	idteam = graphene.Int()
	idstudent = graphene.Int()
	idliason = graphene.Int()

class Request(SQLAlchemyObjectType, RequestAttribute):
	class Meta:
		model = RequestModel
		interface = (relay.Node, )

class RequestConnection(relay.Connection):
	class Meta:
		node = Request

class CreateRequestInput(graphene.InputObjectType, RequestAttribute):
	pass

class CreateRequest(graphene.Mutation):
	request = graphene.Field(lambda: Request, description="Request created by this mutation")

	class Arguments:
		input = CreateRequestInput(required=True)

	def mutate(self, info, input):
		print("input")
		print(input)
		data = input
		# data["id"] = data.idrequest
		print("data")
		print(data)
		request = RequestModel(**data)
		db_session.add(request)
		db_session.commit()
		return CreateRequest(request=request)