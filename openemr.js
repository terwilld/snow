const axios = require('axios')
const https = require('https')
require('dotenv').config()
const Patient = require('./models/patient')
const Encounter = require('./models/encounter')
const mongoose = require('mongoose')
const currentToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3bF9ZZmhUS1JIeEJUNmdqOFRnVGxpQ3VfQ3NmVjYtUGJfLXJBd0FZT0ljIiwianRpIjoiYjQyNjE0MWMxMDMzNmJiM2RkODFkNDFlZThlMjI5ZmY3Y2RiYmM0NDRiMWMwODQ1ZDVkMzFlYzIxZDZlOWNkMTBmY2ZkMDVhMDE5ZTYyZDUiLCJpYXQiOjE3MjQ2NDkxOTQuMzgwMDE4LCJuYmYiOjE3MjQ2NDkxOTQuMzgwMDQ4LCJleHAiOjE3MjQ2NTI3OTQuMzYzNTQzLCJzdWIiOiI5Y2Q4MzM5ZS00MzJmLTRlOTItOGViNy1jMTFlOTA4YmI3MTgiLCJzY29wZXMiOlsib3BlbmlkIiwib2ZmbGluZV9hY2Nlc3MiLCJsYXVuY2gvcGF0aWVudCIsImFwaTpmaGlyIiwidXNlci9BbGxlcmd5SW50b2xlcmFuY2UucmVhZCIsInVzZXIvQmluYXJ5LnJlYWQiLCJ1c2VyL0NhcmVQbGFuLnJlYWQiLCJ1c2VyL0NhcmVUZWFtLnJlYWQiLCJ1c2VyL0NvbmRpdGlvbi5yZWFkIiwidXNlci9Db3ZlcmFnZS5yZWFkIiwidXNlci9EZXZpY2UucmVhZCIsInVzZXIvRGlhZ25vc3RpY1JlcG9ydC5yZWFkIiwidXNlci9Eb2N1bWVudFJlZmVyZW5jZS5yZWFkIiwidXNlci9Eb2N1bWVudFJlZmVyZW5jZS4kZG9jcmVmIiwidXNlci9FbmNvdW50ZXIucmVhZCIsInVzZXIvR29hbC5yZWFkIiwidXNlci9JbW11bml6YXRpb24ucmVhZCIsInVzZXIvTG9jYXRpb24ucmVhZCIsInVzZXIvTWVkaWNhdGlvbi5yZWFkIiwidXNlci9NZWRpY2F0aW9uUmVxdWVzdC5yZWFkIiwidXNlci9PYnNlcnZhdGlvbi5yZWFkIiwidXNlci9Pcmdhbml6YXRpb24ucmVhZCIsInVzZXIvT3JnYW5pemF0aW9uLndyaXRlIiwidXNlci9QYXRpZW50LnJlYWQiLCJ1c2VyL1BhdGllbnQud3JpdGUiLCJ1c2VyL1BlcnNvbi5yZWFkIiwidXNlci9QcmFjdGl0aW9uZXIucmVhZCIsInVzZXIvUHJhY3RpdGlvbmVyLndyaXRlIiwidXNlci9QcmFjdGl0aW9uZXJSb2xlLnJlYWQiLCJ1c2VyL1Byb2NlZHVyZS5yZWFkIiwidXNlci9Qcm92ZW5hbmNlLnJlYWQiLCJhcGk6b2VtciIsImFwaTpwb3J0Iiwic2l0ZTpkZWZhdWx0Il19.X6nMkZbv47VAjFhALyJmkVCpnktpceXCHxR45mow60Myuqu5Zqi00kYfpv3j8CfQ6hx1-Fk3CahixXZ1zM65KCIh91TgF5ty1bXsKGDybPxf5FOU7iumyoyHSH4IW9bibm842OigSQXbd2qXBnFfVg-TEYBkaI98ndkLStecot6lMRIH-aIlQKpgqio6ZMoJDj3KWHz34A4EQD6ONsBEZ0ehBiUg66fc2Bdl9pHYOmLtv2zDwcwORfN2YfePLWyD88ynM4TACjuePPEYFmQK2m5iEmyhIb61ow5unYPInmTrQ5Sw3PwdCKL7LyhmU5zW591a0thNrajJCtiB7JyR8A'

const delay = ms => new Promise(res => setTimeout(res, ms));


if (process.env.NODE_ENV == "production") {
    mockCJurl = process.env.mockCJurl
    dbURL = process.env.dbURL;

} else {
    mockCJurl = 'http://localhost:3001'
    dbURL = 'mongodb://127.0.0.1:27017/snow';
}

mongoose.connect(dbURL);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected by mongoose")
    console.log(dbURL)
})


var callEMRPatients = async function (url) {
    await delay(5000);
    console.log("Waited 5 sec")
    const agent = new https.Agent({
        rejectUnauthorized: false
    });
    res = await axios.get(url, {
        httpsAgent: agent,
        headers: {
            'Authorization': 'Bearer ' + currentToken
        }
    });
    const arrayOfPatients = res.data.entry
    for (const result of arrayOfPatients) {
        let birthday = result.resource.birthDate
        let emrID = result.resource.id
        let tmpname = result.resource.name[0]
        let name = tmpname.given[0] + ' ' + tmpname.family
        let gender = result.resource.gender
        foundPatient = await Patient.findOne({ emrID: emrID })
        if (foundPatient == null) {
            newPatient = new Patient({ birthday, emrID, name, gender })
            await newPatient.save()
            console.log('patient inserted')
        } else {
            console.log('patient already stored')
        }
    }

}

var callEMREncounters = async function (url) {
    await delay(5000);
    console.log("Waited 5 sec")
    const agent = new https.Agent({
        rejectUnauthorized: false
    });
    res = await axios.get(url, {
        httpsAgent: agent,
        headers: {
            'Authorization': 'Bearer ' + currentToken
        }
    });
    const arrayOfEncounters = res.data.entry
    for (const result of arrayOfEncounters) {
        const emrID = result.resource.id
        const patientID = result.resource.subject.reference.split('/')[1]
        const startTime = result.resource.period.start
        const classType = result.resource.class.display
        const reason = result.resource.reasonCode[0].text
        refPatient = await Patient.findOne({ emrID: patientID })
        foundEncounter = await Encounter.findOne({ emrID: emrID })
        if (foundEncounter == null) {
            newEncounter = new Encounter({ emrID, patient: refPatient, startTime, classType, reason })
            await newEncounter.save()
            console.log('encounter inserted')
        } else {
            console.log('encounter already stored')
        }
    }
}


//callEMRPatients('https://54.152.148.20/openemr/apis/default/fhir/Patient')

callEMREncounters('https://54.152.148.20/openemr/apis/default/fhir/Encounter')

