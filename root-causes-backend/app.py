from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
from sqlalchemy.orm import join
from sqlalchemy import Column, ForeignKey, Integer, Table
from sqlalchemy.orm import declarative_base, relationship
import json
import pdb

# start VPN!
# to start cd into backend and enter into command line 'flask run' OR 'python -m flask run'

# Backend Installations **cd into backend**:

# pip install pipenv
# - To activate: pipenv shell
# pipenv install flask flask-sqlalchemy psycopg2 python-dotenv flask-cors
        # If pyscopg2 is not installing -> pip install postgres first or xcode-select --install
# Flask run
# python (to activate python)
# from app import db
# db.create_all() (will create our event table for us)

# After initial installation **the usual**
# pipenv shell
# Flask run

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://rootcauses_user:ztx9xdh.yga7cnv2PHX@codeplus-postgres-test-01.oit.duke.edu/rootcauses'
# URI FORMAT: postgressql://user:password@host/database_name
db = SQLAlchemy(app)
CORS(app)

class Participant(db.Model):
    __tablename__ = 'participant'
    __table_args__ = {"schema": "RC"}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    phone = db.Column(db.Text, nullable=False)
    language = db.Column(db.Text, nullable=True)
    email = db.Column(db.String(320), nullable=False)
    pronouns = db.Column(db.Text, nullable=True)
    group = db.Column(db.String(1), nullable=False)

    children = relationship("Status")

    def __repr__(self):
        return f"Participant: {self.first_name} {self.last_name}"

    def __init__(self, first_name, last_name, date_of_birth, age, phone, language, email, pronouns, group):
        self.first_name = first_name
        self.last_name = last_name
        self.date_of_birth = date_of_birth
        self.age = age
        self.phone = phone
        self.language = language
        self.email = email
        self.pronouns = pronouns
        self.group = group

def format_participant(participant):
    status = Status.query.filter_by(participant_id=participant.id).one()
    address = Address.query.filter_by(participant_id=participant.id).one()
    formatted_address = format_address(address)
    return {
        "id": participant.id,
        "first_name": participant.first_name,
        "last_name": participant.last_name,
        "date_of_birth": participant.date_of_birth,
        "age": participant.age,
        "status": status.status_type_id,
        # "updated_at": participant.updated_at,
        "address": formatted_address,
        "email": participant.email,
        "phone": participant.phone,
        "language": participant.language,
        "pronoun": participant.pronouns,
        "group": participant.group
    }

class Status(db.Model):
    __tablename__ = 'participant_status'
    __table_args__ = {"schema": "RC"}

    participant_status_id = db.Column(db.Integer, primary_key=True)
    participant_id = db.Column(db.Integer, db.ForeignKey('RC.participant.id'), nullable=False)
    status_type_id = db.Column(db.Integer, nullable=False)
    volunteer_id = db.Column(db.Integer, nullable=True)
    status_date = db.Column(db.TIMESTAMP, nullable=False)
    source = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f"Participant: {self.participant_id}, Status: {self.status_type_id}"

    def __init__(self, participant_id, status_type_id, volunteer_id, status_date, source):
        self.participant_id = participant_id
        self.status_type_id = status_type_id
        self.volunteer_id = volunteer_id
        self.status_date = status_date
        self.source = source

class Address(db.Model):
    __tablename__ = 'participant_address'
    __table_args__ = {"schema": "RC"}

    participant_address_id = db.Column(db.Integer, primary_key=True)
    participant_id = db.Column(db.Integer, nullable=False)
    street = db.Column(db.Text, nullable=False)
    city = db.Column(db.Text, nullable=False)
    state = db.Column(db.Text, nullable=False)
    zip = db.Column(db.String(10), nullable=False)
    apartment = db.Column(db.Text, nullable=True)

    def __repr__(self):
        if self.apartment:
            return f"Address: {self.street}, Apartment {self.apartment}, {self.city}, {self.state} {self.zip}"
        
        return f"Address: {self.street}, {self.city}, {self.state} {self.zip}"

    def __init__(self, participant_address_id, participant_id, street, city, state, zip, apartment):
        self.participant_id = participant_id
        self.street = street
        self.city = city
        self.state = state
        self.zip = zip
        self.apartment = apartment

def format_address(address):
    if address.apartment:
        return f"{address.street}, Apartment {address.apartment}, {address.city}, {address.state} {address.zip}"
    
    return f"{address.street}, {address.city}, {address.state} {address.zip}"

class Volunteer(db.Model):
    __tablename__ = 'volunteer'
    __table_args__ = {"schema": "RC"}

    volunteer_id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    phone = db.Column(db.Text, nullable=False)
    affiliation = db.Column(db.Text, nullable=True)
    language = db.Column(db.Text, nullable=False)
    first_time = db.Column(db.Boolean, nullable=False)
    hipaa = db.Column(db.Boolean, nullable=False)
    credit = db.Column(db.Boolean, nullable=False)
    email = db.Column(db.String(320), nullable=False)

    children = relationship("DriverLog")
    children = relationship("DeliveryAssignment")

    def __repr__(self):
        return f"Volunteer: {self.first_name} {self.last_name}"

    def __init__(self, first_name, last_name, phone, affiliation, language, first_time, hipaa, credit, email):
        self.first_name = first_name
        self.last_name = last_name
        self.phone = phone
        self.affiliation = affiliation
        self.language = language
        self.first_time = first_time
        self.hipaa = hipaa
        self.email = credit
        self.email = email

def format_volunteer(volunteer):
    return {
        "id": volunteer.volunteer_id,
        "first_name": volunteer.first_name,
        "last_name": volunteer.last_name,
        "affiliation": volunteer.affiliation,
        "language": volunteer.language,
        "first_time": volunteer.first_time,
        "hipaa": volunteer.hipaa,
        "credit": volunteer.credit,
        "email": volunteer.email,
        "phone": volunteer.phone
    }

class DriverLog(db.Model):
    __tablename__ = 'driver_log_preferences'
    __table_args__ = {"schema": "RC"}

    driver_log_preferences_id = db.Column(db.Integer, primary_key=True)
    volunteer_id = db.Column(db.Integer, db.ForeignKey('RC.volunteer.volunteer_id'), nullable=False)
    date_available = db.Column(db.Date, nullable=False)
    time_available = db.Column(db.TIMESTAMP, nullable=False)
    deliver_more_preference = db.Column(db.Boolean, nullable=False)
    live_outside_durham = db.Column(db.Boolean, nullable=False)
    route_preference = db.Column(db.Text, nullable=False)
    comments = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f"Driver ID: {self.volunteer_id}, Date Available: {self.date_available}"

    def __init__(self, volunteer_id, date_available, time_available, deliver_more_preference, live_outside_durham, route_preference, comments):
        self.volunteer_id = volunteer_id
        self.date_available = date_available
        self.time_available = time_available
        self.deliver_more_preference = deliver_more_preference
        self.live_outside_durham = live_outside_durham
        self.route_preference = route_preference
        self.comments = comments

def format_driver(driver):
    # json_str = json.dumps({driver.time_available,}, default=str)
    return {
        "driver_log_preferences_id": driver.driver_log_preferences_id,
        "volunteer_id": driver.volunteer_id,
        "date_available": driver.date_available,
        "time_available": json.dumps({driver.time_available,}, default=str),
        "deliver_more_preference": driver.deliver_more_preference,
        "live_outside_durham": driver.live_outside_durham,
        "route_preference": driver.route_preference,
        "comments": driver.comments
    }

class DeliveryAssignment(db.Model):
    __tablename__ = 'delivery_assignment'
    __table_args__ = {"schema": "RC"}

    delivery_list_id = db.Column(db.Integer, primary_key=True)
    participant_id = db.Column(db.Integer, nullable=False)
    volunteer_id = db.Column(db.Integer, db.ForeignKey('RC.volunteer.volunteer_id'), nullable=False)
    assignment_date = db.Column(db.Text, nullable=False)        #should be date?

    def __repr__(self):
        return f"Driver ID #{self.volunteer_id} delivering to Participant ID#{self.participant_id} on Date {self.assignment_date}"

    def __init__(self, delivery_list_id, participant_id, volunteer_id, assignment_date):
        self.participant_id = participant_id
        self.volunteer_id = volunteer_id
        self.assignment_date = assignment_date

def format_delivery(delivery):
    return {
        "delivery_list_id": delivery.delivery_list_id,
        "participant_id": delivery.participant_id,
        "volunteer_id": delivery.volunteer_id,
        "assignment_date": delivery.assignment_date,
    }

@app.route('/')
def hello():
    return 'Backend connected to host'

############# PARTCIPANTS ##############
# CREATE PARTICIPANT
@app.route('/participants', methods = ['POST'])
def create_participant():
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    email = request.json['email']
    phone = request.json['phone_number']
    language = request.json['language']
    group = request.json['group']
    pronouns = request.json['pronouns']
    participant = Participant(first_name, last_name,email,phone,language, group, pronouns)
    db.session.add(participant)
    db.session.commit()
    return format_participant(participant)

# GET ALL PARTICIPANTS
@app.route('/participants', methods = ['GET'])
def get_participants():
    participants = Participant.query.order_by(Participant.id.asc()).all()
    participant_list = []
    for participant in participants:
        participant_list.append(format_participant(participant))
    return {'participants': participant_list}

# GET PARTICIPANT BY ID
@app.route('/participants/<id>', methods = ['GET'])
def get_participant(id):
    participant = Participant.query.filter_by(id=id).one()
    formatted_participant = format_participant(participant)
    return {'participant': formatted_participant}

# GET PARTICIPANTS BY STATUS
@app.route('/participants/status/<status>', methods = ['GET'])
def get_participants_by_status(status):
    participants = db.session.query(Participant).join(Status, Participant.id == Status.participant_id, isouter=True).filter(Status.status_type_id==status).all()
    participant_list = []
    for participant in participants:
        participant_list.append(format_participant(participant))
    
    return {'participants': participant_list}

# GET PARTICIPANTS BY LANGUAGE
@app.route('/participants/language/<language>', methods = ['GET'])
def get_participants_by_language(language):
    participants = Participant.query.filter_by(language=language).all()
    participant_list = []
    for participant in participants:
        participant_list.append(format_participant(participant))
    
    return {'participants': participant_list}

# GET PARTICIPANTS BY GROUP
@app.route('/participants/group/<group>', methods = ['GET'])
def get_participants_by_group(group):
    participants = Participant.query.filter_by(group=group).all()
    participant_list = []
    for participant in participants:
        participant_list.append(format_participant(participant))
    
    return {'participants': participant_list}

# GET PARTICIPANTS BY GROUP AND STATUS
@app.route('/participants/group/<group>/status/<status>', methods = ['GET'])
def get_participants_by_group_and_status(group, status):
    participants = db.session.query(Participant).join(Status, Participant.id == Status.participant_id, isouter=True).filter(Status.status_type_id==status).filter(Participant.group==group).all()
    participant_list = []
    for participant in participants:
        participant_list.append(format_participant(participant))
    
    return {'participants': participant_list}

# GET PARTICIPANTS BY GROUP AND LANGUAGE
@app.route('/participants/group/<group>/language/<language>', methods = ['GET'])
def get_participants_by_group_and_language(group, language):
    participants = Participant.query.filter_by(group=group).filter_by(language=language).all()
    participant_list = []
    for participant in participants:
        participant_list.append(format_participant(participant))
    
    return {'participants': participant_list}

# DELETE PARTICIPANT
@app.route('/participants/<id>', methods = ['DELETE'])
def delete_participant(id):
    participant = Participant.query.filter_by(id=id).one()
    db.session.delete(participant)
    db.session.commit()
    return f'Participant (id: {id}) deleted.'

# UPDATE PARTICIPANT
@app.route('/participants/<id>', methods = ['PUT'])
def update_participant(id):
    participant = Participant.query.filter_by(id=id)
    statusObj = Status.query.filter_by(participant_id=id)

    first_name = request.json['participant']['first_name']
    last_name = request.json['participant']['last_name']
    # address = request.json['participant']['address']
    email = request.json['participant']['email']
    phone = request.json['participant']['phone']
    language = request.json['participant']['language']
    status = request.json['participant']['status']
    group = request.json['participant']['group']
    participant.update(dict(first_name=first_name))
    participant.update(dict(last_name=last_name))
    # participant.update(dict(address=address))
    participant.update(dict(email=email))
    participant.update(dict(phone=phone))
    participant.update(dict(language=language))
    # participant.update(dict(status=status))
    participant.update(dict(group=group))

    statusObj.update(dict(status_type_id=status))

    db.session.commit()
    return {'participant': format_participant(participant.one())}

######### VOLUNTEERS ##########

# CREATE VOLUNTEER
@app.route('/volunteers', methods = ['POST'])
def create_volunteer():
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    email = request.json['email']
    phone = request.json['phone_number']
    language = request.json['language']
    affiliation = request.json['affiliation']
    first_time = request.json['first_time']
    hipaa = request.json['hipaa']
    credit = request.json['credit']
    volunteer = Volunteer(first_name, last_name, phone, affiliation, language, first_time, hipaa, credit, email)
    db.session.add(volunteer)
    db.session.commit()
    return format_participant(volunteer)

# GET ALL VOLUNTEERS
@app.route('/volunteers', methods = ['GET'])
def get_volunteers():
    volunteers = Volunteer.query.order_by(Volunteer.volunteer_id.asc()).all()
    volunteer_list = []
    for volunteer in volunteers:
        volunteer_list.append(format_volunteer(volunteer))
    return {'volunteers': volunteer_list}

# GET VOLUNTEER
@app.route('/volunteers/<id>', methods = ['GET'])
def get_volunteer(id):
    volunteer = Participant.query.filter_by(volunteer_id=id).one()
    formatted_volunteer = format_volunteer(volunteer)
    return {'volunteers': formatted_volunteer}

# DELETE VOLUNTEER
@app.route('/volunteers/<id>', methods = ['DELETE'])
def delete_volunteer(id):
    volunteer = Volunteer.query.filter_by(volunteer_id=id).one()
    db.session.delete(volunteer)
    db.session.commit()
    return f'Participant (id: {id}) deleted.'

# UPDATE VOLUNTEER
@app.route('/volunteers/<id>', methods = ['PUT'])
def update_volunteer(id):
    volunteer = Volunteer.query.filter_by(volunteer_id=id)
    #first_name, last_name, phone, affiliation, language, first_time, hipaa, credit, email
    first_name = request.json['particpant']['first_name']
    last_name = request.json['particpant']['last_name']
    email = request.json['particpant']['email']
    phone = request.json['particpant']['phone_number']
    language = request.json['particpant']['language']
    affiliation = request.json['particpant']['affiliation']
    first_time = request.json['particpant']['first_time']
    hipaa = request.json['particpant']['hipaa']
    credit = request.json['particpant']['credit']
    volunteer.update(dict(first_name=first_name))
    volunteer.update(dict(last_name=last_name))
    volunteer.update(dict(email=email))
    volunteer.update(dict(phone=phone))
    volunteer.update(dict(language=language))
    volunteer.update(dict(affiliation=affiliation))
    volunteer.update(dict(first_time=first_time))
    volunteer.update(dict(hipaa=hipaa))
    volunteer.update(dict(credit=credit))
    db.session.commit()
    return {'volunteer': format_volunteer(volunteer.one())}

# GET ALL DRIVERS
@app.route('/volunteers/drivers', methods = ['GET'])
def get_drivers():
    volunteers = db.session.query(Volunteer).join(DriverLog, Volunteer.volunteer_id == DriverLog.volunteer_id, isouter = False, full = False).all()
    volunteer_list = []
    for volunteer in volunteers:
        volunteer_list.append(format_volunteer(volunteer))
    
    return {'volunteers': volunteer_list}

# GET AVAILABLE DRIVERS BY DATE
@app.route('/volunteers/drivers/<date>', methods = ['GET'])
def get_drivers_by_date(date):
    volunteers = db.session.query(Volunteer).join(DriverLog, Volunteer.volunteer_id == DriverLog.volunteer_id, isouter=True).filter(DriverLog.date_available==date).all()
    volunteer_list = []
    for volunteer in volunteers:
        volunteer_list.append(format_volunteer(volunteer))
    
    return {'volunteers': volunteer_list}

# GET ALL DELIVERIES
@app.route('/deliveries', methods = ['GET'])
def get_deliveries():
    deliveries = DeliveryAssignment.query.order_by(DeliveryAssignment.assignment_date.asc()).all()
    delivery_list = []
    for delivery in deliveries:
        delivery_list.append(format_delivery(delivery))
    return {'deliveries': delivery_list}

if __name__ == '__main__':
    app.run()