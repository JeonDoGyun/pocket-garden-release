const viewer=document.querySelector('#image-viewer');
document.querySelectorAll('[data-image]').forEach(button=>button.addEventListener('click',()=>{const image=viewer.querySelector('img');image.src=button.dataset.image;image.alt=button.querySelector('img').alt;viewer.showModal()}));
viewer.querySelector('button').addEventListener('click',()=>viewer.close());
viewer.addEventListener('click',event=>{if(event.target===viewer)viewer.close()});
