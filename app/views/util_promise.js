'use strict';
export let Util = {
  post: function (url, data) {
    var isOk;
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((response) => {
          if (response.ok) {
            isOk = true;
          } else {
            isOk = false;
          }
          return response.text();
        })
        .then((responseText) => {
          if (isOk) {
            resolve(JSON.parse(responseText));
          } else {
            reject(responseText);
          }
        })
        .catch((error) => {
          reject(error);
        });
    })
  },
  //Key
  key: 'HSHHSGSGGSTWSYWSYUSUWSHWBS-REACT-NATIVE',
}