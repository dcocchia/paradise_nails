(function() {

	var PN = function() {
		var self = this,
			windowHeight = $(window).height(),
			windowWidth = $(window).width(),

			findCommonElems = function() {
				self.commonElms.$nav = $(".nav");
				self.commonElms.$header = $(".header");
				self.commonElms.$window = $(window);
				self.commonElms.$hero = $(".hero");
			},

			_nav = function() {
				var navSelf = this
					isShowing = false,
					

				this.init = function() {
					navSelf.bindScrollToNav();
				};

				this.bindScrollToNav = function() {
					var check = _.throttle(navSelf.checkForNavChange, 300); 
					self.commonElms.$window.scroll(check);
				};

				this.checkForNavChange = function() {
					var triggerPoint = 500; //100 px
					if (!isShowing && document.body.scrollTop > windowHeight) {
						isShowing = true;
						navSelf.show();
					} else if (isShowing && document.body.scrollTop <= windowHeight) {
						isShowing = false;
						navSelf.hide();
					}
				};

				this.markAllLinksInActive = function() {
					self.commonElms.$nav.find(".navLink").removeClass("active");
				};

				this.markLinkActive = function(id) {
					this.markAllLinksUnActive();
					self.commonElms.$nav.find("#" + id).addClass("active");
				};

				this.show = function() {
					self.commonElms.$header.addClass("show");
				};

				this.hide = function() {
					self.commonElms.$header.removeClass("show");
				};
			},

			_hero = function() {
				var heroSelf = this,
					timer,
					currentHero = 1,
					heroLength = 5,
					heroNameArr = ["one", "two", "three", "four", "five"];

				this.init = function() {
					heroSelf.setHeight();
					heroSelf.startAutoScroll();
				};

				this.startAutoScroll = function() {
					timer = setInterval(heroSelf.scrollNext, 3000);
				};

				this.stopAutoScroll = function() {
					clearInterval(timer);
				};

				this.scrollNext = function() {
					if (currentHero < heroLength) {
						currentHero += 1;
						self.commonElms.$hero.find("." + heroNameArr[currentHero - 2]).removeClass("show");
					} else {
						self.commonElms.$hero.find("." + heroNameArr[currentHero - 1]).removeClass("show");
						currentHero = 1;
					}

					self.commonElms.$hero.find("." + heroNameArr[currentHero - 1]).addClass("show");
				};

				this.setHeight = function() {
					self.commonElms.$hero.height(windowHeight + "px");
				};
			};

		this.commonElms = {};

		this.init = function() {
			findCommonElems();

			self.bindWindowSize();

			self.hero = new _hero();
			self.hero.init();

			self.nav = new _nav();
			self.nav.init();
			
		}

		this.setWindowHeight = function() {
			windowHeight = self.commonElms.$window.height();
			windowWidth = self.commonElms.$window.width();
			self.hero.setHeight();
		};

		this.bindWindowSize = function() {
			var check = _.debounce(self.setWindowHeight, 300); 
			self.commonElms.$window.resize(check);
			window.addEventListener('orientationchange', check);
		};

	};

	$(document).ready(function() {
		//init on DOM ready
		pn = new PN();
		pn.init();
	});

})();
