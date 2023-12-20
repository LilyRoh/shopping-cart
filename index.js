import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://grocery-basket-da527-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)
    resetInputField()
})

onValue(shoppingListInDB, function(snapshot){
    // console.log(snapshot.val())
    if(snapshot.exists()){

        let shoppingArray = Object.entries(snapshot.val())
        clearShoppingList()
        // console.log(shoppingArray)
        for(let i = 0; i <shoppingArray.length; i++){

            let currentItem = shoppingArray[i]
            let currentItemId =currentItem[0]
            let currentItemValue = currentItem[1]
            appendToLi(currentItem)
    }
    }else{
        shoppingListEl.innerHTML = "No items here.."
    }
})

function clearShoppingList(){
    shoppingListEl.innerHTML = ""
}

function resetInputField(){
    inputFieldEl.value = ""
}


function appendToLi(item){
//     shoppingListEl.innerHTML += `<button><li>${item}</li></button>`
    let itemId = item[0]
    let itemVal = item[1]

    let newList = document.createElement("button", "li")

    newList.textContent = itemVal

    shoppingListEl.append(newList)

    newList.addEventListener("dblclick",function(){
        let delteListValue = ref(database,`shoppingList/${itemId}`)
        remove(delteListValue)
        
    })

}
