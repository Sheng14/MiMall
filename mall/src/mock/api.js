import Mock from 'mockjs'

Mock.mock('/api/user/login', {
    "status": 0,
    "data": {
      "id|1001-1045": 0,
      "username": "admin",
      "email": "admin@51purse.com",
      "phone": null,
      "role": 0,
      "createTime": 1479048325000,
      "updateTime": 1479048325000
    }
})