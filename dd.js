'use strict';
/////////////////////////////////////////////////////////////////////////

//Form Data
const form = document.forms[0];
const storagedata=[];

// console.log(form);
// console.log(formdata);

form.addEventListener("submit", function(event) {
    event.preventDefault();
    //   getLocalStorage();
    
    const dataArr =[...new FormData(this)];
    console.log(dataArr);
    
    const data = Object.fromEntries(dataArr);
    console.log(data);
    // console.log(data.title);
    
    const tasklist= document.getElementById("task").value;
    
    const task={
        title:data.title,
        description:data.description,
        color:data.color,
        tasklist:tasklist
    };
    
    storagedata.push(task);
    console.log(storagedata);
    console.log(task);
    console.log(task.tasklist);
  
    setLocalStorage();



    if(task.tasklist=="divc1")
    {
        const formdata=document.querySelector('#divc1');
        render(task,formdata);
    }
    else if(task.tasklist=="divc2")
    {
        const formdata=document.querySelector('#divc2');
        render(task,formdata);
    }
    else if(task.tasklist=="divc3")
    {
        const formdata=document.querySelector('#divc3');
        render(task,formdata);
    }
    else
    {console.log("fail");}





    // render(task);
    divcount();
  
    modal.classList.add('hidden');
    overlay.classList.add('hidden');

    document.getElementById('titleL').value=document.getElementById('descriptionL').value='';

});



function render(task,divclass) {
    // console.log(typeof (divclass));
    // getLocalStorage();
    divcount();
    // <div id="box-' + i + '"></div> ----> unique id
    const mark=`
        <article class="card" draggable="true" ondragstart="drag(event)" data-id="${task.title}" style="border: 3px solid ${task.color};
        border-left: 10px solid ${task.color};">
            <h3>${task.title}</h3>
            <h1>${task.description}</h1>
        </article>`;

    divclass.insertAdjacentHTML('afterbegin', mark);
    //formdata.innerHTML= mark;
}



// const findca= document.querySelector('.card');
// findca.addEventListener('click',function(e){
//     console.log(e.target);
// });



function setLocalStorage() {
    // let storagedata;
    // for (let i = 0; i < storagedata; i++) {
    //     storagedata = storagedata.key(i);
    //     console.log(`Item at ${i}: ${storagedata}`);
    // }
    console.log("data",storagedata);
    localStorage.setItem('storagedata', JSON.stringify(storagedata));
}

// function getLocalStorage() {
//     let sd = localStorage.getItem("storagedata");
//     let data = JSON.parse(sd);
//     render(data);
// }



function getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("storagedata"));
    // console.log(data);

    if (!data) return;
    // let storagedata = data;
    
    data.forEach(work => {
        storagedata.push(work);
        // render(work,work.tasklist);
        
        if(work.tasklist=="divc1")
        {
            const formdata=document.querySelector('#divc1');
            render(work,formdata);
        }
        else if(work.tasklist=="divc2")
        {
            const formdata=document.querySelector('#divc2');
            render(work,formdata);
        }
        else if(work.tasklist=="divc3")
        {
            const formdata=document.querySelector('#divc3');
            render(work,formdata);
        }
        else
        {console.log("fail")};
    });
}



function init() {
    getLocalStorage();
    divcount();
}
init();



function divcount(a=0){

    let divcount=document.getElementById("divc1").childElementCount
    let divcount2=document.getElementById("divc2").childElementCount
    let divcount3=document.getElementById("divc3").childElementCount
    
    // console.log(divcount);
    if(divcount>0){   
        divcount=document.getElementById("divc1").childElementCount
        document.getElementById("divCount").innerHTML = divcount+(a);

        // console.log(divcount);
      
        divcount2=document.getElementById("divc2").childElementCount
        document.getElementById("divCount2").innerHTML = divcount2+(0);

        divcount3=document.getElementById("divc3").childElementCount
        document.getElementById("divCount3").innerHTML = divcount3+(0);
    }
}
/////////////////////////////////////////////////////////////////////////






/////////////////////////////////////////////////////////////////////////
//Modal Window
const modal= document.querySelector('.modal');
const overlay=document.querySelector('.overlay');
const btnCloseModal=document.querySelector('.close-modal');
const btnOpenModal=document.querySelector('.show-modal');


btnOpenModal.addEventListener('click',function(){
    console.log('Button Clicked');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
});

btnCloseModal.addEventListener('click',function(){
    console.log('Button closed');
    
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
});
overlay.addEventListener('click',function(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
});

document.addEventListener('keydown',function(e){
    if(e.key==='Escape' && !modal.classList.contains('hidden')){
        modal.classList.add('hidden');
        overlay.classList.add('hidden');
    }
})
/////////////////////////////////////////////////////////////////////////







/////////////////////////////////////////////////////////////////////////
// drag and drop js
const dragStart = target => {
    target.classList.add('dragging');
    // console.log('dragStart');
};

const dragEnd = target => {
    target.classList.remove('dragging');
    // console.log('dragEnd');
    
};

const dragEnter = event => {
    // console.log('dragEnter');
    event.currentTarget.classList.add('drop');
    divcount();
};

const dragLeave = event => {
    // console.log('dragLeave');
    event.currentTarget.classList.remove('drop');
    divcount(-1);
};

const drag = event => {
    event.dataTransfer.setData('text/html', event.currentTarget.outerHTML);
    event.dataTransfer.setData('text/plain', event.currentTarget.dataset.id);
    ////////////////////////////////////
    // console.log(event.currentTarget.outerHTML);
    // console.log(event.currentTarget.dataset.id);
    ////////////////////////////////////
    // console.log('drag');
};

const drop = event => {
    // alert('id');
    document.querySelectorAll('.column').forEach(column => column.classList.remove('drop'));
    document.querySelector(`[data-id="${event.dataTransfer.getData('text/plain')}"]`).remove();

    // get card id ////////////////////////////////
    const id = (`${event.dataTransfer.getData('text/plain')}`);
    console.log(id);
    ///////////////////////////////////////////////

    // console.log(event.target);
    const dropid=event.target.lastElementChild.id;
    console.log(dropid);

    console.log(storagedata);

    storagedata.forEach((arrow,i)=>{
        // console.log(arrow);
        if(id == arrow.title){
            // console.log(arrow);
            // arrow.tasklist=dropid;
            
            storagedata.splice(storagedata[i],1);
            let dropdata={
                title:arrow.title,
                description:arrow.description,
                color:arrow.color,
                tasklist:arrow.tasklist
            }
            dropdata.tasklist=dropid;
            console.log(dropdata);
            // storagedata.pop(arrow.tasklist);
            storagedata.push(dropdata);
            console.log(storagedata);
            // console.log("i",i);
            
            
            // window.localStorage.removeItem(`${arrow.title}`);
            setLocalStorage();
        }
    });

    
    event.preventDefault();
    event.currentTarget.innerHTML = event.currentTarget.innerHTML + event.dataTransfer.getData('text/html');
    // console.log('drop');
};

const allowDrop = event => {
    event.preventDefault();
    // console.log('allowDrop');
};

document.querySelectorAll('.column').forEach(column => {
    column.addEventListener('dragenter', dragEnter);
    column.addEventListener('dragleave', dragLeave);
    // console.log('---column');
});

document.addEventListener('dragstart', e => {
    if (e.target.className.includes('card')) {
        dragStart(e.target);
    }
    // console.log('---dragstart');
    // console.log(e.target.parentElement);
});

document.addEventListener('dragend', e => {
    if (e.target.className.includes('card')) {
        dragEnd(e.target);
    }
});
/////////////////////////////////////////////////////////////////////////