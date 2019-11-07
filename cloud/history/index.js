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
      if (res.update) {
        if (JSON.stringify(res2.data[0].history).indexOf(JSON.stringify(res.newData)) == -1) {
          let oldData = res2.data[0].history;
          if (oldData.length >= 6) {
            oldData.splice(0, 1)
            return await db
              .collection('users')
              .where({
                openid: wxContext.OPENID
              })
              .update({
                data: {
                  history: [...oldData, res.newData]
                },
                success: function (res3) {
                  return "新添加搜索历史"
                }
              })
          } else {
            return await db
              .collection('users')
              .where({
                openid: wxContext.OPENID
              })
              .update({
                data: {
                  history: [...oldData, res.newData]
                },
                success: function (res3) {
                  return "新添加搜索历史"
                }
              })
          }

        } else {
          return "已有数据"
        }
      }
      else {
        return res2.data[0].history.reverse()
      }
    })

}
