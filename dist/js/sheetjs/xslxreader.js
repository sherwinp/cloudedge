"use strict";
function drop(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var fileList = event.dataTransfer.files;
        console.log(fileList);
        // access files via fileList

        for(var i=0; i < fileList.length; i++ ) {
            readFile(fileList[i]);
            return;
        }
}

function dragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    }

var dropZone = document.getElementById("fileDropZone");
if(dropZone!=null){
   dropZone.addEventListener("dragover", dragOver, false);
   dropZone.addEventListener("drop"    , drop    , false);
}

function readFiles(event) {
    var fileList = event.target.files;
    console.log(fileList);
    // access files via fileList

    for(var i=0; i < fileList.length; i++ ) {
        readFile(fileList[i]);
        return;
    }
}

var theFileInput = document.getElementById('fileInput');
if(theFileInput!=null){
   theFileInput.addEventListener("change", readFiles);
}

function readFile(file){
    var reader = new FileReader();
    reader.onload = function(){
        var fileData = reader.result;
        var wb = XLSX.read(fileData, {type : 'binary'});

        wb.SheetNames.forEach(function(sheetName){
		if(sheetName.indexOf('metadata entry')>-1){
        	var rowObj = XLSX.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);
			console.log(rowObj);
		    
			const parent = document.getElementById("sampledata");
            while (parent.firstChild) {
              parent.firstChild.remove();
            }

			rowObj.forEach(collectRow);
        }});
    };
    reader.readAsBinaryString(file);
}
function collectRow(row){
	if( Number.isInteger( row['__EMPTY'] )){
	  var datalist = document.getElementById("sampledata");
	  var li = document.createElement("li");
      var span = li.appendChild(document.createElement("span"));
      span.appendChild(document.createTextNode(row['__EMPTY_1'] ));
      var span2 = li.appendChild(document.createElement("span"));
      span2.appendChild(document.createTextNode(row['__EMPTY_2'])); 
      
      datalist.appendChild(li);	
   }
}