
var mylocalstorage=[]

var padContant
var addto

//בפתיחת הדף טען מסימות קימות
addEventListener("load", loadTasks)
function loadTasks()
{
    if(localStorage["notepad"] !== "null")
    {
        mylocalstorage=JSON.parse(localStorage["notepad"])
        for(i = 0; i < mylocalstorage.length; i++)
        {
            var singlePadTxt = mylocalstorage[i]
                   
                var padDiv = document.createElement("div")
                var padTextearea = document.createElement("textarea")
                var padSpan = document.createElement("span")
                
                padTextearea.setAttribute("class","padTextearea")
                padTextearea.innerHTML = singlePadTxt
                padDiv.addEventListener("mouseover", addx)
                padDiv.appendChild(padSpan)
                padDiv.appendChild(padTextearea)
                
                document.getElementById("pads").appendChild(padDiv)                     
        }       
    }
}


document.getElementById("submit").addEventListener("click", newNote)

function newNote()
{   
    //אם מילאת הכל המשך
    if(document.getElementById("textarea").value !== "" && document.getElementById("date").value !== "")
         {   
             //  פתיחת קובץ במחשב(לוקאל [נוטפאד]) כדי שיווצר קובץ כזה בלוקאל ונוכל לישמור אליו
            localStorage.setItem("notepad",JSON.stringify( mylocalstorage))

           if(localStorage["notepad"] !== "null")
            {
                //לקיחת הנתונים מלוקאל כדי שמאוחר יותר נוכל להכניס בפוש את הפאד החדש
                mylocalstorage=JSON.parse(localStorage["notepad"])
            }    
                //מחיקת האזהרה של "לא מילאת הכל" אם היתה אזהרה 
                document.getElementById("warning").innerHTML=null
                //יצירת הפאד
                var padDiv = document.createElement("div")
                var padTextearea = document.createElement("textarea")
                var padSpan = document.createElement("span")
                
                padTextearea.setAttribute("class","padTextearea")
                padTextearea.innerHTML =  document.getElementById("textarea").value+ "\n" + "\n" +"date:"+document.getElementById("date").value
                padDiv.addEventListener("mouseover", addx)
                padDiv.appendChild(padSpan)
                padDiv.appendChild(padTextearea)
                document.getElementById("pads").appendChild(padDiv)
                
                 // שמירת הכיתוב של הפאד ללוכאל
                var singlePadTxt = padTextearea.innerHTML
                mylocalstorage.push(singlePadTxt)
                localStorage.setItem("notepad",JSON.stringify( mylocalstorage))
                
                //עידכון הוואר לאחר הוספת פאד בשביל אפשרות מחיקה מיידית               
                mylocalstorage=JSON.parse(localStorage["notepad"])
               
                //מחיקה וחידוש אזור הכתיבה
                document.getElementById("textarea").value=""
                document.getElementById("date").value=""
                                              
        }
        else
        {
            //אם לא מילאת הכל לא תוכל להמשיך
             var warning1 = document.createElement("h5")
             warning1.innerHTML="Please fill all fields"
           
             document.getElementById("warning").appendChild(warning1)
             alert("Please fill all fields")
        }
}

  function addx()
                            {
                                //הוספת אייקון מבוטסטראפ ושמירת הפאד המסויים שהועבר עליו העכבר
                                addto=this  
                                var c= this.childNodes
                                padContant = this.childNodes[1].innerHTML   
                                var padSpan= c[0]
                                
                                padSpan.setAttribute("class", "glyphicon glyphicon-remove")
                               //הוספת פונקציה למחיקת הפאד מהדף ומהלוקאל
                                padSpan.addEventListener("click", deletefromlocal) 
                            }
                           
                            //מחיקת הפאד מהדף ומהלוקאל 
                            function deletefromlocal()
                            {  
                                   //אזהרה לפני מחיקה
                                   if (confirm("Are you sure you want to delete this task"))
                                   {
                                         for(i=0;i<mylocalstorage.length;i++)
                                        {
                                            
                                            if(JSON.stringify( mylocalstorage[i])===JSON.stringify( padContant))
                                            {
                                              mylocalstorage.splice(i, 1);
                                            }
                                            localStorage["notepad"]=JSON.stringify( mylocalstorage)
                                        }
                                        //מחיקת כל הפאדים והוספתם מחדש בכדי שלא יווצרו חורים בדף
                                        document.getElementById("pads").innerHTML=null
                                        loadTasks()
                                    }   
                                }    




