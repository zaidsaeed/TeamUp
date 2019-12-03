# flask_sqlalchemy/schema.py
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from models import Email as EmailModel
import utils
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

me = "SEG3102notifications@gmail.com"
my_password = r"brightspace"

msg = MIMEMultipart('alternative')
msg['Subject'] = "Alert"
msg['From'] = me


class EmailAttribute:
    email = graphene.String(description="email address")
    idteam = graphene.Int(description="team id")
    idcourse = graphene.String(description="course id")


class Email(SQLAlchemyObjectType, EmailAttribute):
    class Meta:
        model = EmailModel
        interfaces = (relay.Node, )

class EmailConnection(relay.Connection):
    class Meta:
        node = Email

class CreateEmailInput(graphene.InputObjectType, EmailAttribute):
    pass

class CreateEmail(graphene.Mutation):
    user = graphene.Field(lambda: Email, description="Person created by this mutation.")

    class Arguments:
        input = CreateEmailInput(required=True)

    def mutate(self, info, input):
        print("input")
   
        # Send the message via gmail's regular server, over SSL - passwords are being sent, afterall
        s = smtplib.SMTP_SSL('smtp.gmail.com')
        # uncomment if interested in the actual smtp conversation
        # s.set_debuglevel(1)
        # do the smtp auth; sends ehlo if it hasn't been sent already
        data = utils.input_to_dictionary(input)
        s.login(me, my_password)
        you =  data["email"]
        msg['To'] = you
        html = '<html><body><p>You have been accepted into team ' + str(data["idteam"]) + ' for course ' + data["idcourse"] + '</p></body></html>'
        part2 = MIMEText(html, 'html')

        msg.attach(part2)


        s.sendmail(me, you, msg.as_string())
        s.quit()
        user = EmailModel(**data)


        return CreateEmail(None)