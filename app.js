import { initializeApp  } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js'
import { getDatabase, ref, push, onValue, remove} from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js'

const appSettings ={
    databaseURL: "https://projest1-85093-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const listInDB = ref(database, "list")

const listInput = document.querySelector(".item-input")
const inputBtn = document.querySelector(".add-btn")
const listItems = document.querySelector(".list-items")

const temp = document.createElement('DIV')
temp.textContent="Oops It Seems To Be Empty...."
temp.style.color='#807f68'
temp.style.fontWeight=500

onValue(listInDB, function(snapshot){
    if(snapshot.exists())
    {
    let listDB = Object.entries(snapshot.val())
    listItems.innerHTML="";
    for (let i=0;i<listDB.length;i++){
        let item = document.createElement('DIV');
        item.classList.add('item')
        item.textContent=`${listDB[i][1]}`
        listItems.appendChild(item)
        item.addEventListener('click', () =>{
            let locationOfTheItem = ref(database, `list/${listDB[i][0]}`)
            remove(locationOfTheItem)
            if( listItems.childElementCount == 1 ) {temp.style.display='inline'}
            })
    }
    }
    else{
        listItems.innerHTML=''
        listItems.appendChild(temp)
    }
});

const addElement =()=>{
    temp.style.display='none'
    let inputval = listInput.value
    if(inputval.length>=20){
        inputval = inputval.substring(0, 20)
    }
    push(listInDB, inputval)
    listInput.value=''
}

inputBtn.addEventListener('click',addElement);

listInput.addEventListener("keyup", function(event){
    if (event.keyCode === 13){
        inputBtn.click();
    }
});
