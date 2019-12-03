import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import db_session,  Team_Student_Assoc as MemberModel
import utils

class MemberAttribute:
	idteam = graphene.Int()
	iduser = graphene.Int()

class Member(SQLAlchemyObjectType, MemberAttribute):
	class Meta:
		model = MemberModel
		interface = (relay.Node, )

class MemberConnection(relay.Connection):
	class Meta:
		node = Member

class CreateMemberInput(graphene.InputObjectType, MemberAttribute):
	pass

class CreateMember(graphene.Mutation):
	member = graphene.Field(lambda: Member, description="Member created by this mutation")

	class Arguments:
		input = CreateMemberInput(required=True)

	def mutate(self, info, input):
		print("input")
		print(input)
		data = utils.input_to_dictionary(input)
		print("data")
		print(data)
		member = MemberModel(**data)
		db_session.add(member)
		db_session.commit()
		return CreateMember(member=member)