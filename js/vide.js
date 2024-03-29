!(function (a, b) {
	"function" == typeof define && define.amd
		? define(["jquery"], b)
		: b("object" == typeof exports ? require("jquery") : a.jQuery);
})(this, function (a) {
	"use strict";
	function b(a) {
		var b,
			c,
			d,
			e,
			f,
			g,
			h,
			i = {};
		for (
			f = a
				.replace(/\s*:\s*/g, ":")
				.replace(/\s*,\s*/g, ",")
				.split(","),
				h = 0,
				g = f.length;
			h < g &&
			((c = f[h]),
			c.search(/^(http|https|ftp):\/\//) === -1 && c.search(":") !== -1);
			h++
		)
			(b = c.indexOf(":")),
				(d = c.substring(0, b)),
				(e = c.substring(b + 1)),
				e || (e = void 0),
				"string" == typeof e && (e = "true" === e || ("false" !== e && e)),
				"string" == typeof e && (e = isNaN(e) ? e : +e),
				(i[d] = e);
		return null == d && null == e ? a : i;
	}
	function c(a) {
		a = "" + a;
		var b,
			c,
			d,
			e = a.split(/\s+/),
			f = "50%",
			g = "50%";
		for (d = 0, b = e.length; d < b; d++)
			(c = e[d]),
				"left" === c
					? (f = "0%")
					: "right" === c
					? (f = "100%")
					: "top" === c
					? (g = "0%")
					: "bottom" === c
					? (g = "100%")
					: "center" === c
					? 0 === d
						? (f = "50%")
						: (g = "50%")
					: 0 === d
					? (f = c)
					: (g = c);
		return { x: f, y: g };
	}
	function d(b, c) {
		var d = function () {
			c(this.src);
		};
		a('<img src="' + b + '.gif">').on("load", d),
			a('<img src="' + b + '.jpg">').on("load", d),
			a('<img src="' + b + '.jpeg">').on("load", d),
			a('<img src="' + b + '.png">').on("load", d);
	}
	function e(c, d, e) {
		if (
			((this.$element = a(c)),
			"string" == typeof d && (d = b(d)),
			e ? "string" == typeof e && (e = b(e)) : (e = {}),
			"string" == typeof d)
		)
			d = d.replace(/\.\w*$/, "");
		else if ("object" == typeof d)
			for (var f in d)
				d.hasOwnProperty(f) && (d[f] = d[f].replace(/\.\w*$/, ""));
		(this.settings = a.extend({}, g, e)), (this.path = d);
		try {
			this.init();
		} catch (i) {
			if (i.message !== h) throw i;
		}
	}
	var f = "vide",
		g = {
			volume: 1,
			playbackRate: 1,
			muted: !0,
			loop: !0,
			autoplay: !0,
			position: "50% 50%",
			posterType: "detect",
			resizing: !0,
			bgColor: "transparent",
			className: "",
		},
		h = "Not implemented";
	(e.prototype.init = function () {
		var b,
			e,
			f = this,
			g = f.path,
			i = g,
			j = "",
			k = f.$element,
			l = f.settings,
			m = c(l.position),
			n = l.posterType;
		(e = f.$wrapper =
			a("<div>")
				.addClass(l.className)
				.css({
					"position": "absolute",
					"z-index": -1,
					"top": 0,
					"left": 0,
					"bottom": 0,
					"right": 0,
					"overflow": "hidden",
					"-webkit-background-size": "cover",
					"-moz-background-size": "cover",
					"-o-background-size": "cover",
					"background-size": "cover",
					"background-color": l.bgColor,
					"background-repeat": "no-repeat",
					"background-position": m.x + " " + m.y,
				})),
			"object" == typeof g &&
				(g.poster
					? (i = g.poster)
					: g.mp4
					? (i = g.mp4)
					: g.webm
					? (i = g.webm)
					: g.ogv && (i = g.ogv)),
			"detect" === n
				? d(i, function (a) {
						e.css("background-image", "url(" + a + ")");
				  })
				: "none" !== n && e.css("background-image", "url(" + i + "." + n + ")"),
			"static" === k.css("position") && k.css("position", "relative"),
			k.prepend(e),
			"object" == typeof g
				? (g.mp4 && (j += '<source src="' + g.mp4 + '.mp4" type="video/mp4">'),
				  g.webm &&
						(j += '<source src="' + g.webm + '.webm" type="video/webm">'),
				  g.ogv && (j += '<source src="' + g.ogv + '.ogv" type="video/ogg">'),
				  (b = f.$video = a("<video>" + j + "</video>")))
				: (b = f.$video =
						a(
							'<video><source src="' +
								g +
								'.mp4" type="video/mp4"><source src="' +
								g +
								'.webm" type="video/webm"><source src="' +
								g +
								'.ogv" type="video/ogg"></video>'
						));
		try {
			b.prop({
				autoplay: l.autoplay,
				loop: l.loop,
				volume: l.volume,
				muted: l.muted,
				defaultMuted: l.muted,
				playbackRate: l.playbackRate,
				defaultPlaybackRate: l.playbackRate,
			});
		} catch (o) {
			throw new Error(h);
		}
		b
			.css({
				"margin": "auto",
				"position": "absolute",
				"z-index": -1,
				"top": m.y,
				"left": m.x,
				"-webkit-transform": "translate(-" + m.x + ", -" + m.y + ")",
				"-ms-transform": "translate(-" + m.x + ", -" + m.y + ")",
				"-moz-transform": "translate(-" + m.x + ", -" + m.y + ")",
				"transform": "translate(-" + m.x + ", -" + m.y + ")",
				"visibility": "hidden",
				"opacity": 0,
			})
			.one("canplaythrough.vide", function () {
				f.resize();
			})
			.one("playing.vide", function () {
				b.css({ visibility: "visible", opacity: 1 }),
					e.css("background-image", "none");
			}),
			k.on("resize.vide", function () {
				l.resizing && f.resize();
			}),
			e.append(b);
	}),
		(e.prototype.getVideoObject = function () {
			return this.$video[0];
		}),
		(e.prototype.resize = function () {
			if (this.$video) {
				var a = this.$wrapper,
					b = this.$video,
					c = b[0],
					d = c.videoHeight,
					e = c.videoWidth,
					f = a.height(),
					g = a.width();
				g / e > f / d
					? b.css({ width: g + 2, height: "auto" })
					: b.css({ width: "auto", height: f + 2 });
			}
		}),
		(e.prototype.destroy = function () {
			delete a[f].lookup[this.index],
				this.$video && this.$video.off(f),
				this.$element.off(f).removeData(f),
				this.$wrapper.remove();
		}),
		(a[f] = { lookup: [] }),
		(a.fn[f] = function (b, c) {
			var d;
			return (
				this.each(function () {
					(d = a.data(this, f)),
						d && d.destroy(),
						(d = new e(this, b, c)),
						(d.index = a[f].lookup.push(d) - 1),
						a.data(this, f, d);
				}),
				this
			);
		}),
		a(document).ready(function () {
			var b = a(window);
			b.on("resize.vide", function () {
				for (var b, c = a[f].lookup.length, d = 0; d < c; d++)
					(b = a[f].lookup[d]), b && b.settings.resizing && b.resize();
			}),
				b.on("unload.vide", function () {
					return !1;
				}),
				a(document)
					.find("[data-vide-bg]")
					.each(function (b, c) {
						var d = a(c),
							e = d.data("vide-options"),
							g = d.data("vide-bg");
						d[f](g, e);
					});
		});
});
