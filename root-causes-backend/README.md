# Root Causes - Backend API

Backend Flask API (app.py) for both admin and volunteer applications.

<!-- ## Suggestions for a good README
Every project is different, so consider which of these sections apply to yours. The sections used in the template are suggestions for most open source projects. Also keep in mind that while a README can be too long and detailed, too long is better than too short. If you think your README is too long, consider utilizing another form of documentation rather than cutting out information. -->

## Description
<!-- Let people know what your project can do specifically. Provide context and add a link to any reference visitors might be unfamiliar with. A list of Features or a Background subsection can also be added here. If there are alternatives to your project, this is a good place to list differentiating factors. -->
### The purpose of Classes
The Classes in the app.py file initialize the different tables in the database that will be used to make GET and POST requests. 

### The purpose of app routes
The app routes (@app.route(...)) are specific to the functions we want to carry out. Each route functionality is briefly described in the comment above it. The route written in the app.py file (ex. /participants/status) must be the same when called in the React files. This is how we're able to make requests. 


## Installation
<!-- Within a particular ecosystem, there may be a common way of installing things, such as using Yarn, NuGet, or Homebrew. However, consider the possibility that whoever is reading your README is a novice and would like more guidance. Listing specific steps helps remove ambiguity and gets people to using your project as quickly as possible. If it only runs in a specific context like a particular programming language version or operating system or has dependencies that have to be installed manually, also add a Requirements subsection. -->
To be able to run this file, you'll have to install a couple of things. The following are imported libraries that are listed at the top of the file that require installation. Make sure to have everything set-up so that these libraries can be used.

```
from flask import Flask, request, jsonify, redirect, url_for, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.orm import join
from sqlalchemy import Column, ForeignKey, Integer, Table, null
from sqlalchemy.orm import declarative_base, relationship
from flask_marshmallow import Marshmallow
import psycopg2
from sqlalchemy.dialects.postgresql import ARRAY
from twilio.rest import Client

<!-- import needed for file upload -->
from werkzeug.utils import secure_filename
```

## Usage
This API is used to retrieve data from and post data into a postgreSQL database hosted on a Root Causes Duke server. These calls are made in the respective React files, some through Axios calls.

## Roadmap
In the future, we'd like to see this API adapted for new functionalities for both admin and volunteer applications. 

## Authors and acknowledgment
<!-- Show your appreciation to those who have contributed to the project. -->
Thank you to our stakeholders, the Root Causes team (Esko Brummel and Willis Wong); our sponsors, Microsoft (Dan Fay, Sresth Kumar, Anastasia Egorova, Tulika Jha, Angelyn Smith, and Selly Kruthoffer-Thompson); our Code+ team leads (Will Sexton, Vanessa Simmons, and Todd Blandford); and the Duke Co-Lab (Danai Adkisson)!.

## Project status
All functions written in the file are working. Development of new code will be picked up by a new team in the future.

<!-- If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers. -->
