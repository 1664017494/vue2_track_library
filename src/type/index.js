/**
 * @typedef {Object} NoUrlTrackData
 * @property {string} eventName 事件功能
 * @property {string} remark 事件参数JSON字符串
 */
exports.NoUrlTrackData = {};

/**
 * @typedef {Object} BaseTrackData
 * @property {string} url 路由地址
 * @property {string} eventName 事件功能
 * @property {string} remark 事件参数JSON字符串
 */
exports.BaseTrackData = {};

/**
 * @typedef {Object} PropConfigType
 * @property {function} trackEvent 上报事件的函数
 * @property {*} router Vue-Router 路由实例
 * @property {string} projectCode 项目唯一标识
 * @property { () => Promise<UserInfo>} getUserInfo 获取用户信息的函数，支持异步
 * @property {() => boolean} isLogin 判断用户是否登录的函数，支持异步
 * @property {(to: any, from: any) => boolean} routerShouldTrackUp 判断路由跳转是否需要上报的函数，同步
 * @property {() => string} getTrackUpPath 判断路由跳转是否需要上报的函数，同步
 * @property {(Vue) => void, config: Config} registerFunc 判断路由跳转是否需要上报的函数，同步
 * @property {(trackInfo: BaseTrackData, otherInfo: any) => any} getTrackData 格式化上报的数据
 */
exports.PropConfigType = {};

/**
 * @typedef {Object} UserInfo 用户类型
 * @property {string} projectCode 项目唯一标识
 * @property {string} account 用户唯一标识
 * @property {string} userName 用户名
 * @property {string} userType 用户类型
 * @property {string} ip 用户ip
 * @property {string} token 用户会话唯一标识
 */
exports.UserInfo = {};

/**
 * @typedef {PropConfigType & BaseTrackData} Config 声明配置类型
 */
exports.Config = {};
