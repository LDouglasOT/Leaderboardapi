import _ from 'lodash';
import './style.css';
import {createNewgame,postNew} from "./modules/utils"
createNewgame()
const addItems=()=>{
const submit = document.querySelector(".form-submit")
submit.addEventListener("submit",(e)=>{
e.preventDefault()

const name = document.querySelector(".names").value
const score = document.querySelector(".score").value
if(name !=="" && score){

  postNew(name,score)  
}
})}
addItems()


const get_scores= async()=>{
  const keys=localStorage.getItem("key");
const data = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${keys}/scores/`)
const response=await data.json()

if(response){
  renderToDom(response.result)
}}
get_scores()

const scorecontainer=document.querySelector(".leaderboard")
let ul = document.createElement("ul")
ul.classList.add("scores")

const renderToDom=(data)=>{
ul.innerHTML = ""
data.forEach((element)=>{
  const li=document.createElement("li")
  li.innerHTML=`${element.user} : ${element.score}`
   ul.append(li)
})
scorecontainer.append(ul)
}

const refresh=document.querySelector(".refresh")
refresh.addEventListener("click", () =>{
  get_scores()
})
