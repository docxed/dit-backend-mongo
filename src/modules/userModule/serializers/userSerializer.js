const moment = require('../../../utils/moment')
const { GENDER } = require('../constants/user')

module.exports = {
  userSerializer: (user) => {
    return {
      id: user._id,
      email: user.email,
      dq_score: user.dq_score,
      prefix: user.prefix,
      firstname: user.firstname,
      lastname: user.lastname,
      fullname: `${user.firstname} ${user.lastname}`,
      fullname_with_school: `${user.firstname} ${user.lastname} (${user.school})`,
      school: user.school,
      gender: user.gender ? GENDER.find((v) => v.id === user.gender).name : null,
      birthday: user.birthday ? moment(user.birthday).format('YYYY-MM-DD') : null,
      phone: user.phone,
      province: user.province,
      groups: user.groups,
      create_date: user.createdAt ? moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss') : null,
      update_date: user.updatedAt ? moment(user.updatedAt).format('YYYY-MM-DD HH:mm:ss') : null,
      del_flag: user.del_flag,
    }
  },
}
