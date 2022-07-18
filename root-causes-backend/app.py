from flask import Flask, request, jsonify, redirect, url_for, make_response
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
from sqlalchemy.orm import join
from sqlalchemy import Column, ForeignKey, Integer, Table, null
from sqlalchemy.orm import declarative_base, relationship
import json
import pdb
from flask_marshmallow import Marshmallow
from datetime import datetime, timezone
import datetime as dt
import psycopg2
from sqlalchemy.dialects.postgresql import ARRAY
import os
from twilio.rest import Client
from twilio.twiml.messaging_response import MessagingResponse

# import needed for file upload
from werkzeug.utils import secure_filename


# start VPN!
# to start cd into backend and enter into command line 'flask run' OR 'python -m flask run'

# Backend Installations **cd into backend**:

# pip install pipenv
# - To activate: pipenv shell
# pipenv install flask flask-sqlalchemy psycopg2 python-dotenv flask-cors flask-marshmallow
        # If pyscopg2 is not installing -> pip install postgres first or xcode-select --install
# Flask run
# python (to activate python)
# from app import db
# db.create_all() (will create our event table for us)

# After initial installation **the usual**
# pipenv shell
# Flask run

# To get Twilio working (open your computer terminal)
# pipenv install twilio (OR pip install twilio)
# FOR MAC: run ' brew tap twilio/brew && brew install twilio '
# * FOR WINDOWS: INSTALL SCOOP --> https://scoop.sh 
# FOR WINDOWS: run ' scoop bucket add twilio-scoop https://github.com/twilio/scoop-twilio-cli '
# FOR WINDOWS (part 2): run ' scoop install twilio '

UPLOAD_FOLDER = '../root-causes-volunteer/react-volunteer-app/src/images-react'
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://rootcauses_user:ztx9xdh.yga7cnv2PHX@codeplus-postgres-test-01.oit.duke.edu/rootcauses'
# URI FORMAT: postgressql://user:password@host/database_name
db = SQLAlchemy(app)
CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

#SMS INFO
account_sid = "ACa19caaefab10dead0bf946d4e3190175"
auth_token = "99238e6ddab706ec700abe98ed63cac3"
client = Client(account_sid, auth_token)

class Participant(db.Model):
    __tablename__ = 'participant3'
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
    household_size = db.Column(db.Integer, nullable=True)
    most_recent_delivery = db.Column(db.String(100), nullable=True)
    most_recent_call = db.Column(db.String(100), nullable=True)
    sms_response = db.Column(db.Text, nullable=True)
    street = db.Column(db.Text, nullable=True)
    city = db.Column(db.Text, nullable=True)
    state = db.Column(db.Text, nullable=True)
    zip = db.Column(db.String(10), nullable=True)
    apartment = db.Column(db.Text, nullable=True)
    most_recent_status = db.Column(db.Integer, nullable=False, default=0)
    most_recent_status_update = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))
    image = db.Column(db.String(200), nullable=True)

    children = relationship("Status")
    children = relationship("DeliveryHistory")


    def __repr__(self):
        return f"Participant: {self.first_name} {self.last_name}"

    def __init__(self, first_name, last_name, date_of_birth, age, phone, language, email, pronouns, group, household_size, most_recent_delivery, most_recent_call, sms_response, street, city, state, zip, apartment, most_recent_status, image):
        self.first_name = first_name
        self.last_name = last_name
        self.date_of_birth = date_of_birth
        self.age = age
        self.phone = phone
        self.language = language
        self.email = email
        self.pronouns = pronouns
        self.group = group
        self.household_size = household_size
        self.most_recent_delivery = most_recent_delivery
        self.most_recent_call = most_recent_call
        self.sms_response = sms_response
        self.street = street
        self.city = city
        self.state = state
        self.zip = zip
        self.apartment = apartment
        self.most_recent_status = most_recent_status
        self.image = image

def format_participant(participant):
    # status = Status.query.filter_by(participant_id=participant.id).one()
    # address = Address.query.filter_by(participant_id=participant.id).one()
    formatted_address = format_address(participant)
    return {
        "id": participant.id,
        "first_name": participant.first_name,
        "last_name": participant.last_name,
        "date_of_birth": participant.date_of_birth,
        "age": participant.age,
        "status": participant.most_recent_status,
        "most_recent_status_update": participant.most_recent_status_update,
        # "status": status.status_type_id,
        # "updated_at": participant.updated_at,
        "address": formatted_address,
        "email": participant.email,
        "phone": participant.phone,
        "language": participant.language,
        "pronouns": participant.pronouns,
        "group": participant.group,
        "household_size": participant.household_size,
        "street": participant.street,
        "city": participant.city,
        "state": participant.state,
        "zip": participant.zip,
        "apartment": participant.apartment,
        "most_recent_delivery": participant.most_recent_delivery,
        "most_recent_call": participant.most_recent_call,
        "sms_response": participant.sms_response, 
        "image": participant.image 
    }

class Status(db.Model):
    __tablename__ = 'participant_status'
    __table_args__ = {"schema": "RC"}

    participant_status_id = db.Column(db.Integer, primary_key=True)
    participant_id = db.Column(db.Integer, db.ForeignKey('RC.participant3.id'), nullable=False)
    status_type_id = db.Column(db.Integer, nullable=False)
    volunteer_id = db.Column(db.Integer, nullable=True)
    status_date = db.Column(db.DateTime, nullable=False, default=datetime.now(timezone.utc))
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

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    email = db.Column(db.String(320), nullable=False)
    password = db.Column(db.String(100), nullable=True)
    phone = db.Column(db.Text, nullable=False)
    affiliation = db.Column(db.Text, nullable=True)
    language = db.Column(db.Text, nullable=False)
    first_time = db.Column(db.Boolean, nullable=False)
    credit = db.Column(db.Boolean, nullable=False)
    hipaa = db.Column(db.Boolean, nullable=False)

    children = relationship("DriverLog")
    children = relationship("DeliveryAssignment")
    children = relationship("VolunteerLog")
    children = relationship("DeliveryHistory")



    def __repr__(self):
        return f"Volunteer: {self.first_name} {self.last_name}"

    def __init__(self, first_name, last_name, email, password, phone, affiliation, language, first_time, credit, hipaa):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.phone = phone
        self.affiliation = affiliation
        self.language = language
        self.first_time = first_time
        self.credit = credit
        self.hipaa = hipaa
        

def format_volunteer(volunteer):
    return {
        "id": volunteer.id,
        "first_name": volunteer.first_name,
        "last_name": volunteer.last_name,
        "affiliation": volunteer.affiliation,
        "language": volunteer.language,
        "first_time": volunteer.first_time,
        "hipaa": volunteer.hipaa,
        "credit": volunteer.credit,
        "email": volunteer.email,
        "phone": volunteer.phone,
        "password": volunteer.password
    }

class DriverLog(db.Model):
    __tablename__ = 'driver_log_preferences'
    __table_args__ = {"schema": "RC"}

    driver_log_preferences_id = db.Column(db.Integer, primary_key=True)
    volunteer_id = db.Column(db.Integer, db.ForeignKey('RC.volunteer.id'), nullable=True)
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
    volunteer_id = db.Column(db.Integer, db.ForeignKey('RC.volunteer.id'), nullable=False)
    assignment_date = db.Column(db.Text, nullable=False)        #should be date?

    def __repr__(self):
        return f"Driver ID #{self.volunteer_id} delivering to Participant ID#{self.participant_id} on Date {self.assignment_date}"

    def __init__(self, participant_id, volunteer_id, assignment_date):
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

class CallAssignment(db.Model):
    __tablename__ = 'call_assignment'
    __table_args__ = {"schema":"RC"}

    call_assignment_id = db.Column(db.Integer, primary_key=True)
    volunteer_id = db.Column(db.Integer, nullable=False)
    assigment_date = db.Column(db.DateTime, nullable=False)
    participant_list = db.Column(db.ARRAY(Integer), nullable=False)

    def __repr__(self):
        return f"Caller ID #{self.volunteer_id} calling Participant ID#{self.participant_id} on Date {self.assignment_date}"

    def __init__(self, volunteer_id, assignment_date, participant_list):
        self.volunteer_id = volunteer_id
        self.assignment_date = assignment_date
        self.participant_list = participant_list

def format_calls(calls):
    return {
        "call_assignment_id": calls.call_assignment_id,
        "volunteer_id": calls.volunteer_id,
        "assignment_date": calls.assignment_date,
        "participant_list": calls.participant_list
    }

class VolunteerLog(db.Model):
    __tablename__ = 'volunteer_log'
    __table_args__ = {"schema":"RC"}

    volunteer_log_id = db.Column(db.Integer, primary_key=True)
    volunteer_id = db.Column(db.Integer, db.ForeignKey('RC.volunteer.id'), nullable=True)
    volunteer_type = db.Column(db.Text, nullable=True)
    week_available = db.Column(db.Date, nullable=False)
    notes = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f"Volunteer #{self.volunteer_id} as {self.volunteer_type} on Date {self.week_available}"

    def __init__(self, volunteer_id, volunteer_type, week_available, notes):
        self.volunteer_id = volunteer_id
        self.volunteer_type = volunteer_type
        self.week_available = week_available
        self.notes = notes

def format_volunteer_log(volunteer_log):
    return {
        "volunteer_log_id": volunteer_log.call_assignment_id,
        "volunteer_id": volunteer_log.volunteer_id,
        "volunteer_type": volunteer_log.volunteer_type,
        "week_available": volunteer_log.week_available,
        "notes": volunteer_log.notes
    }

class DeliveryHistory(db.Model):
    __tablename__ = 'delivery_history'
    __table_args__ = {"schema":"RC"}

    id = db.Column("delivery_history_id", db.Integer, primary_key=True)
    participant_id = db.Column(db.Integer, db.ForeignKey('RC.participant3.id'), nullable=False)
    volunteer_id = db.Column(db.Integer, db.ForeignKey('RC.volunteer.id'), nullable=False)
    delivery_date = db.Column(db.Date, nullable=True, default=datetime.utcnow)
    notes = db.Column(db.Text, nullable=True)
    most_recent_delivery = db.Column(db.String(100))

    def __repr__(self):
        return f"Volunteer #{self.volunteer_id} delivered to Participant #{self.participant_id} on Date {self.delivery_date}"

    def __init__(self, participant_id, volunteer_id, delivery_date, notes):
        self.participant_id = participant_id
        self.volunteer_id = volunteer_id
        self.delivery_date = delivery_date
        self.notes = notes

def format_delivery_history(delivery_history):
    return {
        "delivery_history_id": delivery_history.delivery_history_id,
        "participant_id": delivery_history.participant_id,
        "volunteer_id": delivery_history.volunteer_id,
        "delivery_date": delivery_history.delivery_date,
        "notes": delivery_history.notes
    }
    
@app.route('/')
def hello():
    return 'Backend connected to host'

############# PARTCIPANTS ##############
# CREATE PARTICIPANT
@app.route('/participants', methods = ['POST'])
def create_participant():
    # image upload code
    # if ('selectedImage' in request.files):
    #     id = request.form['id']
    #     image = request.files['selectedImage']
    #     routeImage = Participant.query.get(id)
    #     filename = secure_filename(image.filename)
    #     full_filename = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    #     image.save(full_filename)
    #     # routeImage.image = url_for('download_file', name=filename)
    #     routeImage.image = filename
    #     db.session.add(routeImage)
    #     db.session.commit()
    #     return redirect('http://127.0.0.1:3000/routes')
    
    # # otherwise, add new participant
    # else:
        first_name = request.json['first_name']
        last_name = request.json['last_name']
        date_of_birth = request.json['date_of_birth']
        age = request.json['age']
        email = request.json['email']
        phone = request.json['phone']
        language = request.json['language']
        group = request.json['group']
        pronouns = request.json['pronouns']
        household_size = request.json['household_size']
        most_recent_delivery = request.json['most_recent_delivery']
        most_recent_call = request.json['most_recent_call']
        sms_response = request.json['sms_response']
        image = request.json['image']
        street = request.json['street']
        city = request.json['city']
        state = request.json['state']
        zip = request.json['zip']
        apartment = request.json['apartment']
        most_recent_status = 0


        
        participant = Participant(first_name, last_name, date_of_birth, age, phone, language, email, pronouns, group, household_size, most_recent_delivery, most_recent_call, sms_response, street, city, state, zip, apartment, most_recent_status, image)
        # 'group', 'household_size', 'most_recent_delivery', 'most_recent_call', and 'sms_response'

        status_type_id = 0
        volunteer_id = null
        status_date = datetime.utcnow
        source = "init"
        # def __init__(self, participant_id, status_type_id, volunteer_id, status_date, source):

        db.session.add(participant)
        db.session.commit()
        return format_participant(participant)

# GET ALL PARTICIPANTS
@app.route('/participants', methods = ['GET'])
def get_participants():
    participants = Participant.query.order_by(Participant.last_name.asc()).all()
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
    # participants = db.session.query(Participant).join(Status, Participant.id == Status.participant_id, isouter=True).filter(Status.status_type_id==status).all()
    participants = db.session.query(Participant).filter_by(most_recent_status=status).all()
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
    participants = db.session.query(Participant).filter_by(most_recent_status=status).filter_by(group=group).all()
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

# GET PARTICIPANTS BY GROUP AND SMS RESPONSE
@app.route('/participants/group/<group>/sms_response/<sms_response>', methods = ['GET'])
def get_participants_by_group_and_sms_response(group, sms_response):
    participants = Participant.query.filter_by(group=group).filter_by(sms_response=sms_response).all()
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
    # statusObj = Status.query.filter_by(participant_id=id)
    # addressObj = Address.query.filter_by(participant_id=id)

    first_name = request.json['participant']['first_name']
    last_name = request.json['participant']['last_name']
    # address = request.json['participant']['address']
    email = request.json['participant']['email']
    phone = request.json['participant']['phone']
    language = request.json['participant']['language']
    status = request.json['participant']['status']
    group = request.json['participant']['group']
    street = request.json['participant']['street']
    city = request.json['participant']['city']
    state = request.json['participant']['state']
    zip = request.json['participant']['zip']
    apartment = request.json['participant']['apartment']


    participant.update(dict(first_name=first_name))
    participant.update(dict(last_name=last_name))
    # participant.update(dict(address=address))
    participant.update(dict(email=email))
    participant.update(dict(phone=phone))
    participant.update(dict(language=language))
    # participant.update(dict(status=status))
    participant.update(dict(group=group))

    participant.update(dict(most_recent_status=status))
    participant.update(dict(most_recent_status_update=datetime.now(timezone.utc)))
    participant.update(dict(street=street))
    participant.update(dict(city=city))
    participant.update(dict(state=state))
    participant.update(dict(zip=zip))
    participant.update(dict(apartment=apartment))



    # statusObj.update(dict(status_type_id=status))
    # statusObj.update(dict(status_date=datetime.now(timezone.utc)))

    # addressObj.update(dict(street=street))
    # addressObj.update(dict(city=city))
    # addressObj.update(dict(state=state))
    # addressObj.update(dict(zip=zip))
    # addressObj.update(dict(apartment=apartment))

    db.session.commit()
    return {'participant': format_participant(participant.one())}

# OUTGOING SMS TEXT
@app.route('/smstexts/<message>', methods=['POST'])
def outgoing_sms(message):
    # message = request.json['message']
    

    message1 = client.messages \
                .create(
                     body=message,
                     from_='+19897046694',
                     to='+17137398907'
                 )
    message2 = client.messages \
                .create(
                    body=message,
                    from_='+19897046694',
                    to='+15714713578'
                )
    return {"Message": message}

# INCOMING SMS TEXT
@app.route('/smstexts', methods=['GET', 'POST'])
def incoming_sms():
    # """Send a dynamic reply to an incoming text message"""
    # # Get the message the user sent our Twilio number
    body = request.values.get('Body', None)

    # Start our TwiML response
    resp = MessagingResponse()

    # Determine the right reply for this message
    if body == '1':
        resp.message("You have selected YES!")
    elif body == '2':
        resp.message("You have selected NO!")

    return str(resp)

if __name__ == "__main__":
    app.run(debug=True)

######### VOLUNTEERS ##########

# CREATE VOLUNTEER
@app.route('/volunteers', methods = ['POST'])
def create_volunteer():
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    email = request.form.get('email')
    password = request.form.get('password')
    phone = request.form.get('phone')
    affiliation = request.form.get('affiliation')
    language = request.form.get('language')
    first_time = request.form.get('first_time')
    if (first_time == "true"):
        first_time = True
    else:
        first_time = False
    credit = request.form.get('credit')
    if (credit == "true"):
        credit = True
    else:
        credit = False
    hipaa = request.form.get('hipaa')
    if (hipaa == "true"):
        hipaa = True
    else:
        hipaa = False
    volunteer = Volunteer(first_name=first_name, last_name=last_name, email=email, password=password, phone=phone, affiliation=affiliation, language=language, first_time=first_time, credit=credit, hipaa=hipaa)
    db.session.add(volunteer)
    db.session.commit()
    return redirect('http://127.0.0.1:3000/')
    
    # first_name = request.json['volunteer']['first_name']
    # last_name = request.json['volunteer']['last_name']
    # email = request.json['volunteer']['email']
    # phone = request.json['volunteer']['phone']
    # language = request.json['volunteer']['language']
    # affiliation = request.json['volunteer']['affiliation']
    # first_time = request.json['volunteer']['first_time']
    # hipaa = request.json['volunteer']['hipaa']
    # credit = request.json['volunteer']['credit']
    # password = request.json['volunteer']['password']
    # volunteer = Volunteer(first_name, last_name, phone, affiliation, language, first_time, hipaa, credit, email, password)
    # db.session.add(volunteer)
    # db.session.commit()
    # return format_participant(volunteer)

# GET ALL VOLUNTEERS
@app.route('/volunteers', methods = ['GET'])
def get_volunteers():
    volunteers = Volunteer.query.order_by(Volunteer.id.asc()).all()
    volunteer_list = []
    for volunteer in volunteers:
        volunteer_list.append(format_volunteer(volunteer))
    return {'volunteers': volunteer_list}

# GET VOLUNTEER
@app.route('/volunteers/<id>', methods = ['GET'])
def get_volunteer(id):
    volunteer = Volunteer.query.filter_by(id=id).one()
    formatted_volunteer = format_volunteer(volunteer)
    return {'volunteers': formatted_volunteer}

# GET VOLUNTEERS BY LANGUAGE
@app.route('/volunteers/language/<language>', methods = ['GET'])
def get_volunteers_by_language(language):
    volunteers = Volunteer.query.filter_by(language=language).all()
    volunteer_list = []
    for volunteer in volunteers:
        volunteer_list.append(format_volunteer(volunteer))
    
    return {'volunteers': volunteer_list}

# DELETE VOLUNTEER
@app.route('/volunteers/<id>', methods = ['DELETE'])
def delete_volunteer(id):
    volunteer = Volunteer.query.filter_by(id=id).one()
    db.session.delete(volunteer)
    db.session.commit()
    return f'Participant (id: {id}) deleted.'

# UPDATE VOLUNTEER
@app.route('/volunteers/<id>', methods = ['PUT'])
def update_volunteer(id):
    volunteer = Volunteer.query.filter_by(id=id)
    #first_name, last_name, phone, affiliation, language, first_time, hipaa, credit, email
    first_name = request.json['volunteer']['first_name']
    last_name = request.json['volunteer']['last_name']
    email = request.json['volunteer']['email']
    phone = request.json['volunteer']['phone']
    language = request.json['volunteer']['language']
    affiliation = request.json['volunteer']['affiliation']
    first_time = request.json['volunteer']['first_time']
    hipaa = request.json['volunteer']['hipaa']
    credit = request.json['volunteer']['credit']
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

# GET VOLUNTEERS BY TYPE
@app.route('/volunteers/type/<type>', methods = ['GET'])
def get_volunteers_by_type(type):
    volunteers = db.session.query(Volunteer).join(VolunteerLog, Volunteer.id == VolunteerLog.volunteer_id).filter(VolunteerLog.volunteer_type==type).all()
    volunteer_list = []
    for volunteer in volunteers:
        volunteer_list.append(format_volunteer(volunteer))
    
    return {'volunteers': volunteer_list}

# GET ALL DRIVERS
# @app.route('/volunteers/drivers', methods = ['GET'])
# def get_drivers():
#     volunteers = db.session.query(Volunteer).join(DriverLog, Volunteer.id == DriverLog.volunteer_id, isouter = False, full = False).all()
#     volunteer_list = []
#     for volunteer in volunteers:
#         volunteer_list.append(format_volunteer(volunteer))
    
#     return {'volunteers': volunteer_list}

# GET AVAILABLE DRIVERS BY DATE
@app.route('/volunteers/drivers/<date>', methods = ['GET'])
def get_drivers_by_date(date):
    volunteers = db.session.query(Volunteer).join(DriverLog, Volunteer.id == DriverLog.volunteer_id, isouter=True).filter(DriverLog.date_available==date).all()
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


########VOLUNTEER APP##########
# def format_participant_routes(participant):
#     status = Status.query.filter_by(participant_id=participant.id).one()
#     address = Address.query.filter_by(participant_id=participant.id).one()
#     if (DeliveryHistory.query.filter_by(participant_id=participant.id).first() == None):
#         notes = "No notes."
#     else:
#         notes = DeliveryHistory.query.filter_by(participant_id=participant.id).first().notes
#     formatted_address = format_address(address)
#     return {
#         "id": participant.id,
#         "first_name": participant.first_name,
#         "last_name": participant.last_name,
#         "date_of_birth": participant.date_of_birth,
#         "age": participant.age,
#         "status": status.status_type_id,
#         # "updated_at": participant.updated_at,
#         "address": formatted_address,
#         "email": participant.email,
#         "phone": participant.phone,
#         "language": participant.language,
#         "pronouns": participant.pronouns,
#         "group": participant.group,
#         "household_size": participant.household_size,
#         "street": address.street,
#         "city": address.city,
#         "state": address.state,
#         "zip": address.zip,
#         "apartment": address.apartment,
#         "most_recent_delivery": participant.most_recent_delivery,
#         "most_recent_call": participant.most_recent_call,
#         "sms_response": participant.sms_response, 
#         "image": participant.image,
#         "notes" : notes
#     }

# # GET PARTICIPANTS BY STATUS - ROUTES PAGE
# @app.route('/routesparticipants/status/<status>', methods = ['GET'])
# def get_participants_by_status_routes(status):
#     participants = db.session.query(Participant).join(Status, Participant.id == Status.participant_id, isouter=True).filter(Status.status_type_id==status).all()
#     participant_list = []
#     for participant in participants:
#         participant_list.append(format_participant_routes(participant))
#     return {'participants': participant_list}


# REGISTER PAGE –– CREATE NEW VOLUNTEER, adds new row to volunteer table  
class VolObj():  
    def __init__(self,id,participant_list): 
        self.particpant_list=participant_list
        self.id =id 

# CALLER MANAGEMENT ALGORITHM
@app.route('/callermanagement', methods = ['GET'])
def get_call_assignments():
    type = "Caller"  
    
    def volObjects(array):  
        ret = []
        for i in range(len(array)): 
             volunteer = array[i]   
             volunteer_object=VolObj(volunteer.id,[]) 
             ret.append(volunteer_object) 
        return ret

    #make each volunteer into an volunteer object 
    #array of volunteers that speak english
    volunteers_english = db.session.query(Volunteer).join(VolunteerLog, Volunteer.id == VolunteerLog.volunteer_id).filter(VolunteerLog.volunteer_type==type).filter(Volunteer.language=="English").all()
    
    #array of volunteers that speak spanish
    volunteers_spanish = db.session.query(Volunteer).join(VolunteerLog, Volunteer.id == VolunteerLog.volunteer_id).filter(VolunteerLog.volunteer_type==type).filter(Volunteer.language=="Spanish").all()
    list_of_volObjects_english= volObjects(volunteers_english) 
    list_of_volObjects_spanish= volObjects(volunteers_spanish)
    
    # array of participants that speak english
    participants_english = db.session.query(Participant).join(Status, Participant.id == Status.participant_id, isouter=True).filter(Status.status_type_id==3).filter(Participant.language=="English").all()
    
    #array of participants that speak spanish
    participants_spanish = db.session.query(Participant).join(Status, Participant.id == Status.participant_id, isouter=True).filter(Status.status_type_id==3).filter(Volunteer.language=="Spanish").all()
    
    #step 0: get the participants into chunks  
    def generate_assignments(volunteers,participants):
        def chunkSize(participants,volunteers):   
            #prevent infinite chunking
            if len(volunteers)==0: 
                return 0
            return math.ceil(len(participants)/len(volunteers))
        share=chunkSize(participants,volunteers)
        participantChunks = [participants[i:i + share] for i in range(0,len(participants),share)]   
        while len(volunteers)>len(participantChunks):  
            participantChunks.append([])

        for i in range(len(volunteers)): 
            volunteer=volunteers[i] 
            volunteer.participant_list=participantChunks[i]   
        return volunteers
    volunteersE = generate_assignments(volunteers_english,participants_english)  
    volunteersS = generate_assignments(volunteers_spanish,participants_spanish) 
    allVolunteers =[] 
    allVolunteers.extend(volunteersE)
    allVolunteers.extend(volunteersS)  
    volunteer_list = []
    for volunteer in allVolunteers:
        volunteer_list.append(format_sortedVolunteers(volunteer))
    return {"sortedVolunteers": volunteer_list}
    #how to deal with participants in the backend, the first thing to do is to try to create a participants list

    # every volunteer should now have their participant chunks now e just need to do that for the spanish speakrs
    

#  def format_sortedVolunteers
def format_sortedVolunteers(volunteers):
    ids = "{"
    # for participant in volunteers.participant_list:
    for i in range(len(volunteers.participant_list)):
        ids+='"'
        ids+=str(i)
        ids+='"'
        ids+=": "
        ids+=str(volunteers.participant_list[i].id)
        if(i < len(volunteers.participant_list) -1 ):
            ids+=", "
    ids+="}"

    idArr = []
    for i in range(len(volunteers.participant_list)):
        idArr.append(volunteers.participant_list[i].id)
    return {
        "id": volunteers.id,
        "items": json.dumps(idArr) # {1, 2, 3, 4, 5}
    }

# GET UNSORTED VOLS & PTS FOR CALLER MANAGEMENT PAGE
@app.route('/callermanagement/unsorted', methods = ['GET'])
def get_unsoreted_call_assignments():
    type="Caller"
    volunteers = db.session.query(Volunteer).join(VolunteerLog, Volunteer.id == VolunteerLog.volunteer_id).filter(VolunteerLog.volunteer_type==type).order_by(Volunteer.language.asc()).all()
    participants = db.session.query(Participant).join(Status, Participant.id == Status.participant_id, isouter=True).filter(Status.status_type_id==3).order_by(Participant.language.asc()).all()

    ret = [{}]
    for volunteer in volunteers:
        ret.append({"vol": volunteer, "pts": []})
    ret.append({"vol": {}, "pts": participants})

    return { json.dumps(ret)}


@app.route('/profile', methods = ['GET', 'POST'])
def register_volunteer():
    email = request.form['email']
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    password = request.form['password']
    phone = request.form['phone']
    language = request.form['language']
    affiliation = request.form['affiliation']
    first_time = request.form['first_time']
    hipaa = request.form['hipaa']
    credit = request.form['credit']
        
    if email:
        existing_volunteer = Volunteer.query.filter(
            Volunteer.email == email
        ).first()
        if existing_volunteer:
            return make_response(
                f'{email} is already registered! Please login here instead: http://127.0.0.1:3000/'
            )
        new_volunteer = Volunteer(email=email, first_name=first_name, last_name=last_name, password=password, phone=phone, language=language, affiliation=affiliation, first_time=first_time, credit=credit, hipaa=hipaa)
        db.session.add(new_volunteer)
        db.session.commit()
    return redirect('http://127.0.0.1:3000/')


#LOGIN PAGE
# @app.route('/', methods = ['GET', 'POST'])
# def login():
#     email = request.form.get('email')
#     password = request.form.get('password')
#     existing_volunteer = Volunteer.query.filter_by(email=email).first()

#     if not existing_volunteer:
#         return make_response(
#                 f'{email} is not registered! Please register here instead: http://127.0.0.1:3000/profile'
#         )
#         return redirect('http://127.0.0.1:3000/profile')

#     if existing_volunteer and not (existing_volunteer.password==password):
#         return make_response(
#                 f'{email} password is incorrect.'
#         )
#         return redirect('http://127.0.0.1:3000/profile')
    
#     if existing_volunteer and (existing_volunteer.password==password):
#         return make_response(
#                 f'{email} successfully logged in!'
#             )

#STATUS AND MOST RECENT CALL - CALLS PAGE
@app.route('/status_from_calls', methods = ['POST'])
def get_calls():
        id = request.form['id']
        status = request.form['status']
        time = request.form['status_time']
        call = Status.query.get(id)
        recent_call = Participant.query.get(id)
        call.status_type_id = status
        recent_call.most_recent_call = time
        db.session.add(call)
        db.session.add(recent_call)
        db.session.commit()
        return redirect('http://127.0.0.1:3000/calls')

# def format_delivery_notes(delivery_note):
#     return {
#         "notes": delivery_note.notes
#     }
    
# # GET ROUTE NOTES BY ID
# @app.route('/routes/notes/<id>', methods = ['GET'])
# def get_route_notes(id):
#     notes = db.session.query(DeliveryHistory.notes).filter(DeliveryHistory.participant_id == id).all()
#     all_notes = []
#     for note in notes:
#         all_notes.append(format_delivery_notes(note))
#     return jsonify(all_notes)
    
    
# TIME OF MOST RECENT DELIVERY - ROUTES PAGE    
@app.route('/recent_delivery', methods = ['POST'])
def recent_delivery():
    # if request.method == 'GET':
    #     all_routes = Participant.query,all()
    #     results_routes = routes_schema.dump(all_routes)
    #     return jsonify(results_routes)    
    # else:
        id = request.form['id']
        time = request.form['status_time']
        participant = Participant.query.get(id)
        participant.most_recent_delivery = time
        db.session.add(participant)
        db.session.commit()
        return redirect('http://127.0.0.1:3000/routes')
    
# SIGN-UP PAGE
@app.route('/signup', methods = ['POST'])
def add_signup():
    if request.method == 'POST' and ('callerDay1' in request.form):
        volunteer_type = "Caller"
        callerDay1 = request.form.get('callerDay1')
        callerDay2 = request.form.get('callerDay2')
        callerDay3 = request.form.get('callerDay3')
        callerDay4 = request.form.get('callerDay4')
        callerDay = [callerDay1, callerDay2, callerDay3, callerDay4]
        for day in callerDay:
            if (day != None):
                day = dt.datetime.strptime(day, "%Y-%m-%d")
                day = day.date()
                person = VolunteerLog(volunteer_type=volunteer_type, week_available=day, volunteer_id=None, notes=None)
                db.session.add(person)
        db.session.commit()
        return redirect('http://127.0.0.1:3000/signup')
    elif request.method == 'POST' and ('packerDay1' in request.form):
        volunteer_type = "Packer"
        packerDay1 = request.form.get('packerDay1')
        packerDay2 = request.form.get('packerDay2')
        packerDay3 = request.form.get('packerDay3')
        packerDay4 = request.form.get('packerDay4')
        packerDay = [packerDay1, packerDay2, packerDay3, packerDay4]
        for day in packerDay:
            if (day != None):
                day = dt.datetime.strptime(day, "%Y-%m-%d")
                day = day.date()
                person = VolunteerLog(volunteer_type=volunteer_type, week_available=day, volunteer_id=None, notes=None)
                db.session.add(person)
        db.session.commit()
        return redirect('http://127.0.0.1:3000/signup')
    elif request.method == 'POST' and ('driver_preference' in request.form):
        volunteer_type = "Driver"
        # more deliveries?
        driverMoreDelivery = request.form.get('driverMoreDelivery')
        if (driverMoreDelivery == "moreDelivery"):
            driverMoreDelivery = True
        else:
            driverMoreDelivery = False
            
        # outside Durham?
        driverOutsideDurham = request.form.get('driverOutsideDurham')
        if (driverOutsideDurham == "outsideDurham"):
            driverOutsideDurham = True
        else:
            driverOutsideDurham = False
        
        driver_preference = request.form['driver_preference']
        
        driverTime = request.form.get('driver_time')
        driverTime = dt.datetime.strptime(driverTime, "%H:%M").time()
                
        driverDay1 = request.form.get('driverDay1')
        driverDay2 = request.form.get('driverDay2')
        driverDay3 = request.form.get('driverDay3')
        driverDay4 = request.form.get('driverDay4')
        driverDay = [driverDay1, driverDay2, driverDay3, driverDay4]
        for day in driverDay:
            if (day != None):
                day = dt.datetime.strptime(day, "%Y-%m-%d").date()
                # person for VolunteerLog
                person_vl = VolunteerLog(volunteer_type=volunteer_type, week_available=day, volunteer_id=None, notes=None)
                # person for DriverLog
                person_dlp = DriverLog(volunteer_id=None, date_available=day, time_available=driverTime, 
                                      deliver_more_preference=driverMoreDelivery,
                                      live_outside_durham=driverOutsideDurham, 
                                      route_preference=driver_preference, comments=None)
                
                db.session.add(person_vl)
                db.session.add(person_dlp)

        db.session.commit()
        return redirect('http://127.0.0.1:3000/signup')



# CALLER MANAGEMENT ALGORITHM
class VolObj():  
    def __init__(self,id,participant_list): 
        self.particpant_list=participant_list
        self.id =id 

@app.route('/callermanagement', methods = ['GET'])
def get_call_assignments():
    type = "Caller"  
    
    def volObjects(array):  
        ret = []
        for i in range(len(array)): 
             volunteer = array[i]   
             volunteer_object=VolObj(volunteer.id,[]) 
             ret.append(volunteer_object) 
        return ret

    #make each volunteer into an volunteer object 
    #array of volunteers that speak english
    volunteers_english = db.session.query(Volunteer).join(VolunteerLog, Volunteer.id == VolunteerLog.volunteer_id).filter(VolunteerLog.volunteer_type==type).filter(Volunteer.language=="English").all()
    
    #array of volunteers that speak spanish
    volunteers_spanish = db.session.query(Volunteer).join(VolunteerLog, Volunteer.id == VolunteerLog.volunteer_id).filter(VolunteerLog.volunteer_type==type).filter(Volunteer.language=="Spanish").all()
    list_of_volObjects_english= volObjects(volunteers_english) 
    list_of_volObjects_spanish= volObjects(volunteers_spanish)
    
    # array of participants that speak english
    participants_english = db.session.query(Participant).join(Status, Participant.id == Status.participant_id, isouter=True).filter(Status.status_type_id==3).filter(Participant.language=="English").all()
    
    #array of participants that speak spanish
    participants_spanish = db.session.query(Participant).join(Status, Participant.id == Status.participant_id, isouter=True).filter(Status.status_type_id==3).filter(Volunteer.language=="Spanish").all()
    
    #step 0: get the participants into chunks  
    def generate_assignments(volunteers,participants):
        def chunkSize(participants,volunteers):   
            #prevent infinite chunking
            if len(volunteers)==0: 
                return 0
            return math.ceil(len(participants)/len(volunteers))
        share=chunkSize(participants,volunteers)
        participantChunks = [participants[i:i + share] for i in range(0,len(participants),share)]   
        while len(volunteers)>len(participantChunks):  
            participantChunks.append([])

        for i in range(len(volunteers)): 
            volunteer=volunteers[i] 
            volunteer.participant_list=participantChunks[i]   
        return volunteers
    volunteersE = generate_assignments(volunteers_english,participants_english)  
    volunteersS = generate_assignments(volunteers_spanish,participants_spanish) 
    allVolunteers =[] 
    allVolunteers.extend(volunteersE)
    allVolunteers.extend(volunteersS)  
    volunteer_list = []
    for volunteer in allVolunteers:
        volunteer_list.append(format_sortedVolunteers(volunteer))
    return {"sortedVolunteers": volunteer_list}
    #how to deal with participants in the backend, the first thing to do is to try to create a participants list

    # every volunteer should now have their participant chunks now e just need to do that for the spanish speakrs
    


#  def format_sortedVolunteers
def format_sortedVolunteers(volunteers):
    ids = "{"
    # for participant in volunteers.participant_list:
    for i in range(len(volunteers.participant_list)):
        ids+='"'
        ids+=str(i)
        ids+='"'
        ids+=": "
        ids+=str(volunteers.participant_list[i].id)
        if(i < len(volunteers.participant_list) -1 ):
            ids+=", "
    ids+="}"

    idArr = []
    for i in range(len(volunteers.participant_list)):
        idArr.append(volunteers.participant_list[i].id)
    return {
        "id": volunteers.id,
        "items": json.dumps(idArr) # {1, 2, 3, 4, 5}
    }


# GET UNSORTED VOLS & PTS FOR CALLER MANAGEMENT PAGE
@app.route('/callermanagement/unsorted', methods = ['GET'])
def get_unsoreted_call_assignments():
    type="Caller"
    volunteers = db.session.query(Volunteer).join(VolunteerLog, Volunteer.id == VolunteerLog.volunteer_id).filter(VolunteerLog.volunteer_type==type).order_by(Volunteer.language.asc()).all()
    participants = db.session.query(Participant).join(Status, Participant.id == Status.participant_id, isouter=True).filter(Status.status_type_id==3).order_by(Participant.language.asc()).all()

    ret = [{}]
    for volunteer in volunteers:
        ret.append({"vol": volunteer, "pts": []})
    ret.append({"vol": {}, "pts": participants})

    return { json.dumps(ret)}



if __name__ == '__main__':
    app.run()