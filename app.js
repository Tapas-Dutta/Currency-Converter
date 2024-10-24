const url="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

// const image=document.querySelectorAll(".dropdown img");

// for(let select of dropdowns){
//     select.addEventListener("change",()=>{
//         const c=countryList[select.value];
//         if(select.name==="to"){
//             image[1].src=`https://flagsapi.com/${c}/flat/64.png`;
//         }else{
//             image[0].src=`https://flagsapi.com/${c}/flat/64.png`;
//         }
//     });
// }

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let link=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=link;
}
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal=="" || amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const URL=`${url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    console.log(response);
})