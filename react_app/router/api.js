import React from 'react';
const url = "https://backr.herokuapp.com/"

exports.createUser = (name, email) => {

  var body = {
    name: name,
    age: 343829,
    email: email,
    isMaker: false,
    shortBio: "",
    profiles: {
      maker: {
        longBio: "",
        photos: [],
        icons: [false, false, false, false, false],
        swipedright: [],
        matches: [],
        swipedon: []
      },
      backer: {
        longBio: "",
        photos: [],
        icons: [false, false, false, false, false],
        swipedright: [],
        matches: [],
        swipedon: []
      }
    },
  }

  fetch( url + 'user', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
      body: JSON.stringify(body)
    }).then(function(response) {
      console.log("inside api");
      return response;
    })
    .catch((error) => {
        console.error(error);
    });
}

exports.getUser = (email) => {
  console.log("GET user request");
  //Sarah
  var urlParams = "user?email=" + email;
  fetch(url + urlParams)
  .then(function(response) { return response.json(); })
  .then(function(data) {
    console.log(data);
    return data;
  });

}

exports.getMaker = (email) => {
  console.log("GET user request");
  //Sarah
  var urlParams = "user/maker?email=" + email;
  fetch(url + urlParams)
  .then(function(response) { return response.json(); })
  .then(function(data) {
    console.log(data);
    return data;
  });
}

exports.getBacker = (email) => {
  //Me
  console.log("GET user request");
  //Sarah
  var urlParams = "user/backer?email=" + email;

  fetch(url + urlParams)
  .then(function(response) { return response.json(); })
  .then(function(data) {
    console.log(data);
    return data;
  });

}

exports.getSettings = (email) => {
  //eric
  fetch(url + urlParams)
  .then(function(response) { return response.json(); })
  .then(function(data) {
    console.log(data);
    return data;
  });
}

exports.postSwipe = (email, swipedEmail, isMaker, swipedRight) => {
  //Eric
  console.log("posting swipe");
  fetch( url + 'user', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      swipedEmail: swipedEmail,
      isMaker: false,
      swipedRight: swipedRight
      })
  }).then(function(response) {
    console.log("inside postSwipe api util callback");
    return response.json();
  })
    .catch((error) => {
      console.error(error);
    });
}

//ONLY CALL ONCE on initial signup of user. All other edit settings call updateSettings
exports.createSettings = (email) => {
  //eric
  console.log("post create settings");
  fetch( url + 'user/settings/create', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      blockedUsers: [],
      isVisible: false
    })
  }).then(function(response) {
    console.log("inside create settings api util callback");
    return response;
  })
    .catch((error) => {
      console.error(error);
    });
}

//TODO
//Function called in EditScreen.
exports.updateProfile = (email, shortbio) => {

  console.log("post create settings");
  fetch( url + 'user', {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      shortbio: shortbio
    })
  }).then(function(response) {
    console.log("update profile pi util callback");
    return response.json();
  })
    .catch((error) => {
      console.error(error);
    });
}

exports.updateMakerProfile = (longbio, photos, icons, email) => {
  console.log("post create settings");
  fetch( url + 'user/settings/create', {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      shortbio: shortbio
    })
  }).then(function(response) {
    console.log("inside UPDATEMAKERPROFILE api util callback");
    return response.json();
  })
    .catch((error) => {
      console.error(error);
    });
}



  //Fetch user first
  /* Order for icon booleans:
  money
  materials
  knowledge
  manpower
  collaborators
  */


//TODO
exports.updateSettings = (email) => {
 //Eric
}