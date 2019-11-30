from sqlalchemy import *
from sqlalchemy.orm import (scoped_session, sessionmaker, relationship,
                            backref)
from sqlalchemy.ext.declarative import declarative_base

connection_string = "postgres://postgres:brightspace@team-db.cezw9lbsfclc.us-west-2.rds.amazonaws.com:5432/postgres"

engine = create_engine(connection_string, convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))

Base = declarative_base()
# We will need this for querying
Base.query = db_session.query_property()

class User(Base):
    __tablename__ = 'users'
    iduser = Column( Integer, primary_key=True) #make sure no column names end with the letters "id"
    username = Column(String)
    userpassword = Column(String)
    usertype = Column(String)

class Course(Base):
	__tablename__ = 'courses'
	idprof = Column(Integer, ForeignKey('users.iduser'), primary_key=True)
	idcourse = Column(String, primary_key=True)
	minstudents = Column(Integer)
	maxstudents = Column(Integer)
	deadline = Column(Integer)	
 
class Team(Base):
    __tablename__ = 'teams'
    idliason=Column(Integer)
    idteam=Column(Integer, primary_key=True)
    idprof = Column(Integer, primary_key=True)
    idcourse = Column(String, primary_key=True)
    teamname= Column(String)
    created_at = Column(Integer)
    members_count = Column(Integer)

class Team_Join_Request(Base):
	__tablename__ = "team_join_requests"
	idteam = Column(Integer, ForeignKey('teams.idteam'), primary_key=True)
	idprof = Column(Integer, ForeignKey('teams.idprof'), primary_key=True)
	idcourse = Column(String, ForeignKey('teams.idcourse'), primary_key=True)
	idstudent = Column(Integer, ForeignKey('users.iduser'), primary_key=True)