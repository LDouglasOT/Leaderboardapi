export const createNewgame=async() => {
    const New_game = {
        name: 'Luzinda games',
      };
      const key=localStorage.getItem("key");
      if(key){

        return key
      }
   const res = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(New_game),
      });
    const data = await res.json();
    localStorage.setItem("key",data.result.substr(14, 20))
    return result.substr(14, 20)
  }
 export const postNew=async(name,score)=>{
    const data={
    "user": name,
    "score": score
    }
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