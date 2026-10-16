const viewer=document.querySelector('#image-viewer');
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{const image=viewer.querySelector('img');image.src=button.dataset.image;image.alt=button.querySelector('img').alt;viewer.showModal()}));
viewer.querySelector('button').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close()});

const guide=document.querySelector('#install-guide');
if(guide){const retry=guide.querySelector('.guide-retry');document.querySelectorAll('a.download[href*="/releases/download/"]').forEach(link=>link.addEventListener('click',()=>{retry.href=link.href;if(!guide.open)guide.showModal()}));guide.querySelector('.guide-close').addEventListener('click',()=>guide.close());guide.addEventListener('click',event=>{if(event.target===guide)guide.close()})}
