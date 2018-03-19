
# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
from flask_sqlalchemy import SQLAlchemy
# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy.sql import func
from sqlalchemy import MetaData
from sqlalchemy import Table
from sqlalchemy import Column
from sqlalchemy import Integer,String

from samplevalue import samplefunc

## Flask setup 
app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///DataSets/belly_button_biodiversity.sqlite'
db = SQLAlchemy(app)

engine = create_engine("sqlite:///DataSets/belly_button_biodiversity.sqlite")
metadata = MetaData(engine, reflect=True)

class Samples(db.Model):
    __tablename__ = 'samples_metadata'
    SAMPLEID = db.Column(db.Integer, primary_key=True)
    EVENT = db.Column(db.String)
    ETHNICITY=db.Column(db.String)
    GENDER=db.Column(db.String)
    AGE = db.Column(db.Integer)
    WFREQ = db.Column(db.Integer)
    BBTYPE = db.Column(db.String)
    LOCATION = db.Column(db.String)
    COUNTRY012 = db.Column(db.String)
    ZIP012 = db.Column(db.Integer)
    COUNTRY1319 = db.Column(db.String)
    ZIP1319 = db.Column(db.Integer) 
    DOG = db.Column(db.String)
    CAT = db.Column(db.String)
    IMPSURFACE013 = db.Column(db.Integer)
    NPP013 = db.Column(db.Float)
    MMAXTEMP013 = db.Column(db.Float)
    PFC013 = db.Column(db.Float)
    IMPSURFACE01319 = db.Column(db.Integer)
    NPP1319 = db.Column(db.Float)
    MMAXTEMP1319 = db.Column(db.Float)
    PFC1319 = db.Column(db.Float)

class Otu (db.Model):
    __tablename__='otu'
    otu_id = db.Column(db.Integer,primary_key=True)
    lowest_taxonomic_unit_found = db.Column(db.String)

@app.route("/")
def home():
   ## """Return the dashboard homepage."""
    return render_template("index.html")
   

@app.route('/names')
def name():
    engine = create_engine("sqlite:///DataSets/belly_button_biodiversity.sqlite")

# Create MetaData instance
    metadata = MetaData(engine, reflect=True)
    ex_table = metadata.tables['samples']
    names = ex_table.columns.keys()
    names.remove('otu_id')
    print(names)
    return jsonify(names)

@app.route('/otu')
def otu():
    otu_results=db.session.query(Otu.lowest_taxonomic_unit_found)
    otu=[]
    for result in otu_results:
        otu.append(result[0])
    return jsonify(otu)


@app.route('/metadata/<sample>')
def metadata(sample):
    sample = sample.strip('BB_')
    metadata_results = db.session.query(Samples.AGE,Samples.BBTYPE,Samples.ETHNICITY,Samples.GENDER,Samples.LOCATION,Samples.SAMPLEID).filter(Samples.SAMPLEID == sample).group_by(Samples.SAMPLEID)
    print(metadata_results)
    sample_metadata=[]

    for result in metadata_results:
        sample_metadata.append({"AGE":result[0],"BBTYPE":result[1],"ETHNICITY":result[2],"GENDER":result[3],"LOCATION":result[4],"SAMPLEID":result[5]})
    return jsonify(sample_metadata)

@app.route('/wfreq/<sample>')
def wfreq(sample):
    sample = sample.strip('BB_')
    wfreq_results = db.session.query(Samples.WFREQ).filter(Samples.SAMPLEID == sample)
    print(wfreq_results)
    wfreq=[]
    for result in wfreq_results:
        wfreq.append(result)
    return jsonify(wfreq)
    
@app.route('/samples/<sample>')
def samplevalues(sample):
    print ("value is :", sample)
    #y=sample
   # print(y)

    z=samplefunc(sample)
    print("values of z*********",z)
    mylist=[]
    mylist.append(z)
    print("*********************")
    print(mylist)
    return jsonify(mylist)


if __name__ == '__main__':
     app.run(debug=True)
