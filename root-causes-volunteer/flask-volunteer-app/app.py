from flask import Flask, jsonify, request, redirect, url_for, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_cors import CORS
from datetime import datetime
import psycopg2
from sqlalchemy.dialects.postgresql import ARRAY

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://rootcauses_user:ztx9xdh.yga7cnv2PHX@codeplus-postgres-test-01.oit.duke.edu:5432/rootcauses'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

from sqlalchemy.ext.mutable import Mutable

class MutableList(Mutable, list):
    def append(self, value):
        list.append(self, value)
        self.changed()

    @classmethod
    def coerce(cls, key, value):
        if not isinstance(value, MutableList):
            if isinstance(value, list):
                return MutableList(value)
            return Mutable.coerce(key, value)
        else:
            return value


class Calls(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String(100))
    lastname = db.Column(db.String(100))
    number = db.Column(db.String(100))
    language = db.Column(db.String(100))
    address = db.Column(db.String(100))
    status = db.Column(db.String(100))
    status_time = db.Column(db.String(100))
    delivery_status = db.Column(db.String(100))
    image = db.Column(db.Text)
    routes_notes = db.Column(MutableList.as_mutable(ARRAY(db.String)))
    call_notes = db.Column(MutableList.as_mutable(ARRAY(db.String)))



    def __init__(self, firstname, lastname, number, language, address, status, status_time, delivery_status, image, call_notes, routes_notes):
        self.firstname = firstname
        self.lastname = lastname
        self.number = number
        self.language = language
        self.address = address
        self.status = status
        self.status_time = status_time
        self.delivery_status = delivery_status
        self.image = image
        self.calls_notes = call_notes
        self.routes_notes = routes_notes

# CALLS
class CallsSchema(ma.Schema):
    class Meta:
        fields = ('id','firstname', 'lastname', 'number', 'language', 'status', 'status_time', 'call_notes', 'routes_notes')

calls_schema = CallsSchema()
calls_schema = CallsSchema(many = True)

@app.route('/calls', methods = ['GET', 'POST'])

def get_calls():
    if request.method == 'GET':
        all_calls = Calls.query.all()
        results = calls_schema.dump(all_calls)
        return jsonify(results)

    elif request.method == 'POST':
        id = request.form['id']
        status = request.form['status']
        time = request.form['status_time']
        call = Calls.query.get(id)
        call.status = status
        call.status_time = time
        db.session.add(call)
        db.session.commit()
        return redirect('http://127.0.0.1:3000/calls')
    
@app.route('/calls/notes', methods = ['POST'])
def get_call_notes():    
        id = request.form['id']
        notes = request.form['notes']
        call = Calls.query.get(id)
        if call.call_notes == None:
            default = []
            call.call_notes = default
        array = call.call_notes
        array.append(notes)
        db.session.add(call)
        db.session.commit()
        return redirect('http://127.0.0.1:3000/calls')

@app.route('/calls/deletenotes', methods = ['POST'])
def delete_call_notes():    
        id = request.form['id']
        # notes = request.form['notes']
        call = Calls.query.get(id)
        call.call_notes = []
        db.session.add(call)
        db.session.commit()
        return redirect('http://127.0.0.1:3000/calls')
    

# ROUTES
class RoutesSchema(ma.Schema):
    class Meta:
        fields = ('id','firstname', 'lastname', 'number', 'language', 'address', 'delivery_status', 'image', 'calls_notes', 'routes_notes')

routes_schema = RoutesSchema()
routes_schema = RoutesSchema(many = True)

@app.route('/routes', methods = ['GET', 'POST'])
def get_routes():
    if request.method == 'GET':
        all_routes = Calls.query.all()
        results_routes = routes_schema.dump(all_routes)
        return jsonify(results_routes)
    elif request.method == 'POST' and ('delivery_status' in request.form):
        id = request.form['id']
        delivery_status = request.form['delivery_status']
        route = Calls.query.get(id)
        route.delivery_status = delivery_status
        db.session.add(route)
        db.session.commit()
        return redirect('http://127.0.0.1:3000/routes')
    elif request.method == 'POST':
        id = request.form['id']
        image = request.files['selectedImage']
        binary = psycopg2.Binary(image.read())
        routeImage = Calls.query.get(id)
        routeImage.image = binary.toBytes()
        db.session.add(routeImage)
        db.session.commit()
        return redirect('http://127.0.0.1:3000/routes')
    
@app.route('/routes/notes', methods = ['POST'])
def get_routes_notes():    
        id = request.form['id']
        notes = request.form['routes_notes']
        call = Calls.query.get(id)
        if call.routes_notes == None:
            default = []
            call.routes_notes = default
        array = call.routes_notes
        array.append(notes)
        db.session.add(call)
        db.session.commit()
        return redirect('http://127.0.0.1:3000/routes')

@app.route('/routes/deletenotes', methods = ['POST'])
def delete_routes_notes():    
        id = request.form['id']
        call = Calls.query.get(id)
        call.routes_notes = []
        db.session.add(call)
        db.session.commit()
        return redirect('http://127.0.0.1:3000/routes')

# @app.route('/routes/image', methods = ['GET', 'POST'])
# def get_routes_image():
#     if request.method == 'POST':
#         file = request.files['myImage']
#         print(file)
#         return "done for image"
#     elif request.method == 'GET':
#         print("Hello")
#         return "done"
    
class users(db.Model):
    __tablename__ = 'user'
    __table_args__ = {"schema": "public"}
    id = db.Column('volunteer_id', db.Integer, primary_key = True)
    email = db.Column(db.String(100))
    first_name = db.Column(db.String(100))
    last_name = db.Column(db.String(100))
    password = db.Column(db.String(100))
    phone = db.Column(db.String(100))
    language = db.Column(db.String(100))
    affiliation = db.Column(db.String(100))
    first_time = db.Column(db.String(100))
    hipaa = db.Column(db.String(100))
    credit = db.Column(db.String(100))

def __init__(self, email, first_name, last_name, password, phone, language, affiliation, first_time, credit, hipaa):
   self.email = email
   self.first_name = first_name
   self.last_name = last_name
   self.password = password
   self.phone = phone
   self.language = language
   self.affiliation = affiliation
   self.first_time = first_time
   self.hipaa = hipaa
   self.credit = credit

#PROFILE
@app.route('/profile', methods = ['GET', 'POST'])
def add_profile():
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
        existing_user = users.query.filter(
            users.email == email
        ).first()
        if existing_user:
            return make_response(
                f'{email} is already registered! Please login here instead: http://127.0.0.1:3000/'
            )
        new_user = users(email=email, first_name=first_name, last_name=last_name, password=password, phone=phone, language=language, affiliation=affiliation, first_time=first_time, credit=credit, hipaa=hipaa)
        db.session.add(new_user)
        db.session.commit()
    return redirect('http://127.0.0.1:3000/')

#LOGIN
@app.route('/', methods = ['GET', 'POST'])
def login():
    email = request.form.get('email')
    password = request.form.get('password')
    user = users.query.filter_by(email=email).first()

    if not user:
        return make_response(
                f'{email} is not registered! Please register here instead: http://127.0.0.1:3000/profile'
        )
        return redirect('http://127.0.0.1:3000/profile')

    if user and not (user.password==password):
        return make_response(
                f'{email} password is incorrect.'
        )
        return redirect('http://127.0.0.1:3000/profile')
    
    if user and (user.password==password):
        return make_response(
                f'{email} successfully logged in!'
            )
        return redirect('http://127.0.0.1:3000/home')
        
class signups(db.Model):
    __tablename__ = 'signup'
    __table_args__ = {"schema": "public"}
    id = db.Column(db.Integer, primary_key = True)
    driverDay = db.Column(db.ARRAY(db.String(100)))
    other_preference = db.Column(db.ARRAY(db.String(100)))
    driver_preference = db.Column(db.String(100))
    driverTime = db.Column(db.ARRAY(db.String(100)))
    callerDay = db.Column(db.ARRAY(db.String(100)))
    packerDay = db.Column(db.ARRAY(db.String(100)))
    
def __init__(self, driverDay, other_preference, driver_preference, driverTime, callerDay, packerDay):
    self.driverDay = driverDay
    self.other_preference = other_preference
    self.driver_preference = driver_preference
    self.driverTime = driverTime
    self.callerDay = callerDay
    self.packerDay = packerDay

@app.route('/signup', methods = ['POST'])
def add_signup():
    if request.method == 'POST' and ('callerDay1' in request.form):
        callerDay1 = request.form.get('callerDay1')
        callerDay2 = request.form.get('callerDay2')
        callerDay3 = request.form.get('callerDay3')
        callerDay4 = request.form.get('callerDay4')
        callerDay = [callerDay1, callerDay2, callerDay3, callerDay4]
        signup = signups(callerDay=callerDay)
        db.session.add(signup)
        db.session.commit()
        return redirect('http://127.0.0.1:3000/signup')
    elif request.method == 'POST' and ('packerDay1' in request.form):
        packerDay1 = request.form.get('packerDay1')
        packerDay2 = request.form.get('packerDay2')
        packerDay3 = request.form.get('packerDay3')
        packerDay4 = request.form.get('packerDay4')
        packerDay = [packerDay1, packerDay2, packerDay3, packerDay4]
        signup = signups(packerDay=packerDay)
        db.session.add(signup)
        db.session.commit()
        return redirect('http://127.0.0.1:3000/signup')
    elif request.method == 'POST' and ('driver_preference' in request.form):
        driverDay1 = request.form.get('driverDay1')
        driverDay2 = request.form.get('driverDay2')
        driverDay3 = request.form.get('driverDay3')
        driverDay4 = request.form.get('driverDay4')
        driverDay = [driverDay1, driverDay2, driverDay3, driverDay4]
        
        driverMoreDelivery = request.form.get('driverMoreDelivery')
        driverOutsideDurham = request.form.get('driverOutsideDurham')
        other_preference = [driverMoreDelivery, driverOutsideDurham]
        
        driver_preference = request.form['driver_preference']
        
        driverTime9 = request.form.get('driverTime9')
        driverTime915 = request.form.get('driverTime915')
        driverTime930 = request.form.get('driverTime930')
        driverTime945 = request.form.get('driverTime945')
        driverTime10 = request.form.get('driverTime10')
        driverTime1015 = request.form.get('driverTime1015')
        driverTime1030 = request.form.get('driverTime1030')
        driverTime1045 = request.form.get('driverTime1045')
        driverTime = [driverTime9, driverTime915, driverTime930, driverTime945,
                      driverTime10, driverTime1015, driverTime1030, driverTime1045]
        
        signup = signups(driverDay=driverDay, other_preference=other_preference,
                         driver_preference=driver_preference, driverTime=driverTime)
        
        db.session.add(signup)
        db.session.commit()
        return redirect('http://127.0.0.1:3000/signup')

if __name__ == "__main__":
    app.run(debug=True)