import _ from 'lodash';
import './style.css';

class scores{
  constructor(Name,score) {
      this.Name=Name
      this.score=score
  }
}
const createNewgame=async() => {
  const New_game = {
      name: 'Luzinda games',
    };
    const key=localStorage.getItem("key");
    if(key){
        console.log(key)
      return key
    }
 const res = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(New_game),
    });
  console.log(res)
  const data = await res.json();
  console.log()
  localStorage.setItem("key",data.result.substr(14, 20))
  return result.substr(14, 20)
}


const superkey=createNewgame()

const postNew=async(name,score)=>{
  const data={
  "user": name,
  "score": score
  }
  console.log(data)
  const keys=localStorage.getItem("key");
  const res = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${keys}/scores/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  const response=await res.json();
  const li=document.createElement("li")
  li.innerHTML=`${name} : ${score}`
  const scores=document.querySelector(".scores").append(li)
  
}

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