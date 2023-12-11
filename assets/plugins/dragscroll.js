/**
 * @fileoverview dragscroll - scroll area by dragging
 * @version 0.0.8
 *
 * @license MIT, see http://github.com/asvd/dragscroll
 * @copyright 2015 asvd <heliosframework@gmail.com>
 */ !function (e, t) {
	"function" == typeof define && define.amd ? define(["exports"], t) : t("undefined" != typeof exports ? exports : e.dragscroll = {})
}(this, function (e) {
	var t, n, o = window, l = document, c = "mousemove", r = "mouseup", i = "mousedown", m = "EventListener",
		s = "add" + m, a = "remove" + m, u = [], d = function (e, m) {
			for (e = 0; e < u.length;) (m = (m = u[e++]).container || m)[a](i, m.md, 0), o[a](r, m.mu, 0), o[a](c, m.mm, 0);
			for (e = 0, u = [].slice.call(l.getElementsByClassName("dragscroll")); e < u.length;) !function (e, m, a, u, d, f) {
				(f = e.container || e)[s](i, f.md = function (t) {
					e.hasAttribute("nochilddrag") && l.elementFromPoint(t.pageX, t.pageY) != f || (u = 1, m = t.clientX, a = t.clientY, t.preventDefault())
				}, 0), o[s](r, f.mu = function () {
					u = 0
				}, 0), o[s](c, f.mm = function (o) {
					u && ((d = e.scroller || e).scrollLeft -= t = -m + (m = o.clientX), d.scrollTop -= n = -a + (a = o.clientY), e == l.body && ((d = l.documentElement).scrollLeft -= t, d.scrollTop -= n))
				}, 0)
			}(u[e++])
		};
	"complete" == l.readyState ? d() : o[s]("load", d, 0), e.reset = d
});