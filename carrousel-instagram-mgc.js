const main = document.getElementById('main-app').innerHTML = `
<div class="gallery">
<div class="gallery-container" id="gallery-container1">
  <span data-index="1" class="gallery-item gallery-item-1">
   
  </span>
  <span data-index="2" class="gallery-item gallery-item-2">
    
  </span>
  <span data-index="2" class="gallery-item gallery-item-3">
   
  </span>
  <span data-index="4" class="gallery-item gallery-item-4">
   
  </span>
  <span data-index="5" class="gallery-item gallery-item-5">
 
  </span>
  <span data-index="6" class="gallery-item gallery-item-6">
   
  </span>
 
</div>

<div style= "text-align: center;">

<img class="carousel-ico" src="previous.png" id="ant">
<img class="carousel-ico" src="next.png" id="prox">
</div>
</div>
`


// _______Carousel__________________________
var galleryContainer = document.querySelector('.gallery-container');
var galleryControlsContainer = document.querySelector('.gallery-controls');
var galleryItems = document.querySelectorAll('.gallery-item');
var proxbtn = document.getElementById('prox');
var antbtn = document.getElementById('ant');
var igAccesstoken = 'IGQVJYdEhORGZAUU3paN3FXcUtVSFBrOFN1YzBqOHJYSmlUZAUt4OGw5bWRiS21YZAG9WRnctRnI5a3k5MGJyZA3hCZAUVJSUxFTkZAMQVYxMWQ2SDBpaFhzTjNMNnVNSWJsdE1Ndm1CaW9tZAGp3NmNYd052NwZDZD';

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }

  updateGallery() {
    this.carouselArray.forEach(el => {
      el.classList.remove('gallery-item-1');
      el.classList.remove('gallery-item-2');
      el.classList.remove('gallery-item-3');
      el.classList.remove('gallery-item-4');
      el.classList.remove('gallery-item-5');
    });

    this.carouselArray.slice(0, 5).forEach((el, i) => {
      el.classList.add(`gallery-item-${i+1}`);
    });
  }

  setCurrentState(direction) {
    if (direction == 'ant') {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    this.updateGallery();
  }


  setControls() {
    antbtn.addEventListener("click",()=>{
      this.carouselArray.unshift(this.carouselArray.pop());
      this.updateGallery();
    })

    proxbtn.addEventListener("click",()=>{
      this.carouselArray.push(this.carouselArray.shift());
      this.updateGallery();
    })
  }
 
    updateCarouselDom(){
    galleryContainer = document.querySelector('.gallery-container');
    galleryControlsContainer = document.querySelector('.gallery-controls');
    galleryItems = document.querySelectorAll('.gallery-item');
    }
}

if ( $('#instagram-feed1').length != 0 ) {
  var fields = 'id,media_type,media_url,thumbnail_url,timestamp,permalink,caption';
  var limit = 6; // Set a number of display items
  count = 1;
  $.ajax ( {
      url: 'https://graph.instagram.com/me/media?fields='+ fields +'&access_token='+ igAccesstoken +'&limit='+ limit,
      type: 'GET',
      success: function( response ) {
      
          for( var x in response.data ) {
              var link = response.data[x]['permalink'],
                  caption = response.data[x]['caption'],
                  image = response.data[x]['media_url'],
                  image_video = response.data[x]['thumbnail_url'],
                  html1 = '';
                  html = '';           
              if ( response.data[x]['media_type'] == 'VIDEO' ) {
                let fi = document.createElement("span");
                fi.innerHTML = `
                <a href="${link}" target="_blank">
                <span class="overlayZ"><p>Veja mais no Instagram!</p></span>
                </a>
                <img style="width:100%; border-radius:15%;" src="${image_video}" alt="">
                
                `;
                document.querySelector('.gallery-item-'+count).appendChild(fi);
              } else {
                let fi = document.createElement("span");
                fi.innerHTML = `
                <a href="${link}" target="_blank">
                <span class="overlayZ"><p>Abrir no Instagram!</p></span>
                </a>
                <img style="width:100%; border-radius:15%"  src="${image}" alt="">
                
                `;
                document.querySelector('.gallery-item-'+count).appendChild(fi);
              }
              count ++;
          }
          const exampleCarousel = new Carousel(galleryContainer, galleryItems);
          exampleCarousel.setControls();
      },
      error: function(data) {
          var html = '<div class="class-no-data">No Images Found</div>';
          $('#instagram-feed1').append(html);
          }
  });
}

