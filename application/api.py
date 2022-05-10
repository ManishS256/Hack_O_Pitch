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

class AddUserAPI(Resource):
  def get(self, username, societyname, password, user_type, adminusername, adminkey, ho, co, dn, pn, apn, eid):
    try:
      admin=user_login.query.filter_by(username=adminusername,key=adminkey,user_type=3).first()
    except:
      raise InternalServerError(status_code=500)
    if(admin):
      try:
        user=user_login.query.filter_by(username=username,societyname=societyname).first()
      except:
        raise InternalServerError(status_code=500)
      if user:
        return "Username Already Used"
      else:
        user=user_login(username=username,societyname=societyname,password=password,user_type=user_type)
        db.session.add(user)
        db.session.commit()
        userdata=user_data(username=username,societyname=societyname,subscription=1,house_owner=ho,current_occupant=co,door_no=dn,phone_no=pn,alternate_phone_no=apn,email_id=eid)
        db.session.add(userdata)
        db.session.commit()
        return "User Added"
    else:
      return "Unauthorized User"

class RemoveUserAPI(Resource):
  def get(self, username, societyname, adminusername, adminkey):
    try:
      admin=user_login.query.filter_by(username=adminusername,key=adminkey,user_type=3).first()
    except:
      raise InternalServerError(status_code=500)
    if(admin):
      try:
        user=user_login.query.filter_by(username=username,societyname=societyname).first()
        if(user):
          user_login.query.filter_by(username=username,societyname=societyname).delete()
          user_data.query.filter_by(username=username,societyname=societyname).delete()
          db.session.commit()
          return "User Deleted"
        else:
          return "Username doesn't exist"
      except:
        raise InternalServerError(status_code=500)
    else:
      return "Unauthorized User"

class BookingListAPI(Resource):
  def get(self, username, societyname, key):
    try:
      employee=user_login.query.filter_by(username=username,societyname=societyname,key=key).first()
    except:
      raise InternalServerError(status_code=500)
    if(employee):
      bookinglist=bookings.query.filter_by(societyname=societyname).all()
      if(len(bookinglist)==0):
        return "No Bookings Available"
      l=[]
      for i in bookinglist:
        l.append({"username":i.username,"societyname":i.societyname,"timestamp":i.timestamp,"booking_id":i.booking_id})
      return l
    else:
      return "Unauthorized User"
      

api.add_resource(LoginAPI,"/api/login/<string:username>/<string:password>/<string:societyname>")
api.add_resource(BookingAPI,"/api/user/bookings/<string:username>/<string:societyname>/<string:key>/<string:typeofwaste>/<string:pl>/<string:ca>/<string:po>")
api.add_resource(AddUserAPI,"/api/admin/adduser/<string:adminusername>/<string:adminkey>/<string:username>/<string:societyname>/<string:password>/<string:user_type>/<string:ho>/<string:co>/<string:dn>/<string:pn>/<string:apn>/<string:eid>")
api.add_resource(RemoveUserAPI,"/api/admin/deleteuser/<string:adminusername>/<string:adminkey>/<string:username>/<string:societyname>")
api.add_resource(BookingListAPI,"/api/employee/bookings/<string:username>/<string:societyname>/<string:key>")