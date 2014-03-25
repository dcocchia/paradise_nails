(function() {

	var PN = function() {
		var self = this,
			windowHeight = $(window).height(),
			windowWidth = $(window).width(),

			findCommonElems = function() {
				self.commonElms.$window = $(window);
				self.commonElms.$nav = $(".nav");
				self.commonElms.$home = $("#home");
				self.commonElms.$header = $(".header");
				self.commonElms.$heroWrapper = $(".heroWrapper");
				self.commonElms.$hero = $(".hero");
				self.commonElms.$about = $("#about");
				self.commonElms.$services = $("#services");
				self.commonElms.$products = $("#products");
				self.commonElms.$salon = $("#salon");
				self.commonElms.$contact = $("#contact");
				self.commonElms.$reviews = $(".reviewsWrapper");
			},

			_nav = function() {
				var navSelf = this
					isShowing = false,
					

				this.init = function() {
					navSelf.bindScrollToNav();
				};

				this.bindScrollToNav = function() {
					var check = _.throttle(navSelf.checkForNavChange, 100); 
					self.commonElms.$window.scroll(check);
				};

				this.checkForNavChange = function() {
					var top = (document.documentElement && document.documentElement.scrollTop) || 
              document.body.scrollTop;

					if (!isShowing && top > (windowHeight - 85) ) {
						isShowing = true;
						navSelf.show();
					} else if (isShowing && top <= (windowHeight - 85) ) {
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

			_yelpHelper = function() {
				var yelpSelf = this;

				this.reviews = [
					{
						excerpt: "I gave this restaurant two stars just because of the extremely quick delivery and friendly delivery guy, but the food was nothing I would order again....",
						id: "-RDZxLTUExM9Q02x4hZmHg",
						rating: 2,
						rating_image_large_url: "http://media2.ak.yelpcdn.com/static/20101216220207235/img/ico/stars/stars_large_2.png",
						rating_image_small_url: "http://media4.ak.yelpcdn.com/static/201012164278297776/img/ico/stars/stars_small_2.png",
						rating_image_url: "http://media4.ak.yelpcdn.com/static/201012163489049252/img/ico/stars/stars_2.png",
						time_created: 1317939620,
						user: {
							id: "AUEDVbP9XNlOcgYOAfR8yg",
							image_url: "http://s3-media2.ak.yelpcdn.com/photo/0CX0RSoz8NkPlOTo7Ckqdg/ms.jpg",
							name: "Holly E."
						}
					}
				];

				this.getReviews = function() {
					$.ajax({
						url: "http://api.yelp.com/v2/business/paradise-nails-dana-point-2",
						data: {
							oauth_consumer_key: "eUk__LPEyKftR8flZcNQZg",
							oauth_token: "_A2ym2xHXh7VGAHsRPoHSRuml4XjsWTc",
							oauth_signature_method: "hmac-sha1"
							// oauth_signature:
							// oauth_timestamp:
							// oauth_nonce:
						},
						success: function (data){
							yelpSelf.reviews = data.reviews;
							yelpSelf.showReviews();
						},
						error: function(a, b, c) {
							console.warn("ERROR: yelpHelper.getReviews(): ", a, b, c);
						}

					});
				};

				this.buildReviewElement = function() {
					var	i = 0,
						reviewsLen = yelpSelf.reviews.length,
						renderedTpl = "",
						thisReview, thisUser, template;

						for (; i < reviewsLen; i += 1) {
							thisReview = yelpSelf.reviews[i];
							thisUser = thisReview.user;

							template = "<div class='reviewWrapper'><p class='viewOnYelp'>View on <a href='http://www.yelp.com/biz/paradise-nails-dana-point-2?hrid=" + thisReview.id + "' target='_blank'>Yelp.com</a></p><div class='yelpUser'><p class='name'><a href='http://www.yelp.com/user_details?userid=" + thisUser.id + "' target='_blank'>" + thisUser.name + "</a></p><div class='userImg'><img src='" + thisUser.image_url + "' /></div></div><div class='reviewRating'>" + thisReview.rating + "/5</div><p class='reviewTxt'>" + thisReview.excerpt + "</p></div>";

							 renderedTpl += template;
						}

						return renderedTpl;
				};

				this.showReviews = function() {
					var html = yelpSelf.buildReviewElement();
					self.commonElms.$reviews.html(html);
				};
			};

			_validator = function($contact) {
				var validatorSelf = this,
					$name = self.contactForm.$name;
					$email = self.contactForm.$email;
					$subject = self.contactForm.$subject;
					$body = self.contactForm.$body;

				this.validateInput = function(content, type) {
					var valid = true;

					if (content !== "" && content !== undefined && content !== null) {
						switch(type) {
							case "email":
								var re = /\S+@\S+\.\S+/; //very simple email validation
								valid = re.test(content);
								break;
							default:
								break;
						}
					} else {
						valid = false;
					}

					return valid;
				};

				this.validateForm = function() {
					var valid = true;

					if (!validatorSelf.validateInput($name.val())) {
						validatorSelf.markInputError($name);
						valid = false;
					} else {
						validatorSelf.clearInputError($name);
					}

					if (!validatorSelf.validateInput($email.val(), "email")) {
						validatorSelf.markInputError($email);
						valid = false;
					} else {
						validatorSelf.clearInputError($email);
					}

					if (!validatorSelf.validateInput($subject.val())) {
						validatorSelf.markInputError($subject);
						valid = false;
					} else {
						validatorSelf.clearInputError($subject);
					}

					if (!validatorSelf.validateInput($body.val())) {
						validatorSelf.markInputError($body);
						valid = false;
					} else {
						validatorSelf.clearInputError($body);
					}

					if (valid === true){
						validatorSelf.clearAllInputErrors();
					}

					return valid;
				};

				this.markInputError = function($input) {
					$input.addClass("error");
				};

				this.clearInputError = function($input) {
					$input.removeClass("error");
				};

				this.clearAllInputErrors = function($input) {
					$contact.find(".input").removeClass("error");
				};
				
			};

			_contactForm = function($contact) {
				var formSelf = this;

				this.$name = $contact.find("[name='name']");
				this.$email = $contact.find("[name='email']");
				this.$subject = $contact.find("[name='subject']");
				this.$body = $contact.find("[name='body']");

				this.submitContactForm = function(e) {
					var $form = self.commonElms.$contact.find("form");
					
					if (e && e.preventDefault) { e.preventDefault(); }

					if (self.validator.validateForm()) {
						$.ajax({
							url: "",
							data: {
								name: formSelf.$name.val(),
								email: formSelf.$email.val(),
								subject: formSelf.$subject.val(),
								body: formSelf.$body.val()
							},
							success: function(data) {
								$form.html("<h3>Thank you!</h3><p>Your message has been delivered. We'll get back to you as soon we can.</p>")
							},
							error: function(a,b,c) {
								$form.html("<h3>Uh oh!</h3><p>It looks like there was a problem sending your message. Please try again later or give us a call!</p>").addClass("error");
								console.warn("ERROR submitContactForm(): ", a, b, c);
							}
						});
					}
				}
			};

		this.commonElms = {};

		this.init = function() {
			findCommonElems();

			self.bindWindowSize();

			self.startSmoothScroll();

			self.hero = new _hero();
			self.hero.init();

			self.nav = new _nav();
			self.nav.init();

			this.contactForm = new _contactForm(self.commonElms.$contact);

			self.validator = new _validator(self.commonElms.$contact);

			self.bindClickEvents();

			self.intiSkrollr();

			self.yelpHelper = new _yelpHelper();
			//self.yelpHelper.getReviews();
			self.yelpHelper.showReviews();
			
		};

		this.intiSkrollr = function() {
			var s = skrollr.init();
		};

		this.bindClickEvents = function() {
			//learn more btn
			this.commonElms.$heroWrapper.find("#learnMore").click(self.navClick);
			//home logo
			this.commonElms.$header.find("#logo").click(self.navClick);
			//nav buttons
			this.commonElms.$nav.find(".navBtn").click(self.navClick);

			this.commonElms.$contact.find(".submitContactBtn").click(self.contactForm.submitContactForm);
		};

		this.setWindowSize = function() {
			windowHeight = self.commonElms.$window.height();
			windowWidth = self.commonElms.$window.width();
			self.hero.setHeight();
		};

		this.bindWindowSize = function() {
			var check = _.debounce(self.setWindowSize, 300); 
			self.commonElms.$window.resize(check);
			if (window.addEventListener) {
				window.addEventListener('orientationchange', check);
			} else {
				window.attachEvent('orientationchange', check);
			}
		};

		this.navClick = function(e) {
			e.preventDefault();

			var target = e.currentTarget,
				slideTo = $(target).attr("data-slide-to");

			self.slideTo(slideTo);
		};

		this.slideTo = function(sectionName) {
			var $section = this.commonElms["$" + sectionName],
				position, top;

			if ($section) {
				top = $section.position().top;
				position = (top && top - 80 >= 0) ? top - 80 : 0;

				$.scrollTo(position, 800, function() {
					$section.addClass("reveal");
				});
				this.setHash(sectionName);
			}

		};

		this.setHash = function(hashName) {
			window.location.hash = (hashName && hashName.toLowerCase) ? hashName.toLowerCase() : "";
		};

		this.startSmoothScroll = function() {
			$.srSmoothscroll();
		};

	};

	$(document).ready(function() {
		//init on DOM ready
		pn = new PN();
		pn.init();
	});

})();
