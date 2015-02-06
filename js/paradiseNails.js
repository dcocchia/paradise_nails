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
				self.commonElms.$contact = $("#contact");
				self.commonElms.$reviews = $(".reviewsWrapper");
				self.commonElms.$reviewsHeader = $("#reviewsHeader");
				self.commonElms.$productGallery = $(".productGallery");
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
					heroLength = 6,
					heroNameArr = ["one", "two", "three", "four", "five", "six"];

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
				var yelpSelf = this,
					timer,
					currentReview = 1,
					reviewsLength = 5,
					reviewsNameArr = ["one", "two", "three", "four", "five"];

				this.init = function() {
					//yelpSelf.getReviews(); this will do everything once ajax call works
					yelpSelf.randomizeReviews();
					yelpSelf.buildReviewElement();
					yelpSelf.buildIndicators();
					yelpSelf.bindIndicatorClick();
					yelpSelf.showReviews();
					yelpSelf.startAutoScroll();
				};

				this.reviews = [
					{
						excerpt: "Great service!! I will definitely come back.  I messed up a nail getting into my car and came back inside to see if they could fix it. No problem, they were really nice about it.",
						id: "0PLeunZMD6d9Tij0rPFjKw",
						rating: 5,
						time_created: "4/4/2013",
						user: {
							id: "U2W1WQeuzbIRq7F9a3Ox5w",
							image_url: "http://s3-media1.ak.yelpcdn.com/photo/TZeyUvRpOav6nLdNWVhx5Q/ms.jpg",
							name: "Liza F."
						}
					},
					{
						excerpt: "Paradise nails was phenomenal!! The service exceeded all my expectations and by far has been the best mani/pedi I've ever had. They have a great selection of colors and gels. Pricing was by far the best I've seen from New York to California. This will be my regular place and the place I take all my friends.",
						id: "gE1bAJcMp3MnyQlqJYNKqA",
						rating: 5,
						time_created: "1/5/2013",
						user: {
							id: "Y10TYXFSPu0SV3RpsiLYDA",
							image_url: "http://s3-media4.ak.yelpcdn.com/photo/YYl35X8s2gkrbXCPw-VHFw/ms.jpg",
							name: "Yolanda H."
						}
					},
					{
						excerpt: "Love this salon! The ladies there are so sweet and very helpful. Their prices are great, plus they offer all organic mani and pedi products for an extra cost. Love love love this place!",
						id: "NvMFZajDWoI9t2u3CBsTzg",
						rating: 5,
						time_created: "2/9/2013",
						user: {
							id: "DrKxdCfZJJYSif2-NCLmcQ",
							image_url: "http://s3-media3.ak.yelpcdn.com/photo/3Wl70F2TZEZZ8agzXIKgig/60s.jpg",
							name: "Shahnaz G."
						}
					},
					{
						excerpt: "Fabulous atmosphere, great staff.  Went once and had a great basic pedi, went a second time and treated myself to a pricier pedi.  Love the huge selection of nail colors.   Definitely worth the wait (if there's one) and price.",
						id: "QhFz9PXxs7IlOYFunOUHOw",
						rating: 5,
						time_created: "3/10/2014",
						user: {
							id: "MyBboQtdR_7yl8LIBuqWxQ",
							image_url: "http://s3-media2.ak.yelpcdn.com/photo/q4fpmnMUe0kgikX40PV36g/ms.jpg",
							name: "S.R. L."
						}
					},
					{
						excerpt: "Exceptional quality. Totally relaxing hot stone massage and hot wax manicure for a very affordable price. Revitalizing!",
						id: "Mm93fVJCw-72YzU5M89GRg",
						rating: 5,
						time_created: "7/18/2012",
						user: {
							id: "_0rx8Pt081jX4zWWI8tf6w",
							image_url: "http://s3-media2.ak.yelpcdn.com/photo/S8sWHhpeOuuox3zjRwLx_w/60s.jpg",
							name: "Erin M."
						}
					}
				];

				this.randomizeReviews = function() {
					var reivewsLen = yelpSelf.reviews.length,
						i = reivewsLen - 1,
						temp, j;

					for (; i > 0; i--) {
						j = Math.floor(Math.random() * (i + 1));
						temp = yelpSelf.reviews[i];
						yelpSelf.reviews[i] = yelpSelf.reviews[j];
						yelpSelf.reviews[j] = temp;
					}

				};

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
							yelpHelper.startAutoScroll();
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
						thisReview, thisUser, template, indexClass;

						for (; i < reviewsLen; i += 1) {
							thisReview = yelpSelf.reviews[i];
							thisUser = thisReview.user;
							indexClass = reviewsNameArr[i];
							show = (i === 0) ? "show" : "";

							template = "<div class='reviewWrapper " + indexClass + " " + show + "'><p class='viewOnYelp'>View on <a href='http://www.yelp.com/biz/paradise-nails-dana-point-2?hrid=" + thisReview.id + "' target='_blank'>Yelp.com</a></p><div class='yelpUser'><p class='name'><a href='http://www.yelp.com/user_details?userid=" + thisUser.id + "' target='_blank'>" + thisUser.name + "</a></p><div class='userImg'><img src='" + thisUser.image_url + "' /></div></div><div class='reviewRating'>" + thisReview.rating + "/5</div><p class='reviewTxt'>" + thisReview.excerpt + "</p></div>";

							 renderedTpl += template;
						}

						return renderedTpl;
				};

				this.buildIndicators = function() {
					var i = 0,
						reviewsLen = yelpSelf.reviews.length,
						$indicatorsWrapper = self.commonElms.$reviews.find(".indicators"),
						indicatorTpl, activeClass;

					for (; i < reviewsLen; i += 1) {
						activeClass = (i === 0) ? "active" : "";
						indexClass = reviewsNameArr[i];
						indicatorTpl  = "<span class='indicator " + activeClass + " " + indexClass + "' data-index='" + i + "'></span>";

						$indicatorsWrapper.append(indicatorTpl);
					}
				};

				this.setIndicatorActive = function(indexClass) {
					self.commonElms.$reviews.find(".indicator").filter("." + indexClass).addClass("active");
				};

				this.toggleActiveIndicator = function (indexClass) {
					self.commonElms.$reviews.find(".indicator").removeClass("active").filter("." + indexClass).addClass("active");
				}

				this.setAllIndicatorsInActive = function() {
					self.commonElms.$reviews.find(".indicator").removeClass("active");
				};

				this.showReviews = function() {
					var html = yelpSelf.buildReviewElement();
					self.commonElms.$reviews.prepend(html);
				};

				this.startAutoScroll = function() {
					timer = setInterval(yelpSelf.scrollNext, 5000);
				};

				this.stopAutoScroll = function() {
					clearInterval(timer);
				};

				this.scrollNext = function() {
					if (currentReview < reviewsLength) {
						currentReview += 1;
						yelpSelf.hideReview(reviewsNameArr[currentReview - 2]);
					} else {
						yelpSelf.hideReview(reviewsNameArr[currentReview - 1]);
						currentReview = 1;
					}

					yelpSelf.toggleActiveIndicator(reviewsNameArr[currentReview - 1]);
					yelpSelf.showReview(reviewsNameArr[currentReview - 1]);
				};

				this.showReview = function(classIndex) {
					self.commonElms.$reviews.find(".reviewWrapper." + classIndex).addClass("show");
				};

				this.hideReview = function(classIndex) {
					self.commonElms.$reviews.find(".reviewWrapper." + classIndex).removeClass("show");
				};

				this.hideAllReviews = function() {
					self.commonElms.$reviews.find(".reviewWrapper").removeClass("show");
				}

				this.toggleReview = function(classIndex) {
					self.commonElms.$reviews.find(".reviewWrapper").removeClass("show").filter("." + classIndex).addClass("show");
				};

				this.scrollTo = function(classIndex) {
					yelpSelf.toggleReview(classIndex);
					yelpSelf.toggleActiveIndicator(classIndex);
					currentReview = _.indexOf(reviewsNameArr, classIndex) + 1;
				};

				this.onIndicatorClick = function(e) {
					e.preventDefault();

					var target = e.currentTarget,
						$target = $(target),
						index = parseInt($target.attr("data-index")),
						classIndex = reviewsNameArr[index];

					yelpSelf.scrollTo(classIndex);
				};

				this.bindIndicatorClick = function() {
					self.commonElms.$reviews.find(".indicator").off().click(yelpSelf.onIndicatorClick);
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

			_productGallery = function() {
				var gallerySelf = this,
					$galNav = self.commonElms.$productGallery.find(".galNav"),
					$btns = $galNav.find(".galNavBtn"),
					$panelWrapper = self.commonElms.$productGallery.find(".panelWrapper");

					this.init = function() {
						gallerySelf.bindGalNavBtns();
					};

					this.bindGalNavBtns = function() {
						$btns.click(gallerySelf.onGalNavBtnClick);
					};

					this.onGalNavBtnClick = function(e) {
						e.preventDefault();

						var target = e.currentTarget,
							$target = $(target),
							panelName = $target.attr('data-panel-name');

						gallerySelf.togglePanel(panelName);
						gallerySelf.toggleNavBtnActive(panelName);
					};

					this.showPanel = function(panelName) {
						$panelWrapper.find(".panel").filter("[data-name='" + panelName + "']").removeClass("hidden");
					};

					this.hidePandel = function(panelName) {
						$panelWrapper.find(".panel").filter("[data-name='" + panelName + "']").addClass("hidden");
					};

					this.hideAllPanels = function() {
						$panelWrapper.find(".panel").addClass("hidden");
					};

					this.togglePanel = function(panelName) {
						$panelWrapper.find(".panel").addClass("hidden").filter("[data-name='" + panelName + "']").removeClass("hidden");
					};

					this.setNavBtnActive = function($btn) {
						$btn.addClass("active");
					};

					this.setNavBtnInActive = function($btn) {
						$btn.removeClass("active");
					};

					this.setAllNavBtnsInActive = function() {
						$btns.removeClass("active");
					};

					this.toggleNavBtnActive = function(panelName) {
						$btns.removeClass("active").filter("[data-panel-name='" + panelName + "']").addClass("active");
					};
			};

			touchEnabled = function() {
				if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
					self.touchEnabled = true;
				} else {
					self.touchEnabled = false;
				}
			}();

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

			if (!self.touchEnabled) { self.intiSkrollr(); }

			self.yelpHelper = new _yelpHelper();
			self.yelpHelper.init();

			self.productGallery = new _productGallery();
			self.productGallery.init();
			
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
