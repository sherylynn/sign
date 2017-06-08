var Config = {
  //host: 'http://mh.kenx.cn:3000',
  //host:'http://10.0.2.2:3000',//苹果的地址不一定相同,不能使用10.0.2.2:3000
  //host:'http://192.168.0.249:3000',
  host:'http://a3.18e.pub:3000',
  login: '/user/login',
  sign_actis:'/api/sign_actis',
  users:'/api/users',
  loginByToken: '/user/login/token',
  getUser: '/user/get',
  getkankanList:'/kankan/getList',
  getkankan:'kankan/get',
  createUser: '/user/create',
  getMessage: '/message/get',
  addMessage: '/message/add',
  getMakeup: '/makeup/get',
  addMakeup: '/makeup/add',
  updatePassword: '/user/password/update',
  deleteUser: '/user/delete',
  dev:true,
  Production_k:'wEerHBCE50XBhWPoYRF-VukzWv6eVJBn00G_z',
  Staging_k:'d0dXFLQBN9WGr4yOEUp4FXBH85PhVJBn00G_z',
  db: '/db/users'
};

module.exports = Config;