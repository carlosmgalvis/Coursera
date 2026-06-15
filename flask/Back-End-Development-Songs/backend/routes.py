from . import app
import os
import json
import pymongo
from flask import jsonify, request, make_response, abort, url_for  # noqa; F401
from pymongo import MongoClient
from bson import json_util
from pymongo.errors import OperationFailure
from pymongo.results import InsertOneResult
from bson.objectid import ObjectId
import sys

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
json_url = os.path.join(SITE_ROOT, "data", "songs.json")
songs_list: list = json.load(open(json_url))

# client = MongoClient(
#     f"mongodb://{app.config['MONGO_USERNAME']}:{app.config['MONGO_PASSWORD']}@localhost")
mongodb_service = os.environ.get('MONGODB_SERVICE')
mongodb_username = os.environ.get('MONGODB_USERNAME')
mongodb_password = os.environ.get('MONGODB_PASSWORD')
mongodb_port = os.environ.get('MONGODB_PORT')

print(f'The value of MONGODB_SERVICE is: {mongodb_service}')

if mongodb_service == None:
    app.logger.error('Missing MongoDB server in the MONGODB_SERVICE variable')
    # abort(500, 'Missing MongoDB server in the MONGODB_SERVICE variable')
    sys.exit(1)

if mongodb_username and mongodb_password:
    url = f"mongodb://{mongodb_username}:{mongodb_password}@{mongodb_service}"
else:
    url = f"mongodb://{mongodb_service}"


print(f"connecting to url: {url}")

try:
    client = MongoClient(url)
except OperationFailure as e:
    app.logger.error(f"Authentication error: {str(e)}")

db = client.songs
db.songs.drop()
db.songs.insert_many(songs_list)

def parse_json(data):
    return json.loads(json_util.dumps(data))

######################################################################
# INSERT CODE HERE
######################################################################
@app.route("/health", methods=["GET"])
def health():
    return {"status":"OK"}, 200

@app.route("/count", methods=["GET"])
def count_method():
    c = db.songs.count_documents({})
    return {"count": c}, 200

@app.route("/song", methods=["GET"])
def songs():
    all_songs = list(db.songs.find({}))
    return {"songs":json.loads(json_util.dumps(all_songs))}, 200

def get_song_by_id_method(id):
    all_songs = json.loads(json_util.dumps(list(db.songs.find({"id": id}))))
    if all_songs:
        return all_songs[0], 200
    return {"message": "song with id not found"}, 404

@app.route("/song/<int:id>", methods=["GET"])
def get_song_by_id(id):
    res = get_song_by_id_method(id)
    return res[0], res[1]

@app.route("/song", methods=["POST"])
def create_song():
    spec_song = request.json
    if spec_song:
        spec_id=spec_song.get("id",-1)
        res = get_song_by_id_method(spec_id)
        if res[1]==404:
            db.songs.insert_one(spec_song)
            return {"inserted id":get_song_by_id_method(spec_id)[0].get("_id")}, 201
        else:
            return {"Message": f"song with id {spec_id} already present"}, 302
    return {"message": "Invalid body"}, 400

@app.route("/song/<int:id>",methods=["PUT"])
def update_song(id):
    spec_song = request.json
    if spec_song:
        res = get_song_by_id_method(id)
        if res[1]==200:
            db.songs.update_one({"id":id},{"$set":spec_song})
            new_song = get_song_by_id_method(id)[0]
            if res[0] == new_song:
                return {"message":"song found, but nothing updated"}, 200
            return get_song_by_id_method(id)[0], 201
        else:
            return {"message": "song not found"}, 404
    return {"message": "Invalid body"}, 400

@app.route("/song/<int:id>",methods=["DELETE"])
def delete_song(id):
    res = get_song_by_id_method(id)
    if res[1]==200:
        res_del=db.songs.delete_one({"id": id})
        if res_del.deleted_count==1:
            return "", 204
    return {"message":"song not found"}, 404