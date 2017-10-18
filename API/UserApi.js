

class UserAPi {
   textChange = (obj) => {
     return new Promise((resolve, reject)=> {
       resolve(Object.assign([], obj))
     })
   }
}

export default new UserAPi();
