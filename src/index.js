import _ from 'lodash';
import './style.css';
import {createNewgame,postNew} from "./modules/utils"
createNewgame()
const addItems=()=>{
const submit = document.querySelector(".form-submit")
submit.addEventListener("submit",(e)=>{
e.preventDefault()

const name = document.querySelector(".names").value
console.log(name)
const score = document.querySelector(".score").value
if(name !=="" && score){
  console.log(name)
  postNew(name,score)  
}
})}
addItems()


const get_scores= async()=>{
  const keys=localStorage.getItem("key");
  console.log(keys)
const data = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${keys}/scores/`)
const response=await data.json()

if(response){
  renderToDom(response.result)
}}
get_scores()


const scoresContainer=document.querySelector(".leaderboar-table")
const scorecontainer=document.querySelector(".leaderboard")
let ul = document.createElement("ul")
ul.classList.add("scores")
ul.innerHTML = ""
const renderToDom=(data)=>{
data.forEach((element)=>{
  const li=document.createElement("li")
  li.innerHTML=`${element.user} : ${element.score}`
   ul.append(li)
})
scorecontainer.append(ul)
}