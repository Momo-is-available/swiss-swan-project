(function () {
	const originalAddEventListener = EventTarget.prototype.addEventListener;
	EventTarget.prototype.addEventListener = function (
		type,
		listener,
		options
	) {
		if (type === "touchstart" && options === undefined) {
			options = { passive: true };
		}
		originalAddEventListener.call(this, type, listener, options);
	};
})();
