    // array within object is used to smooth update in future...

// var state = {
//     taskList:[
//         {
//             imageurl: "",
//             taskTitle:"",
//             taskType:"",
//             taskDescription:"",
//     },
//      {
//             imageurl: "",
//             taskTitle:"",
//             taskType:"",
//             taskDescription:"",
//     },
//      {
//             imageurl: "",
//             taskTitle:"",
//             taskType:"",
//             taskDescription:"",
//     },
//      {
//             imageurl: "",
//             taskTitle:"",
//             taskType:"",gti 
//             taskDescription:"",
//     },
//      {
//             imageurl: "",
//             taskTitle:"",
//             taskType:"",
//             taskDescription:"",
//     },
// ]
// }


// this act as Back up storage
const state = {
    taskList: [],
};



 /**  two Dynamic features
      * task__contents
      * task__model__body 
 */

//DOM operations
const taskContents = document.querySelector(".task__contents");
const taskModal = document.querySelector(".task__model__body");

//  console.log(taskContets);
//  console.log(taskModal);


// Card template
// Back tick is used here (not single quote)



const htmlTaskContent = ({id, title, description, type, url}) => `
    <div class='col-md-6 col-lg-4 mt-3'  id=${id} key=${id}>
        <div class='card shadow task__card'>
            <div class='card-header d-flex gap-2 justify-content-end task__card__header'>
                <button type='button' class='btn btn-outline-info mr-2' name=${id} onclick="editTask.apply(this, arguments)">
                <i class='fas fa-pencil-alt name=${id}'></i></button>
                <button type='button' class='btn btn-outline-danger mr-2' name=${id} onclick="deleteTask.apply(this, arguments)">
                <i class='fas fa-trash-alt name=${id}'></i></button>
            </div>
            <div class='card-body'>
                ${
                    url ?
                     `<img src=${url} alt='card image' class='card-img-top md-3 rounded-md' />`
                     :
                     `<img src="https://tse3.mm.bing.net/th?id=OIP.FjLkalx51D8xJcpixUGJywHaE8&pid=Api&P=0&h=180" alt='card image class='card-img-top md-3 rounded-md' />`
                }
                <h4 class='card-title task__card__title'>${title}</h4>
                <p class='description trim-3-lines text-muted'>${description}</p>
                <div class='tags d-flex flex-wrap'>
                    <span class='badge text-white bg-primary m-1'>${type}</span>
                </div>
            </div>
           <div class='card-footer'>
                <button type='button' class='btn btn-outline-primary float-end' data-bs-toggle="modal" 
                data-bs-target="#showTask" id=${id} onclick='openTask.apply(this, arguments)'>Open Task</button>
            </div>
        </div>
    </div>
`
// modal Body on click of OPEN TASK
// to get enlarged view of image
const htmlModalContent = ({ id, title, description, url}) =>{
 const date = new Date(parseInt(id));
 return `
 <div id = ${id}>
 ${
    url ?
         `<img width='100%' src=${url} alt='Card Image' class='img-fluid place__holder__image mb-3'  />`
         :
           `<img width='100%' src="https://tse3.mm.bing.net/th?id=OIP.FjLkalx51D8xJcpixUGJywHaE8&pid=Api&P=0&h=180"
            alt='card image class='card-img-top md-3 rounded-md' />`

}

     <strong class='text-muted text-sm'>Created on: ${date.toDateString()}</strong>
    <h2 class='my-3'>${title}</h>
    <p class='text-muted'>${description}</p>
</div>
`;
};

// convert json to str (to store in local browser)
const updateLocalStorage = () => {
    localStorage.setItem('task', JSON.stringify({
        tasks:  state.taskList,
    }));
};
// key:object;
// variable = ()


// load Initial Data
// convert str => json (ie. for rendering cards on the screen)
const loadInitialData = () => {
     const localStorageCopy = JSON.parse(localStorage.task);
     if (localStorageCopy) state.taskList = localStorageCopy.tasks;

     state.taskList.map((cardDate) => {
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
     });
     };
// when we edit or update we need to save
const handleSubmit =  (event) => {
    const id = `${Date.now()}`;
    // for getting data fro screen to the js file
    const input = {
        url: document.getElementById("imageurl").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("tags").value,
        description: document.getElementById("taskDescription").value,
    };  
     
    if (input.title==="" || input.type===""|| input.description==="" ){
        return alert("Please fill the Form!!!")
    };

// using spread operator
// for geting al the things displayed in the browser
taskContents.insertAdjacentHTML("beforeend",htmlTaskContent({...input, id}));
// to store data in array
state.taskList.push({...input, id});
// to store data in browser
updateLocalStorage();
};

// Open task
const openTask = (e) => {
    if(!e) e = window.event;
    const getTask = state.taskList.find(({id}) => id === e.target.id);
    taskModal.innerHTML = htmlModalContent(getTask);
}
   // All information get stored in => "getTask" asper mapped above
  // window.event => to escalate on another window

// Delete Task
const deleteTask = (e) => {
    if (!e) e = window.event;
    const targetId = e.target.getAttribute("name");
    // console.log(e.targetId);
    const type = e.target.tagName;
    console.log(type);
    const removeTask = state.taskList.filter(({id}) => id !== targetId);
    // console.log(removeTask);
    state.taskList = removeTask;
    // console.log("updated arr", state.taskList);

  updateLocalStorage();
    if(type === "BUTTON"){
        // console.log(e.target.parentNode.parentNode.parentNode);
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
            e.target.parentNode.parentNode.parentNode
        );
    } else if (type ==="I")
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
          e.target.parentNode.parentNode.parentNode.parentNode
        );
    };
    
// editTask
const editTask = (e) => {
    if(!e) e = window.event;

    const targetID = e.target.id;
    const type = e.target.tagName;

    let parentNode;
    let taskTitle;
    let taskDescription;
    let taskType;
    let submitButton;

    if(type === "BUTTON"){
        parentNode = e.target.parentNode.parentNode;
    }else{
        parentNode = e.target.parentNode.parentNode.parentNode;
    }
 

    /* Uncomment following 2 lines to know abt childNodes
    taskTitle = parentNode.childNodes;
    console.log(taskTitle);
    */
    
    taskTitle = parentNode.childNodes[3].childNodes[3];
    taskDescription = parentNode.childNodes[3].childNodes[5];
    taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    submitButton = parentNode.childNodes[5].childNodes[1];
    // console.log(taskTitle, taskDescription, taskType);
    // console.log(submitButton);

    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");

    submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
    submitButton.removeAttribute("data-bs-toggle");
    submitButton.removeAttribute("data-bs-target");
    // to trigger save changes
    submitButton.innerHTML = "Save Changes";
};

// saveEdit
const saveEdit = (e) =>{
    if(!e) e = window.event;
    const targetId = e.target.id;
    const parentNode = e.target.parentNode.parentNode;
    // console.log (parentNode.childNodes);

    const taskTitle = parentNode.childNodes[3].childNodes[3];
    const taskDescription = parentNode.childNodes[3].childNodes[5];
    const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    const submitButton = parentNode.childNodes[5].childNodes[1];

    const updateData = {
        taskTitle: taskTitle.innerHTML,
        taskDescription: taskDescription.innerHTML,
        taskType: taskType.innerHTML,
};

// to update the latest data on our local array
let stateCopy = state.taskList;

stateCopy = stateCopy.map((task) => 
  task.id === targetId
    ?{
        id: task.id,
        title: updateData.taskTitle,
        description: updateData.taskDescription,
        type: updateData.taskType,
        url: task.url,
    }
    : task
  );

  state.taskList = stateCopy;
//   console.log(state.taskList);
  updateLocalStorage();

//  for not editing after clicking save changes
    taskTitle.setAttribute("contenteditable", "false");
    taskDescription.setAttribute("contenteditable", "false");
    taskType.setAttribute("contenteditable", "false");

    submitButton.setAttribute('onclick', "openTask.apply(this, arguments)");
    submitButton.setAttribute("data-bs-toggle", "modal");
    submitButton.setAttribute("data-bs-target", "#showTask");
    submitButton.innerHTML = "Open Task";
};

//  data-bs-toggle='modal'
// searchTask
const searchTask = (e) => {
    if(!e) e = window.event;

    while(taskContents.firstChild){
        taskContents.removeChild(taskContents.firstChild);
    }
    const resultData = state.taskList.filter(({title}) =>{
        title.toLowerCase().includes(e.target.value.toLowerCase());
    }); 

    // console.log(resultData);
    resultData.map((cardData) =>{
        taskContents.insertAdjacentHTML("beforeend", htmlModalContent(cardData))
    });
};



