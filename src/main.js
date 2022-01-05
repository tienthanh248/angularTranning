const list_item = document.querySelectorAll('.menu-item') ;
console.log('okokokokokok');
alert('ojjsdjki')

Array.from(list_item).forEach((item,index)=>{
  item.onClick = (e)=>{
    let currMenu= document.querySelector('.menu-item.active');
    currMenu.classList.remove('active');
    item.classList.add('active');
  }
})
