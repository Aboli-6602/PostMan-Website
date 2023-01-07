// PostMan script


let jsonRadio = document.getElementById('jsonRadio');
let customParamsRadio = document.getElementById('customParamsRadio');

let parameterBox = document.getElementById('parameterBox');
parameterBox.style.display = 'none';

let jsonBox = document.getElementById('jsonBox');

jsonRadio.addEventListener('click', ()=>{
    jsonBox.style.display = 'block';
    parameterBox.style.display = 'none';
})

customParamsRadio.addEventListener('click', ()=>{
    jsonBox.style.display = 'none';
    parameterBox.style.display = 'block';
})

let addParam = document.getElementById('addParam');
let paramCount = 1;
// let params = document.getElementById('params');
addParam.addEventListener('click',()=>{
    let string = `<div class="mb-3 row">
                <label for="customParam" class="col-sm-2 col-form-label">Custom Paramter ${paramCount+1}</label>
                <div class="col-sm-7">
                    <div class="row">
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Parameter ${paramCount+1} Key" aria-label="key"
                                id="key${paramCount+1}">
                        </div>
                        <div class="col">
                            <input type="text" class="form-control" placeholder="Parameter ${paramCount+1} Value" aria-label="value"
                                id="value${paramCount+1}">
                        </div>
                        <div class="btn btn-primary col-md-1 deleteParam">-</div>
                    </div>
                </div>
            </div>`
    let div = document.createElement('div');
    div.innerHTML = string;
    parameterBox.append(div);
    let deleteParam = document.getElementsByClassName('deleteParam');
    // console.log(deleteParam);
    for(let param of deleteParam){
        param.addEventListener('click', ()=>{
            let parent = param.parentElement.parentElement.parentElement;
            // console.log(parent);
            parent.remove();
        })
    }
    paramCount++;
})

let submit = document.getElementById('submit');


submit.addEventListener('click', ()=>{
    // document.getElementById('responseBox').style.display = 'block';
    let responseJSON = document.getElementById('responseJSON');
    responseJSON.innerHTML = 'Please wait, fetching data...';

    let requestType = document.querySelector('input[name="requestType"]:checked').value;
    let contentType = document.querySelector('input[name="contentType"]:checked').value;
    let url = document.getElementById('url').value;
    let data = {}; 
    if(contentType == 'JSON'){
        let requestJSON = document.getElementById('requestJSON').value;
        data = requestJSON;  // data is string
    }
    else{
        for(let i=0; i<paramCount; i++){
            if(document.getElementById(`key${i+1}`).value != undefined){
                let key = document.getElementById(`key${i+1}`).value;
                let value = document.getElementById(`value${i+1}`).value;
                data[key] = value;  // data is object
            }
        }
        data = JSON.stringify(data);  // converting object to string
    }
    console.log(requestType);
    console.log(contentType);
    console.log(data);

    

    if(requestType == 'GET'){
        fetch(url,{
            method: 'GET'
        }).then((response)=>{
            return response.text();
        }).then((data)=>{
            // responseJSON.value = data;
            responseJSON.innerHTML = data;
        })
    }
    else{
        fetch(url,{
            method: 'POST',
            body: data,  // data should be in string type only
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },}).then(response=>{
                return response.text();
            }).then(data=>{
                // responseJSON.value = data;
                responseJSON.innerHTML = data;
            })
    }
})


