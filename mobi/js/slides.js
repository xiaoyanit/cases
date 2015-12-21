// author: EC
// last modify: 2015-12-20 13:36

	var Slides = {
		index: document.querySelector('.ar_nav'), 
		secNum: 1, 
		cur: 0, 
		slideWrap: document.querySelector('.ar_wrap'), 
		slideBox: document.querySelector('.article'), 
		moreBtnClass: '.ar_more', 
		closeBtnClass: '.ar_full_close',
		secClass: '.ar_sec', 

		winWidth: document.documentElement.clientWidth, 
		winHeight: document.documentElement.clientHeight, 
		startPos: 0, 

		init: function(){
			var self = this, 
				indexString = '';

			self.slideBox.style.width = self.winWidth + 'px';
			self.slideWrap.style.width = self.winWidth * self.secNum + 'px';
			self.slideBox.style.height = self.slideWrap.style.height = self.winHeight + 'px';

			for(var i=0; i<self.secNum; i++){
				var secItem = document.querySelectorAll(self.secClass)[i];
				secItem.style.width = self.winWidth + 'px';
				secItem.style.height = self.winHeight + 'px';
			}

			for(var i=0; i<self.secNum; i++){
				indexString += '<li></li>';
			}

			self.index.innerHTML = indexString;
			self.index.childNodes[self.cur].setAttribute('class', 'cur');

			self.slideWrap.addEventListener('touchstart', function(e){
				self.startPos = e.changedTouches[0].clientX;

				self.slideWrap.addEventListener('touchmove', self.watch);
			});

			for(var i=0; i<document.querySelectorAll(self.moreBtnClass).length; i++){
				document.querySelectorAll(self.moreBtnClass)[i].addEventListener('click', function(){
					var id = this.getAttribute('data-id');
					self.floatToggle(id, 'open');
				});
				document.querySelectorAll(self.closeBtnClass)[i].addEventListener('click', function(){
					var id = this.getAttribute('data-id');
					self.floatToggle(id, 'close');
				});			}
		}, 

		watch: function(e){
			Slides.endPos = e.changedTouches[0].clientX;
			var posGap = Slides.endPos - Slides.startPos;
			
			if(Math.abs(posGap) > 50){
				Slides.pageMov(posGap);
				Slides.slideWrap.removeEventListener('touchmove', Slides.watch);
			}
		}, 

		pageMov: function(distance){
			var self = this, 
				indexLi = self.index.childNodes;

			if(distance>0){
				self.cur -= 1;
				if(self.cur < 0){
					self.cur = 0;
				}
			}else{
				self.cur += 1;
				if(self.cur > (self.secNum-1)){
					self.cur = self.secNum - 1;
				}
			}

			self.slideWrap.style.transform = 'translateX(-' + self.cur * self.winWidth + 'px)';
			self.slideWrap.style.webkitTransform = 'translateX(-' + self.cur * self.winWidth + 'px)';

			for(var i=0; i<indexLi.length; i++){
				if(i===self.cur){
					indexLi[i].setAttribute('class', 'cur');
				}else{
					indexLi[i].setAttribute('class', '');
				}
			}
		}, 

		floatToggle: function(id, action){
			var self = this;

			if(action === 'open'){
				document.getElementById(id).style.display = 'block';
				self.index.style.display = 'none';
				document.getElementById(id).setAttribute('class', 'ar_mask mask_show');
			}else if(action === 'close'){
				document.getElementById(id).setAttribute('class', 'ar_mask mask_hide');
				self.index.style.display = 'block';
				setTimeout(function(){
					document.getElementById(id).style.display = 'none';
				}, 200);
			}
		}
	};
