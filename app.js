document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});

const video1 = document.getElementById('projectVideo1')
const video2 = document.getElementById('projectVideo2')
const video3 = document.getElementById('projectVideo3')
const video4 = document.getElementById('projectVideo4')
const video5 = document.getElementById('projectVideo5')


const videoList = [video1, video2, video3, video4, video5];

videoList.forEach(function (video) {
  video.addEventListener("mouseover", function () {
    video.play()
  })

  video.addEventListener("mouseout", function () {
    video.pause()
  })


})



document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  document.getElementById('successMessage').style.display = 'block';

  this.reset();

  setTimeout(function () {
    document.getElementById('successMessage').style.display = 'none';
  }, 3000);

});






