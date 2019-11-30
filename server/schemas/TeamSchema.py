# flask_sqlalchemy/schema.py
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import db_session, User as UserModel
from models import db_session, Course as CourseModel
from models import db_session, Team as TeamModel
import utils
from datetime import datetime

class TeamAttribute:
    liason_id=graphene.Int(description="Team Lead ID")
    members_count= graphene.Int(description="Current number of members")
    teamname= graphene.String(description = "Team name")
    idteam = graphene.Int(description="Team ID")
    idcourse= graphene.String(description = "Team Course ID")
    idprof = graphene.Int(description = "Team instructor ID")
    created_at = graphene.types.datetime.Date(description = "Team creation Time")
    


class Team(SQLAlchemyObjectType, TeamAttribute):
    class Meta:
        model = TeamModel
        interfaces = (relay.Node, )

class TeamConnection(relay.Connection):
    class Meta:
        node = Team

class CreateTeamInput(graphene.InputObjectType, TeamAttribute):
    """Arguments to create a Team."""
    pass

class CreateTeam(graphene.Mutation):
    """Mutation to create a Team."""
    team = graphene.Field(lambda: Team, description="Team created by this mutation.")

    class Arguments:
        input = CreateTeamInput(required=True)

    def mutate(self, info, input):
        data = utils.input_to_dictionary(input)
        # data['created'] = datetime.utcnow()
        # data['edited'] = datetime.utcnow()

        team = TeamModel(**data)
        db_session.add(team)
        db_session.commit()
        return CreateTeam(team=team)