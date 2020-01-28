import firebase from 'firebase'

const initPromise = (() => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => user ? resolve(user) : reject())
  })
})()

export const getUID = () => {
  if (firebase.auth().currentUser) {
    return Promise.resolve(firebase.auth().currentUser.uid)
  } else {
    return new Promise((resolve) => {
      initPromise
        .then(user => resolve(user.uid))
        .catch(resolve)
    })
  }
}

export const signOut = () => {
  return firebase.auth().signOut()

}