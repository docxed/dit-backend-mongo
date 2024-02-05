const moment = require('../../../utils/moment')

module.exports = {
  enrollitemSerializer: (enrollitem) => {
    return {
      id: enrollitem._id,
      create_date: enrollitem.createdAt
        ? moment(enrollitem.createdAt).format('YYYY-MM-DD HH:mm:ss')
        : null,
      update_date: enrollitem.updatedAt
        ? moment(enrollitem.updatedAt).format('YYYY-MM-DD HH:mm:ss')
        : null,
      del_flag: enrollitem.del_flag,
    }
  },
}
