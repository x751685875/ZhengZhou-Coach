const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

exports.main = async res => {
  const wxContext = cloud.getWXContext()

  return await db
    .collection('users')
    .where({
      openid: wxContext.OPENID
    })
    .get()
    .then(async res2 => {
      if (res2.data.length) {
        if (res2.data[0].history) {
          await db
            .collection('users')
            .where({
              openid: wxContext.OPENID
            })
            .update({
              data: {
                openid: wxContext.OPENID,
                appid: wxContext.APPID,
                unionid: wxContext.UNIONID,
                language: res.language,
                model: res.model,
                system: res.system,
                version: res.version
              }
            })
        } else {
          await db
            .collection('users')
            .where({
              openid: wxContext.OPENID
            })
            .update({
              data: {
                openid: wxContext.OPENID,
                appid: wxContext.APPID,
                unionid: wxContext.UNIONID,
                history: [],
                language: res.language,
                model: res.model,
                system: res.system,
                version: res.version
              }
            })
        }
      } else {
        await db.collection('users').add({
          data: {
            openid: wxContext.OPENID,
            appid: wxContext.APPID,
            unionid: wxContext.UNIONID,
            history: [],
            language: res.language,
            model: res.model,
            system: res.system,
            version: res.version
          }
        })
      }
    })
}
