from flask import render_template, request, redirect, url_for, send_from_directory, jsonify, send_file
from flask_restful import Resource, Api, reqparse
from werkzeug.exceptions import HTTPException
import json
import requests
import secrets
import os
from datetime import datetime, timedelta
import random

from flask import current_app as app
from application.db import *

api=None
api=Api(app)

class InternalServerError(HTTPException):
  def __init__(self,status_code):
    self.response=make_response('',status_code)


class LoginAPI(Resource):
  def get(self,societyname,username,password):
    try:
      user=user_login.query.filter_by(username=username,password=password,societyname=societyname).first()
    except:
      raise InternalServerError(status_code=500)
    if user:
      key=secrets.token_hex(25)
      user.key=key
      db.session.commit()
      return jsonify({"msg":"Logged in Succesfully","key":key,"type":user.user_type})
    else:
      return "Username or Password or Societyname Doesn't match"


class BookingAPI(Resource):
  def get(self, username, societyname, key, typeofwaste, pl, ca, po):
    try:
      user=user_login.query.filter_by(username=username,key=key).first()
    except:
      raise InternalServerError(status_code=500)
    if user:
      ct = datetime.now()
      book=bookings.query.filter_by(username=username,societyname=societyname).first()
      if(book):
        return "Already Booked"
      booking=bookings(username=username,societyname=societyname,timestamp=ct,dry_wet_both=typeofwaste,plastic=pl,cardboard=ca,polybags=po)
      db.session.add(booking)
      db.session.commit()
      return "Booking Successfull"
    else:
      return "Unauthorized user"

api.add_resource(LoginAPI,"/api/login/<string:username>/<string:password>/<string:societyname>")
api.add_resource(BookingAPI,"/api/user/bookings/<string:username>/<string:societyname>/<string:key>/<string:typeofwaste>/<string:pl>/<string:ca>/<string:po>")
