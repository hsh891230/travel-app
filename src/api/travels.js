import firebase from 'firebase'
import _ from 'lodash'

const db = firebase.firestore()

const defaultTravel = {
  title: null,
  from: null,
  to: null,
  schedules: []
}

const defaultSchedule = {
  date: null,
  locations: []
}

const defaultLocation = {
  name: null,
  time: null,
  // geoname: null,
  geopoint: null,
  memo: null
}

export const getDefaultTravel = () => _.cloneDeep(defaultTravel)
export const getDefaultSchedule = () => _.cloneDeep(defaultSchedule)
export const getDefaultLocation = () => _.cloneDeep(defaultLocation)

export const getTravels = async uid => {
  return db
    .collection(`travelers/${uid}/travels`)
    .get()
    .then(querySnapshot =>
      querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }))
    )
}

export const addTravel = async (uid, travel) => {
  return db
    .collection(`travelers/${uid}/travels`)
    .add({
      ...travel,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(docRef => docRef.id)
}

export const updateTravel = async (uid, id, travel) => {
  return db.doc(`travelers/${uid}/travels/${id}`).update(travel)
}

export const onTravel = (uid, id, callback) => {
  return db.doc(`travelers/${uid}/travels/${id}`).onSnapshot(doc => {
    callback({
      id: doc.id,
      data: doc.data()
    })
  })
}
