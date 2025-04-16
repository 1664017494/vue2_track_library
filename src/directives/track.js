function getTrackDirectives(config) {
  return {
    bind(el, binding) {
      const eventType = binding.arg || "click";
      el._value = binding.value;
      const eventHandler = () => {
        config.trackEvent(
          config.getTrackData({
            ...el._value,
            url: config.getTrackUpPath(location.hash),
          })
        );
      };

      el._trackHandler = eventHandler;
      el.addEventListener(eventType, eventHandler);
    },
    unbind(el, binding) {
      const eventType = binding.arg || "click";
      el.removeEventListener(eventType, el._trackHandler);
      delete el._trackHandler;
      delete el._value;
    },
    // 避免传入的值是动态值导致的参数不更新
    update(el, binding) {
      el._value = binding.value;
    },
  };
}

export default getTrackDirectives;
