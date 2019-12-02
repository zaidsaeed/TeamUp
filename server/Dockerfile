FROM kennethreitz/pipenv

# MAINTANER zsaee060 "saeedzaid003@gmail.com"

# RUN apt-get update -y && \
#     apt-get install -y python-pip python-dev

# We copy just the requirements.txt first to leverage Docker cache
COPY ./Pipfile /app/Pipfile

WORKDIR /app

RUN pipenv install --ignore-pipfile

COPY . /app

# RUN pipenv shell

# ENTRYPOINT [ ]

# ports: 
#     - "5000:5000"

EXPOSE 4444:4444

CMD [  "pipenv", "run", "python", "app.py" ]