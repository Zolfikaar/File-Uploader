const form = document.querySelector('form'),
      fileInput = form.querySelector('.file-input'),
      progressArea = document.querySelector('.progress-area'),
      uploadedArea = document.querySelector('.uploaded-area');

form.addEventListener('click', () => {
  fileInput.click();
})

fileInput.onchange = ({target}) => {
  let file = target.files[0] // getting file name from first item in atributes array of the file
  if(file){// if file is selected
    let fileName = file.name
    if(fileName.length >= 12){//if file name is longer than 12 characters then split it and add ...
      let splitName = fileName.split('.')
      fileName = splitName[0].substring(0, 12) + '... .' + splitName[1]
    }
    uploadFile(fileName)
  } 
}

function uploadFile(name) {
  let xhr = new XMLHttpRequest()
  xhr.open('POST', 'php/upload.php')// sending post request to the specified url/file
  xhr.upload.addEventListener('progress', ({loaded, total}) => {
    let fileLoaded = Math.floor(loaded / total * 100)
    let fileTotal = Math.floor(total / 1000)
    let fileSize;
    // if file size is less than 1024 then add only kb, else convert size to mb
    (fileTotal < 1024) ? fileSize = fileTotal + ' KB' : fileSize = (loaded / 1024).toFixed(2) + ' MB'
    let progressHTML = `
    <li class="row">
      <i class="fas fa-file-alt"></i>
      <div class="content">
        <div class="details">
          <span class="name">${name} • Uploading</span>
          <span class="percent">${fileLoaded}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress" style="width: ${fileLoaded}%"></div>
        </div>
      </div>
    </li>`
    // uploadedHTML.innerHTML = ''// switch on if you don't want to see uploaded files
    uploadedArea.classList.add('onprogress')
    progressArea.innerHTML = progressHTML
    if(loaded == total){
      progressArea.innerHTML = ''
      let uploadedHTML = `
      <li class="row">
        <div class="content">
          <i class="fas fa-file-alt"></i>
          <div class="details">
            <span class="name">${name} • Uploaded</span>
            <span class="size">${fileSize}</span>
          </div>
        </div>
        <i class="fas fa-check"></i>
      </li>`
      uploadedArea.classList.remove('onprogress')
      // uploadedArea.innerHTML = uploadedHTML // switch on if you don't want to see uploaded files
      uploadedArea.insertAdjacentHTML('afterbegin', uploadedHTML)
    }
  })
  let formData = new FormData(form) // FormData is an object that holds the data to be sent to the server
  xhr.send(formData) // sending the data to the php/server
}