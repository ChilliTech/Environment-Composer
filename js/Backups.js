// This procedure resets everything that the user had saved - in localStorage.
function reset_project(){
    if (confirm(resetProjectPrompt)){
        localStorage.clear();
        window.location.reload();
    }
}

// This procedure saves the scene to localstorage
function save_project(){
    let sceneStr = JSON.stringify(scene);
    localStorage.setItem("scene", sceneStr);

    display_message("Successfully saved the scene.");
}

// This procedure restores the scene from a localStorage backup
function restore_from_save(){
    let sceneStr = localStorage.getItem("scene");
    let sceneStrJSON = JSON.parse(sceneStr);
    scene = new THREE.ObjectLoader().parse(sceneStrJSON);

    selectedObject = scene;
}

// This procedure creates a TXT backup file with a custom name of everything the user has in "scene".
function backup_project(){
    let filename = prompt(backupFileNamePrompt, "");
    if (filename == null){
        return;
    } else if (filename == ""){
        filename = scene.name;
    }

    let data = JSON.stringify(scene);
    let type = "txt";
    let file = new Blob([data], {type: type});

    // IE10+
    if (window.navigator.msSaveOrOpenBlob){
        window.navigator.msSaveOrOpenBlob(file, filename);
    }

    // Others
    else {
        let a = document.createElement("a");
        let url = URL.createObjectURL(file);

        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();

        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }

    display_message("Successfully backed up the scene.");
}

// This procedure restores the scene from a previously created TXT backup file
function restore_from_backup(){
    let upload = document.createElement("INPUT");
    upload.setAttribute("type", "file");
    document.body.appendChild(upload);

    upload.addEventListener('change', readURL, true);
    upload.click();

    function readURL(){
        let file = upload.files[0];
        let reader = new FileReader();

        reader.onloadend = function(){
            let sceneStr = reader.result;
            let sceneStrJSON = JSON.parse(sceneStr);
            scene = new THREE.ObjectLoader().parse(sceneStrJSON);

            // Select the root object in the THREE.js scene.
            selectedObject = scene;

            display_message("Successfully restored from the backup.");
        }

        if (file){
            reader.readAsText(file);
        }
    }
}

// When the file is refreshed or opened, this file (along with all the other source files) will be run.
// So, when you refresh or open the page, it'll run this function.
restore_from_save();