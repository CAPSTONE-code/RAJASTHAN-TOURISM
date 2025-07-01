

const  dialog=document.querySelector('.fact');
const showbutton=document.querySelector('.fact-button');
const wrapper=document.querySelector('.wrapper')

fetch('./facts.json').then(res => res.json()).then((data)=>{console.log(data)
    console.log
})



showbutton.addEventListener('click',()=>{
    dialog.showModal()
})

dialog.addEventListener('click',(e)=>{
    if(!wrapper.contains(e.target)){
        dialog.close()
    }
})


