import getTrackDirectives from "./directives/track";

/**
 * 根据业务需求，处理上报的地址信息
 * @param {string} path 处理之前的地址path
 * @returns 处理之后的path
 */
function getTrackUpPath(path) {
  return path;
}

export default {
  /**
   *
   * @param {Vue} Vue
   * @param {Config} options
   */
  install(Vue, options = {}) {
    /** @type {UserInfo} */
    let userInfo = null;

    // 默认配置
    /** @type {Config} */
    const defaultConfig = {
      trackEvent: console.log, // 默认使用console.log演示，实际替换为上报API
      router: null,
      projectCode: null,
      getUserInfo: function () {},
      isLogin: function () {},
      routerAutoTrackUp: () => true,
      getTrackUpPath,
    };

    const config = Object.assign(defaultConfig, options);

    /**
     *
     * @param {BaseTrackData} trackInfo 标准事件参数
     * @param {*} otherInfo 自定义参数
     * @returns 上报接口参数
     */
    function getTrackData(trackInfo, otherInfo) {
      return { ...userInfo, ...trackInfo, ...otherInfo };
    }

    async function setUserInfo() {
      if (userInfo) return;

      userInfo = await config.getUserInfo();

      config.trackEvent(
        getTrackData({
          url: config.getTrackUpPath(location.hash),
          eventName: `Common_Login`,
          remark: "",
        })
      );
    }

    if (config.isLogin()) {
      setUserInfo();
    }

    // 路由埋点
    if (config.router) {
      config.router.beforeEach((to, from, next) => {
        if (userInfo && config.routerAutoTrackUp()) {
          config.trackEvent(
            getTrackData({
              url: config.getTrackUpPath(to.path),
              eventName: `Common_Jump`,
              remark: "",
            })
          );
        }
        next();
      });
    }

    /**
     * 用户登陆时触发，初始化参数和上报信息
     */
    Vue.prototype.trackStart = async function () {
      await setUserInfo();
    };

    /**
     * 用户登出时触发，上报信息
     */
    Vue.prototype.trackEnd = function () {
      config.trackEvent(
        getTrackData({
          url: config.getTrackUpPath(location.path),
          eventName: `Common_Logout`,
          remark: "",
        })
      );
    };

    /**
     * 函数触发，上报信息
     * @param {string} eventName
     * @param {string} remark
     */
    Vue.prototype.trackUp = function (eventName, remark) {
      config.trackEvent(
        getTrackData({
          url: config.getTrackUpPath(location.hash),
          eventName,
          remark,
        })
      );
    };

    // 自定义指令 v-track
    Vue.directive("track", getTrackDirectives(config, getTrackData));
  },
};
