var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    userName = document.getElementById("name"),
    Store = document.getElementById("Store"),

    Status = document.getElementById("Status"),
    Floor = document.getElementById("Floor"),
    STimeI = document.getElementById("STimeI"),
  STimeO = document.getElementById("STimeO"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    imgInput.src = "Profile Icon.webp"
    form.reset()
})


file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large!")
    }
}


function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeeStore}</td>

            <td>${element.employeeStatus}</td>
            <td>${element.Floor}</td>
       <td>${element.STimeI}</td>
       <td>${element.STimeO}</td>


            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeeStore}',  '${element.employeeStatus}', '${element.Floor}', '${element.STimeI}',             '${element.STimeO}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeeStore}', '${element.employeeStatus}', '${element.Floor}', '${element.STimeI}',
'${element.STimeO}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>

            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(pic, name, Store, Status, Floor, STimeI, STimeO){
    document.querySelector('.showImg').src = pic,
    document.querySelector('#showName').value = name,
    document.querySelector("#showStore").value = Store,
    document.querySelector("#showStatus").value = Status,
    document.querySelector("#showFloor").value = Floor,
    document.querySelector("#showSTimeI").value = STimeI,
  document.querySelector("#showSTimeO").value = STimeO
}


function editInfo(index, pic, name, Store, Status, Floor, STimeI, STimeO){
    isEdit = true
    editId = index
    imgInput.src = pic,
    userName.value = name,
    age.value = Store,
    Status.value = Status,
    Floor.value = Floor,
    STimeI.value = STimeI,
    STimeO.value = STimeO

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        picture: imgInput.src == undefined ? "Profile Icon.webp" : imgInput.src,
        employeeName: userName.value,
        employeeStore: Store.value,
        employeeStatus: Status.value,
        Floor: Floor.value,
        STimeI: STimeI.value,
      STimeO: STimeO.value
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset()

    imgInput.src = "Profile Icon.webp"  

    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()
})
          
