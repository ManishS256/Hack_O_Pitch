from flask import current_app as app
from flask_sqlalchemy import SQLAlchemy

app.config['SQLALCHEMY_DATABASE_URI'] ="sqlite:///db.sqlite3"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db=SQLAlchemy()
db.init_app(app)


class user_login(db.Model):
	__tablename__='user_login'
	username=db.Column(db.String, primary_key=True, nullable=False, unique=True)
	password=db.Column(db.String, nullable=False)
	societyname=db.Column(db.String, primary_key=True)
	key=db.Column(db.String)
	user_type=db.Column(db.Integer)


class bookings(db.Model):
	__tablename__='bookings'
	username=db.Column(db.String, db.ForeignKey("user_login.username"), primary_key=True)
	societyname=db.Column(db.String, db.ForeignKey("user_login.societyname"), primary_key=True)
	typeofwaste=db.Column(db.Integer)
	timestamp=db.Column(db.String)