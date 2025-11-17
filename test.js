const datannya = [
  {"_id":"690650f2d3dceb229fe17bc0","title":"Develop Landing Page","description":"Build a responsive product landing page with a clear call-to-action.","assignedBy":{"_id":"69061aa8d3dceb229fe17908","userName":"doku","email":"doku@admin.com","role":"admin"},"staffId":{"_id":"69061b74d3dceb229fe17937","userName":"amar cakung","email":"amar@member.com","role":"member"},"status":"pending","level":"medium","createdAt":"2025-11-02 01:26:58","updatedAt":"2025-11-03 02:44:06","__v":0},
  {"_id":"6906516dd3dceb229fe1870d","title":"Optimize Database Query","description":"Improve API performance by rewriting inefficient MongoDB queries.","assignedBy":{"_id":"69061aa8d3dceb229fe17908","userName":"doku","email":"doku@admin.com","role":"admin"},"staffId":{"_id":"69061b81d3dceb229fe1793b","userName":"fadhli penggilingan","email":"fadhli@member.com","role":"member"},"status":"in progress","level":"medium","createdAt":"2025-11-02 01:29:01","updatedAt":"2025-11-02 01:29:01","__v":0},
  {"_id":"690651a6d3dceb...8","userName":"doku","email":"doku@admin.com","role":"admin"},"staffId":{"_id":"69061ba0d3dceb229fe17943","userName":"akhyar","email":"akhyar@member.com","role":"member"},"status":"in progress","level":"medium","createdAt":"2025-11-09 21:01:24","updatedAt":"2025-11-09 21:04:15","__v":0},
  {"_id":"69109f4fd9780649c2c4c677","title":"123qwe","description":"123qwe","assignedBy":{"_id":"69061ba0d3dceb229fe17943","userName":"akhyar","email":"akhyar@member.com","role":"member"},"staffId":{"_id":"69061ba0d3dceb229fe17943","userName":"akhyar","email":"akhyar@member.com","role":"member"},"status":"completed","level":"high","createdAt":"2025-11-09 21:03:59","updatedAt":"2025-11-09 21:03:59","__v":0},
  {"_id":"6910d4f5d9780649c2c4c71d","title":"zxc","description":"zxc","assignedBy":{"_id":"69061aa8d3dceb229fe17908","userName":"doku","email":"doku@admin.com","role":"admin"},"staffId":null,"status":"completed","level":"high","createdAt":"2025-11-10 00:52:53","updatedAt":"2025-11-10 00:52:53","__v":0}
]

const databaru = datannya.filter(item => item.staffId.userName == "amar cakung")

console.log({
    databaru
})