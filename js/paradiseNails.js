(function() {

	var PN = function() {
		var self = this,
			findCommonElems = function() {
				self.commonElms.$nav = $(".nav");
			},

			_nav = function() {
				this.markAllLinksUnActive = function() {
					self.commonElms.$nav.find(".navLink").removeClass("active");
				}

				this.markLinkActive = function(id) {
					this.markAllLinksUnActive();
					self.commonElms.$nav.find("#" + id).addClass("active");
				}

				this.show = function() {
					self.commonElms.$nav.addClass("show");
				}

				this.hide = function() {
					self.commonElms.$nav.removeClass("show");
				}
			};

		this.commonElms = {};

		this.init = function() {
			findCommonElems();
			self.nav = new _nav();
		}


	};

	$(document).ready(function() {
		//init on DOM ready
		pn = new PN();
		pn.init();
	});

})();
